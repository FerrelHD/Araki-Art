# Graph Report - araki-lookbook  (2026-10-10)

## Corpus Check
- 22 files · ~3,410,441 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 196 nodes · 245 edges · 14 communities (12 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1f253ca6`
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
- devDependencies
- HelloWorld.vue
- tsconfig.json
- araki.

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `vue` - 12 edges
3. `compilerOptions` - 9 edges
4. `useValentineStage()` - 6 edges
5. `lenis` - 6 edges
6. `scripts` - 4 edges
7. `araki.` - 4 edges
8. `triggerCurtainReveal()` - 3 edges
9. `handleTouchEnd()` - 3 edges
10. `handleMouseUp()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (14 total, 2 thin omitted)

### Community 0 - "App.vue"
Cohesion: 0.08
Nodes (20): gsap, lenis, vue, cameraStageStyle, cameraWorldRef, {
  config,
  isStandActive,
  showValentineAdjuster,
  lastFocusOrigin,
  handleResetCamera,
}, heroSectionRef, anatomyRoot (+12 more)

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
Cohesion: 0.11
Nodes (17): name, private, scripts, build, dev, preview, type, version (+9 more)

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
Cohesion: 0.29
Nodes (7): dependencies, gsap, lenis, tailwindcss, @tailwindcss/vite, vue, @vueuse/core

### Community 10 - "devDependencies"
Cohesion: 0.29
Nodes (7): devDependencies, @types/node, typescript, vite, @vitejs/plugin-vue, vue-tsc, @vue/tsconfig

### Community 13 - "araki."
Cohesion: 0.40
Nodes (4): araki., Features, Getting Started, Tech Stack

## Knowledge Gaps
- **7 isolated node(s):** `@vueuse/core`, `tailwindcss`, `@types/node`, `@vue/tsconfig`, `typescript` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 146 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vue` connect `App.vue` to `CapsulesSlider.vue`, `useValentineStage.ts`, `package.json`, `HeaderNav.vue`, `PreloaderIntro.vue`, `HeroSection.vue`, `HelloWorld.vue`?**
  _High betweenness centrality (0.290) - this node is a cross-community bridge._
- **What connects `@vueuse/core`, `tailwindcss`, `@types/node` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.08199643493761141 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `CapsulesSlider.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.0812807881773399 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `useValentineStage.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._