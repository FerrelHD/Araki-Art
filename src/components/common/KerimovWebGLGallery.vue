<template>
  <div class="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
    <canvas ref="canvasRef" class="w-full h-full block" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

export interface GalleryItem {
  id: string
  src: string
  objectPosition?: 'top' | 'center' | 'bottom'
}

const props = defineProps<{
  items: GalleryItem[]
  anchorSelector: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

interface MeshRuntime {
  item: GalleryItem
  anchor: HTMLElement
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
  material: THREE.ShaderMaterial
  texture: THREE.Texture

  // Interaction state
  targetPointer: THREE.Vector2
  smoothedPointer: THREE.Vector2
  deltaVel: THREE.Vector2
  deltaSpring: THREE.Vector2
  hoverFactor: number
}

const meshList: MeshRuntime[] = []
let hoveredIndex: number | null = null
const pointer = { x: -9999, y: -9999, active: false }

// Global scroll bend physics
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
let scrollBendVel = 0
let scrollBend = 0
let lastTime = 0

// ── 01. 3D PERSPECTIVE TILT + CLOTH WAVE VERTEX SHADER ──
const vertexShader = `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uPointer;
  uniform vec2 uDelta;
  uniform float uHover;

  const float PI = 3.141592653589793238;

  void main() {
    vUv = uv;

    vec3 newPosition = position;

    // UV centered (-0.5 to 0.5)
    vec2 p = uv - 0.5;

    // 1. True 3D perspective surface tilt towards cursor
    float tiltX = (uPointer.y - 0.5) * uHover;
    float tiltY = (uPointer.x - 0.5) * uHover;
    float depthZ = (p.x * tiltY - p.y * tiltX) * 0.38;
    newPosition.z += depthZ;

    // Perspective foreshortening: tilted edge expands, opposite edge contracts
    float perspective = 1.0 + newPosition.z * 0.45;
    newPosition.xy *= perspective;

    // 2. Cloth wave bend on mouse velocity & scroll inertia
    newPosition.x += sin(uv.y * PI) * uDelta.x;
    newPosition.y += sin(uv.x * PI) * uDelta.y;

    // 3. Fluid surface bulge towards cursor
    float dist = distance(uv, uPointer);
    float bulge = sin(clamp(1.0 - dist * 1.5, 0.0, 1.0) * 1.57079) * 0.07 * uHover;
    newPosition.z += bulge;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

// ── 02. FRAGMENT SHADER (Aspect ratio cover) ──
const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uUvScale;
  uniform vec2 uUvOffset;
  uniform float uOpacity;

  void main() {
    vec2 imageUv = vUv * uUvScale + uUvOffset;
    vec4 textureColor = texture2D(uTexture, imageUv);

    gl_FragColor = vec4(textureColor.rgb, textureColor.a * uOpacity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

function updateAspectCover(
  texture: THREE.Texture,
  containerW: number,
  containerH: number,
  uUvScale: THREE.Vector2,
  uUvOffset: THREE.Vector2,
  objectPosition: 'top' | 'center' | 'bottom' = 'center'
) {
  const img = texture.image
  if (!img) {
    uUvScale.set(1, 1)
    uUvOffset.set(0, 0)
    return
  }

  const el = img as any
  const imgW = el.naturalWidth || el.width || 1
  const imgH = el.naturalHeight || el.height || 1

  const imgRatio = imgW / imgH
  const containerRatio = containerW / containerH

  // If container ratio matches image ratio within subpixel margin, display 100% full image with 0 crop
  if (Math.abs(imgRatio - containerRatio) < 0.02) {
    uUvScale.set(1, 1)
    uUvOffset.set(0, 0)
    return
  }

  if (imgRatio > containerRatio) {
    const scale = containerRatio / imgRatio
    uUvScale.set(scale, 1)
    uUvOffset.set((1 - scale) / 2, 0)
  } else {
    const scale = imgRatio / containerRatio
    uUvScale.set(1, scale)
    if (objectPosition === 'top') {
      uUvOffset.set(0, 1 - scale)
    } else if (objectPosition === 'bottom') {
      uUvOffset.set(0, 0)
    } else {
      uUvOffset.set(0, (1 - scale) / 2)
    }
  }
}

function initScene() {
  if (!canvasRef.value) return

  const width = window.innerWidth
  const height = window.innerHeight

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    0.1,
    2000
  )
  camera.position.z = 1000

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
    stencil: false,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  const textureLoader = new THREE.TextureLoader()

  const anchors = Array.from(document.querySelectorAll<HTMLElement>(props.anchorSelector))
  props.items.forEach((item, idx) => {
    const anchor = anchors[idx]
    if (!anchor) return

    const uUvScale = new THREE.Vector2(1, 1)
    const uUvOffset = new THREE.Vector2(0, 0)
    const uDelta = new THREE.Vector2(0, 0)

    const texture = textureLoader.load(item.src, (t) => {
      t.colorSpace = THREE.SRGBColorSpace
      t.wrapS = THREE.ClampToEdgeWrapping
      t.wrapT = THREE.ClampToEdgeWrapping
      t.minFilter = THREE.LinearMipmapLinearFilter
      t.magFilter = THREE.LinearFilter
      t.generateMipmaps = true
      t.needsUpdate = true

      const rect = anchor.getBoundingClientRect()
      updateAspectCover(t, rect.width, rect.height, uUvScale, uUvOffset, item.objectPosition)
    })

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uOpacity: { value: 1.0 },
        uUvScale: { value: uUvScale },
        uUvOffset: { value: uUvOffset },
        uDelta: { value: uDelta },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
      side: THREE.DoubleSide,
      precision: 'highp',
    })

    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.frustumCulled = false
    mesh.renderOrder = idx + 10
    scene.add(mesh)

    meshList.push({
      item,
      anchor,
      mesh,
      material,
      texture,
      targetPointer: new THREE.Vector2(0.5, 0.5),
      smoothedPointer: new THREE.Vector2(0.5, 0.5),
      deltaVel: new THREE.Vector2(0, 0),
      deltaSpring: new THREE.Vector2(0, 0),
      hoverFactor: 0,
    })
  })
}

function handlePointerMove(e: PointerEvent) {
  pointer.x = e.clientX
  pointer.y = e.clientY
  pointer.active = true
}

function handlePointerLeave() {
  pointer.active = false
  hoveredIndex = null
}

function handleResize() {
  if (!renderer || !camera) return
  const width = window.innerWidth
  const height = window.innerHeight

  camera.left = width / -2
  camera.right = width / 2
  camera.top = height / 2
  camera.bottom = height / -2
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  meshList.forEach((data) => {
    const rect = data.anchor.getBoundingClientRect()
    updateAspectCover(
      data.texture,
      rect.width,
      rect.height,
      data.material.uniforms.uUvScale.value,
      data.material.uniforms.uUvOffset.value,
      data.item.objectPosition
    )
  })
}

function animate(currentTime: number) {
  animationFrameId = requestAnimationFrame(animate)

  if (!lastTime) lastTime = currentTime
  const dt = Math.min((currentTime - lastTime) / 1000, 1 / 30)
  lastTime = currentTime

  const viewW = window.innerWidth
  const viewH = window.innerHeight

  // 1. Detect hovered anchor
  let foundHover: number | null = null
  if (pointer.active) {
    for (let i = meshList.length - 1; i >= 0; i--) {
      const data = meshList[i]
      const rect = data.anchor.getBoundingClientRect()
      const buffer = hoveredIndex === i ? 10 : 0
      if (
        pointer.x >= rect.left - buffer &&
        pointer.x <= rect.right + buffer &&
        pointer.y >= rect.top - buffer &&
        pointer.y <= rect.bottom + buffer
      ) {
        foundHover = i
        break
      }
    }
  }
  hoveredIndex = foundHover

  // 2. Global Scroll Bend (scroll velocity wave)
  const currentScrollY = window.scrollY
  const deltaScroll = currentScrollY - lastScrollY
  lastScrollY = currentScrollY

  const h = THREE.MathUtils.clamp(-0.0018 * deltaScroll, -0.022, 0.022)
  scrollBendVel += (h - scrollBend) * 105 * dt
  scrollBendVel *= Math.exp(-12 * dt)
  scrollBend += scrollBendVel * dt
  const decay = 1 - Math.exp(-4.5 * dt)
  scrollBend += (0 - scrollBend) * decay

  // 3. Process each mesh: Pure Tilt & Cloth Wave (Zero zoom, zero dimming, zero drift)
  meshList.forEach((data, index) => {
    const rect = data.anchor.getBoundingClientRect()

    if (rect.bottom < -300 || rect.top > viewH + 300 || rect.width <= 0 || rect.height <= 0) {
      data.mesh.visible = false
      return
    }
    data.mesh.visible = true

    const isHovered = hoveredIndex === index

    // Target pointer normalized 0..1
    if (isHovered && pointer.active) {
      const ex = THREE.MathUtils.clamp((pointer.x - rect.left) / rect.width, 0, 1)
      const ey = THREE.MathUtils.clamp((pointer.y - rect.top) / rect.height, 0, 1)
      data.targetPointer.set(ex, ey)
    } else {
      data.targetPointer.set(0.5, 0.5)
    }

    // Pointer smoothing
    const z = 1 - Math.exp(-9 * dt)
    data.smoothedPointer.lerp(data.targetPointer, z)

    // Smooth hover factor (0..1)
    const targetHover = isHovered ? 1.0 : 0.0
    data.hoverFactor += (targetHover - data.hoverFactor) * (1 - Math.exp(-8 * dt))

    // Wave velocity
    const cx = data.targetPointer.x - data.smoothedPointer.x
    const cy = data.targetPointer.y - data.smoothedPointer.y
    const targetDeltaX = isHovered ? THREE.MathUtils.clamp(0.4 * cx, -0.035, 0.035) : 0
    const targetDeltaY = isHovered ? THREE.MathUtils.clamp(-0.35 * cy, -0.03, 0.03) : 0
    const A = isHovered ? 95 : 75

    data.deltaVel.x += (targetDeltaX - data.deltaSpring.x) * A * dt
    data.deltaVel.y += (targetDeltaY - data.deltaSpring.y) * A * dt
    data.deltaVel.multiplyScalar(Math.exp(-(isHovered ? 16 : 13) * dt))
    data.deltaSpring.addScaledVector(data.deltaVel, dt)

    // Update uniforms
    data.material.uniforms.uPointer.value.copy(data.smoothedPointer)
    data.material.uniforms.uHover.value = data.hoverFactor
    data.material.uniforms.uDelta.value.set(
      data.deltaSpring.x,
      scrollBend + data.deltaSpring.y
    )
    data.material.uniforms.uOpacity.value = 1.0

    // Position mesh strictly over anchor (stay in frame, stay at scale 1.0)
    const posX = rect.left + rect.width / 2 - viewW / 2
    const posY = viewH / 2 - (rect.top + rect.height / 2)
    data.mesh.position.set(posX, posY, 0)
    data.mesh.scale.set(rect.width, rect.height, 1)
  })

  renderer.render(scene, camera)
}

onMounted(() => {
  lastScrollY = window.scrollY
  setTimeout(() => {
    initScene()
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('resize', handleResize)
    animationFrameId = requestAnimationFrame(animate)
  }, 100)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('pointermove', handlePointerMove)
  document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
  window.removeEventListener('resize', handleResize)

  meshList.forEach((data) => {
    data.mesh.geometry.dispose()
    data.material.dispose()
    data.texture.dispose()
    scene.remove(data.mesh)
  })

  renderer?.dispose()
  renderer?.forceContextLoss()
})
</script>
