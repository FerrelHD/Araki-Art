<template>
  <div class="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
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
}

const meshList: MeshRuntime[] = []

// Global scroll bend physics (scroll velocity wave)
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
const scrollBend = new THREE.Vector2(0, 0)
const scrollBendVel = new THREE.Vector2(0, 0)
let lastTime = 0

// ── 01. SCROLL-ONLY CLOTH WAVE VERTEX SHADER (NO HOVER) ──
const vertexShader = `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uDelta;

  const float PI = 3.141592653589793238;

  void main() {
    vUv = uv;

    vec3 newPosition = position;

    // Pure cloth wave bend responding only to scroll velocity & inertia
    newPosition.x += sin(uv.y * PI) * uDelta.x;
    newPosition.y += sin(uv.x * PI) * uDelta.y;

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
  _texture: THREE.Texture,
  _containerW: number,
  _containerH: number,
  uUvScale: THREE.Vector2,
  uUvOffset: THREE.Vector2,
  _objectPosition: 'top' | 'center' | 'bottom' = 'center'
) {
  // Always 100% full image without any texture cropping (zero crop)
  uUvScale.set(1, 1)
  uUvOffset.set(0, 0)
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

      // Once WebGL texture is ready, transition DOM image so WebGL canvas handles the wave
      const domImg = anchor.querySelector('img')
      if (domImg) {
        domImg.style.opacity = '0'
      }
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
    })
  })
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

  // 1. Scroll Bend Wave Physics (reacts purely to scroll velocity & inertia)
  const currentScrollY = window.scrollY
  const deltaScroll = currentScrollY - lastScrollY
  lastScrollY = currentScrollY

  const targetBendX = THREE.MathUtils.clamp(-0.0028 * deltaScroll, -0.06, 0.06)
  const targetBendY = THREE.MathUtils.clamp(-0.0012 * deltaScroll, -0.025, 0.025)

  scrollBendVel.x += (targetBendX - scrollBend.x) * 110 * dt
  scrollBendVel.y += (targetBendY - scrollBend.y) * 110 * dt
  scrollBendVel.multiplyScalar(Math.exp(-12 * dt))
  scrollBend.addScaledVector(scrollBendVel, dt)

  const decay = 1 - Math.exp(-4.5 * dt)
  scrollBend.x += (0 - scrollBend.x) * decay
  scrollBend.y += (0 - scrollBend.y) * decay

  // 2. Process each mesh: Sync position strictly with DOM anchor (Horizontal & Vertical)
  meshList.forEach((data) => {
    const rect = data.anchor.getBoundingClientRect()

    // Culling for both horizontal and vertical out-of-screen bounds
    if (
      rect.right < -300 ||
      rect.left > viewW + 300 ||
      rect.bottom < -300 ||
      rect.top > viewH + 300 ||
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      data.mesh.visible = false
      return
    }
    data.mesh.visible = true

    // Calculate uncropped, strictly proportional dimensions matching texture ratio (Zero Gepeng)
    const imgEl = data.texture.image as any
    const naturalW = imgEl?.naturalWidth || imgEl?.width || 0
    const naturalH = imgEl?.naturalHeight || imgEl?.height || 0
    const imgRatio = naturalW && naturalH ? naturalW / naturalH : rect.width / rect.height

    const meshHeight = rect.height
    const meshWidth = meshHeight * imgRatio

    // Position mesh strictly aligned with anchor left edge in 2D viewport coordinates
    const posX = rect.left + meshWidth / 2 - viewW / 2
    const posY = viewH / 2 - (rect.top + rect.height / 2)
    data.mesh.position.set(posX, posY, 0)
    data.mesh.scale.set(meshWidth, meshHeight, 1)

    // Dynamic cloth wave responding exclusively to scroll inertia (zero hover)
    data.material.uniforms.uDelta.value.set(scrollBend.x, scrollBend.y)
  })

  renderer.render(scene, camera)
}

onMounted(() => {
  lastScrollY = window.scrollY
  setTimeout(() => {
    initScene()
    window.addEventListener('resize', handleResize)
    animationFrameId = requestAnimationFrame(animate)
  }, 100)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
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
