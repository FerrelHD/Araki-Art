# Graph Report - Araki-Art  (2026-10-14)

## Corpus Check
- 26 files · ~3,435,486 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 240 nodes · 303 edges · 16 communities (15 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `879a11c6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.vue
- CapsulesSlider.vue
- useValentineStage.ts
- package.json
- compilerOptions
- compilerOptions
- HeaderNav.vue
- PreloaderIntro.vue
- HeroSection.vue
- dependencies
- KerimovWebGLGallery.vue
- vue
- tsconfig.json
- araki.
- EditorialTiltCard.vue
- 🕷️ FERREL RASHAD AKEYLA 🕸️

## God Nodes (most connected - your core abstractions)
1. `vue` - 16 edges
2. `compilerOptions` - 15 edges
3. `compilerOptions` - 9 edges
4. `lenis` - 7 edges
5. `useValentineStage()` - 6 edges
6. `scripts` - 4 edges
7. `🕷️ FERREL RASHAD AKEYLA 🕸️` - 4 edges
8. `araki.` - 4 edges
9. `emit` - 3 edges
10. `updateAspectCover()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (16 total, 1 thin omitted)

### Community 0 - "App.vue"
Cohesion: 0.08
Nodes (20): gsap, lenis, cameraStageStyle, cameraWorldRef, {
  config,
  isStandActive,
  showValentineAdjuster,
  lastFocusOrigin,
  handleResetCamera,
}, currentRoute, curtainRef, hasCompletedIntro (+12 more)

### Community 1 - "CapsulesSlider.vue"
Cohesion: 0.08
Nodes (19): activeIdx, adjustments, bubbleStyle, Capsule, capsules, capsulesRoot, {
  config,
  isStandActive,
  isManifesting,
  currentQuoteIdx,
  currentQuote,
  handleSelectValentine,
  cycleQuote,
}, CoverAdjustment (+11 more)

### Community 2 - "useValentineStage.ts"
Cohesion: 0.11
Nodes (15): {
  config,
  isStandActive,
  triggerFlash,
  showValentineAdjuster,
  editorTab,
  currentQuote,
  copySuccess,
  lastFocusOrigin,
  toggleStandMode,
  cycleQuote,
  matchStandToIdle,
  resetConfig,
  copyConfig,
}, config, copySuccess, currentQuote, currentQuoteIdx, defaultValentineConfig, editorTab, isManifesting (+7 more)

### Community 3 - "package.json"
Cohesion: 0.08
Nodes (25): devDependencies, @types/node, typescript, vite, @vitejs/plugin-vue, vue-tsc, @vue/tsconfig, name (+17 more)

### Community 4 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 5 - "compilerOptions"
Cohesion: 0.15
Nodes (12): @vue/tsconfig/tsconfig.dom.json, compilerOptions, allowArbitraryExtensions, erasableSyntaxOnly, noFallthroughCasesInSwitch, noUnusedLocals, noUnusedParameters, paths (+4 more)

### Community 6 - "HeaderNav.vue"
Cohesion: 0.15
Nodes (12): applyTheme(), cities, CityClock, isMenuOpen, isShiftMode, { isStandActive }, isTransitioning, menuItems (+4 more)

### Community 7 - "PreloaderIntro.vue"
Cohesion: 0.20
Nodes (11): bottomEl, counter, currentPhase, emit, finishPreloader(), formattedCounter, isFinished, preloaderRoot (+3 more)

### Community 8 - "HeroSection.vue"
Cohesion: 0.28
Nodes (8): finalizeHandover(), heroRoot, playHandoverEntrance(), playIntroAnimation(), starIconRef, titleRef, videoContainerRef, videoElRef

### Community 9 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, gsap, lenis, tailwindcss, @tailwindcss/vite, three, @types/three, vue (+1 more)

### Community 10 - "KerimovWebGLGallery.vue"
Cohesion: 0.13
Nodes (13): three, canvasRef, GalleryItem, handleResize(), initScene(), meshList, MeshRuntime, pointer (+5 more)

### Community 11 - "vue"
Cohesion: 0.12
Nodes (10): vue, characters, props, count, bannerContainerRef, bannerImgRef, headingRef, leftColRef (+2 more)

### Community 13 - "araki."
Cohesion: 0.40
Nodes (4): araki., Features, Getting Started, Tech Stack

### Community 14 - "EditorialTiltCard.vue"
Cohesion: 0.28
Nodes (7): cardInnerRef, cardWrapperRef, emit, glareRef, handlePointerEnter(), handlePointerLeave(), mediaRef

### Community 15 - "🕷️ FERREL RASHAD AKEYLA 🕸️"
Cohesion: 0.40
Nodes (4): 🕷️ FERREL RASHAD AKEYLA 🕸️, 🕸️ Selected Web-Slinging Works, ⚙️ Technical Arsenal, 📊 Telemetry & Activity

## Knowledge Gaps
- **8 isolated node(s):** `@types/three`, `@vueuse/core`, `tailwindcss`, `@types/node`, `@vue/tsconfig` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 176 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vue` connect `vue` to `App.vue`, `CapsulesSlider.vue`, `useValentineStage.ts`, `package.json`, `HeaderNav.vue`, `PreloaderIntro.vue`, `HeroSection.vue`, `KerimovWebGLGallery.vue`, `EditorialTiltCard.vue`?**
  _High betweenness centrality (0.331) - this node is a cross-community bridge._
- **What connects `@types/three`, `@vueuse/core`, `tailwindcss` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `CapsulesSlider.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.0812807881773399 - nodes in this community are weakly interconnected._
- **Should `useValentineStage.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07671957671957672 - nodes in this community are weakly interconnected._