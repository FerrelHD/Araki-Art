# Graph Report - Araki-Art  (2026-10-14)

## Corpus Check
- 23 files · ~2,138,581 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 228 nodes · 291 edges · 16 communities (15 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dd9ae4d5`
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
- devDependencies
- 🕷️ FERREL RASHAD AKEYLA 🕸️

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `vue` - 14 edges
3. `compilerOptions` - 9 edges
4. `lenis` - 7 edges
5. `useValentineStage()` - 6 edges
6. `scripts` - 4 edges
7. `🕷️ FERREL RASHAD AKEYLA 🕸️` - 4 edges
8. `araki.` - 4 edges
9. `updateAspectCover()` - 3 edges
10. `triggerCurtainReveal()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (16 total, 1 thin omitted)

### Community 0 - "App.vue"
Cohesion: 0.13
Nodes (11): cameraStageStyle, cameraWorldRef, {
  config,
  isStandActive,
  showValentineAdjuster,
  lastFocusOrigin,
  handleResetCamera,
}, currentRoute, curtainRef, hasCompletedIntro, heroSectionRef, isCurtainActive (+3 more)

### Community 1 - "CapsulesSlider.vue"
Cohesion: 0.08
Nodes (20): activeIdx, adjustments, bubbleStyle, capsules, capsulesRoot, {
  config,
  isStandActive,
  isManifesting,
  currentQuoteIdx,
  currentQuote,
  handleSelectValentine,
  cycleQuote,
}, flashContainerStyle, handleMouseUp() (+12 more)

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
Cohesion: 0.10
Nodes (18): name, private, scripts, build, dev, preview, type, version (+10 more)

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
Cohesion: 0.25
Nodes (8): dependencies, gsap, lenis, tailwindcss, @tailwindcss/vite, three, vue, @vueuse/core

### Community 10 - "KerimovWebGLGallery.vue"
Cohesion: 0.13
Nodes (13): three, canvasRef, GalleryItem, handleResize(), initScene(), meshList, MeshRuntime, pointer (+5 more)

### Community 11 - "vue"
Cohesion: 0.09
Nodes (18): gsap, lenis, vue, characters, props, anatomyRoot, headingRef, Pillar (+10 more)

### Community 13 - "araki."
Cohesion: 0.40
Nodes (4): araki., Features, Getting Started, Tech Stack

### Community 14 - "devDependencies"
Cohesion: 0.25
Nodes (8): devDependencies, @types/node, @types/three, typescript, vite, @vitejs/plugin-vue, vue-tsc, @vue/tsconfig

### Community 15 - "🕷️ FERREL RASHAD AKEYLA 🕸️"
Cohesion: 0.40
Nodes (4): 🕷️ FERREL RASHAD AKEYLA 🕸️, 🕸️ Selected Web-Slinging Works, ⚙️ Technical Arsenal, 📊 Telemetry & Activity

## Knowledge Gaps
- **8 isolated node(s):** `@vueuse/core`, `tailwindcss`, `@types/node`, `@types/three`, `@vue/tsconfig` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 164 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vue` connect `vue` to `App.vue`, `CapsulesSlider.vue`, `useValentineStage.ts`, `package.json`, `HeaderNav.vue`, `PreloaderIntro.vue`, `HeroSection.vue`, `KerimovWebGLGallery.vue`?**
  _High betweenness centrality (0.300) - this node is a cross-community bridge._
- **What connects `@vueuse/core`, `tailwindcss`, `@types/node` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `CapsulesSlider.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.08387096774193549 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `useValentineStage.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._