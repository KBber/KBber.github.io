---
name: KBber
description: Antique gold and quiet umber surfaces for inspectable software work.
colors:
  bg: '#15120f'
  bg-2: '#201a13'
  ink: '#f0d5a3'
  ink-2: '#dfc391'
  muted: '#c8aa79'
  accent: '#e3a94f'
  accent-soft: '#edc580'
  accent-deep: '#986121'
  line: '#6d4d27'
  glass-border: '#70532b'
  glass-highlight: '#332718'
  reading-bg: '#f6efdf'
  reading-bg-2: '#eee0c5'
  reading-ink: '#342312'
  reading-ink-2: '#574021'
  reading-muted: '#6c4c28'
  reading-accent: '#865212'
  reading-accent-soft: '#6b4313'
  reading-line: '#be9d67'
  reading-glass-bg: '#f8f1e5'
  reading-glass-border: '#c7ac80'
  reading-glass-highlight: '#e7d7b9'
typography:
  display:
    fontFamily: '''Wix Madefor Text'',''Microsoft YaHei'',''PingFang SC'',sans-serif'
    fontSize: clamp(3rem,2rem + 2.4vw,4.9375rem)
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.025em
  headline:
    fontFamily: '''Wix Madefor Text'',''Microsoft YaHei'',''PingFang SC'',sans-serif'
    fontSize: clamp(32px,4.5vw,64px)
    lineHeight: 1.12
    letterSpacing: -0.025em
  subtitle:
    fontFamily: '''Wix Madefor Text'',''Microsoft YaHei'',''PingFang SC'',sans-serif'
    fontSize: clamp(1.5rem,1.1rem + .8vw,2rem)
    fontWeight: 500
    lineHeight: 1.45
  title:
    fontFamily: '''Wix Madefor Text'',''Microsoft YaHei'',''PingFang SC'',sans-serif'
    fontSize: 23px
    lineHeight: 1.5
  body:
    fontFamily: '''Wix Madefor Text'',''Microsoft YaHei'',''PingFang SC'',sans-serif'
    fontSize: 16px
    lineHeight: 1.75
  label:
    fontFamily: '''Wix Madefor Text'',''Microsoft YaHei'',''PingFang SC'',sans-serif'
    fontSize: 14px
    lineHeight: 1.75
  nav:
    fontFamily: '''Wix Madefor Text'',''Microsoft YaHei'',''PingFang SC'',sans-serif'
    fontSize: 18px
    lineHeight: 1.75
  code:
    fontFamily: '''Cascadia Code'',Consolas,monospace'
    fontSize: 14px
    lineHeight: 1.75
  evidence-body:
    fontFamily: '''Wix Madefor Text'',''Microsoft YaHei'',''PingFang SC'',sans-serif'
    fontSize: .875rem
    lineHeight: 1.65
rounded:
  control: 5px
  code-block: 6px
  content: 8px
  action: 10px
  preview-compact: 12px
  case-visual: 14px
  preview-frame: 16px
  circle: 50%
spacing:
  '8': 8px
  '12': 12px
  '16': 16px
  '20': 20px
  '24': 24px
  '28': 28px
  '32': 32px
  '36': 36px
  '48': 48px
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.bg}'
    rounded: '{rounded.content}'
    padding: 10px 24px
  button-secondary:
    backgroundColor: transparent
    textColor: '{colors.accent-soft}'
    rounded: '{rounded.content}'
    padding: 10px 24px
  button-secondary-hover:
    backgroundColor: color-mix(in oklab, var(--bg) 92%, var(--ink))
    textColor: '{colors.accent-soft}'
    rounded: '{rounded.content}'
    padding: 10px 24px
  hero-action:
    backgroundColor: '{colors.accent}'
    textColor: '#201407'
    rounded: '{rounded.action}'
    padding: 10px 18px
  project-selector:
    backgroundColor: '#171410'
    textColor: '#e4b869'
    rounded: '{rounded.action}'
    padding: 10px 16px
  pipeline-step:
    backgroundColor: '#20170f'
    textColor: '{colors.accent-soft}'
    rounded: '{rounded.circle}'
  pipeline-step-selected:
    backgroundColor: '#2d2012'
    textColor: '{colors.accent-soft}'
    rounded: '{rounded.circle}'
  navigation:
    textColor: '{colors.ink}'
    typography: '{typography.nav}'
  tag:
    textColor: '{colors.muted}'
  work-card:
    textColor: '{colors.ink-2}'
    padding: 24px 0
  reading-container:
    backgroundColor: '{colors.bg-2}'
    rounded: '{rounded.content}'
    padding: 24px
  motion-toggle:
    backgroundColor: '{colors.bg}'
    textColor: '#dfbd7a'
    rounded: '{rounded.code-block}'
    padding: 8px 12px
  evidence-summary:
    backgroundColor: '#151a20'
    textColor: '#e6edf3'
    typography: '{typography.evidence-body}'
---

# Design System: KBber

## Overview

**Creative North Star: "Kinetic Sand Glyphs"**

Matte black and deep umber carry antique gold, warm ochre and the fine grain of sand. The material feels tactile and restrained: broad arcs and concentric marks have physical texture, while the interface stays clear enough to inspect real software work. KBber is the only public owner identity.

This system has an expressive showcase surface and quiet reading surfaces. The homepage uses the approved gold material world; project cases, articles and notes inherit its palette and typography with an untextured ground. Functional text and controls stay semantic. The homepage composition is documented in the surface brief, not prescribed as a template for every page.

**Key Characteristics:**

- Antique gold and warm umber form one coherent palette.
- Real raster sand and metal provide material depth.
- Humanist Latin type and system CJK text remain legible.
- Project evidence stays independent of decorative artwork.
- Slow bounded dust, a visible pause control and immediate manual switching keep motion subordinate to reading.

Source of truth: `src/styles/global.css`, `src/styles/taste-motion.css`, `src/layouts/BaseLayout.astro`, shared components, `src/pages/index.astro`, the project case template, shared `FinverifyPreview.astro` / `MemoryPreview.astro` components, and the original local demo in `public/demos/finverify/index.html`.

This records the corrected implementation of the same replacement world. The material assets and original assembled viewport were approved in session `220eda7ac033f0d2143e48ac45f53ddde4a3abd12970e15b7c6c76248b4cdd8b`. The user subsequently rejected the rendered result for distorted text and icons; that rejection supersedes the earlier execution approval. The original comp visual gate remains open/rejected. An independent review confirmed the scored distortion repairs, and the user approved the corrected local page for publication. This targeted review and user approval do not convert the historical whole-surface comp gate into an automated pass. The repair findings are in `.impeccable/review/distortion-review.md`.

## Colors

The frontmatter is normative. Source custom-property names are retained for the dark palette; `reading-*` entries record the light reading theme's overrides. The sidecar's eight-step OKLCH ramps are synthesized preview metadata; they are not additional shipping color tokens.

### Primary

- **Antique Gold** (`accent`) identifies primary actions, headings, brand text, selected text and progress.
- **Pale Gold** (`accent-soft`) carries reading links and quieter highlighted headings.
- **Deep Ochre** (`accent-deep`) is an available source primitive; it is not currently assigned to a recurring component.

### Neutral

- **Matte Umber** (`bg`) is the default page ground; **Deep Umber** (`bg-2`) holds secondary reading surfaces and code.
- **Warm Sand Ink** (`ink`) is the main text; **Soft Sand Ink** (`ink-2`) is body explanation; **Muted Ochre** (`muted`) is metadata.
- **Earth Stroke** (`line`) separates content. The darker surface family uses `glass-border` and `glass-highlight`; `glass-bg` in source equals `bg-2`.
- **Warm Paper** (`reading-bg`, `reading-bg-2`, `reading-glass-bg`) and dark brown reading inks preserve the same hue family in the optional light reading theme. The remaining `reading-*` entries are the actual light overrides, not a separate brand palette.

The homepage stays dark and does not expose the reading-theme switch. Literal colors in the process controls, project selectors and application frame are recorded in their component snippets; they are implemented variations within the same gold and umber family.

**The Warm World Rule.** Keep interface accents within the approved gold, ochre and umber family. Project evidence retains its own factual colors.

## Typography

**Display and Body Font:** local variable Wix Madefor Text, with Microsoft YaHei, PingFang SC and sans-serif fallback. The two bundled WOFF2 files cover Latin and Latin Extended; CJK glyphs come from the system stack. Source weights span (400–700), with `font-display: swap`. Runtime font inspection confirmed Wix Madefor Text and Microsoft YaHei. The distortion correction preserves these faces.

**Code Font:** Cascadia Code, Consolas, monospace. The source serif alias resolves to the sans stack; this implementation has no separate serif display face.

### Hierarchy

- **Display:** the homepage project name uses a bounded rem-plus-viewport clamp, a (4.9375rem) maximum and the frontmatter display role. At (639px) and below it uses `clamp(2.75rem,2rem + 4vw,3.5rem)`. It wraps long project names naturally; there is no pure-vw desktop override. GraphRAG has the source-specific clamp `clamp(2.75rem,2rem + 1.7vw,3.5rem)`, changing at the small breakpoint to `clamp(2rem,1.5rem + 2vw,3.5rem)`. These are project-title overrides, not a replacement global display scale.
- **Headline:** case headings use the headline role; at the small breakpoint they become (36px).
- **Subtitle:** the homepage uses the frontmatter subtitle role, with an explicit (12px) gap after the title. Small screens use (1.5rem). Case subtitles use `clamp(23px,2.4vw,32px)`.
- **Title:** work-card headings use the title role. Case section headings use `clamp(25px,3vw,36px)`, weight (500), line-height (1.3).
- **Body:** the base body role remains (16px). Homepage explanation is (1rem), line-height (1.8), with a (20px) top margin; its desktop line breaks become normal wrapping at (1199px) and below. Process annotations are (1rem), line-height (1.6). Case introductions use (18px) and a (70ch) maximum; implementation copy uses (17px), reducing to (16px) on small screens. General introductions stop at (65ch).
- **Label:** shared metadata uses the label role; tags are (13px). Homepage motion and next-case labels are (.875rem); these are supporting labels, not a body-text scale.
- **Navigation:** destination links use the shared (18px) nav role. The homepage brand uses `clamp(2rem,1rem + 2vw,3.3125rem)`, changing to (2rem) at the navigation breakpoint.
- **Native evidence:** shared `FinverifyPreview.astro` uses the site font stack at (.875rem), line-height (1.65); its equations and table text are (.875rem), control titles (1rem), and supporting code/status labels (.75rem). Its header title is (1.125rem) and table heading (1.25rem), with source-defined compact adjustments. Shared `MemoryPreview.astro` uses (1rem) body, (1.125rem) question/rewrite text and (.875rem) role labels. The rem values preserve the previous nominal sizes at the default root size while responding to root text enlargement. GraphRAG remains semantic HTML with a (1rem) base. The original full PDF demo keeps its own independent UI font stack. No iframe or reduced desktop bitmap supplies the corrected homepage's text.

The frontmatter omits font-weight figures for roles whose site rules do not set an explicit value. Preserve live text, fixed square icon boxes and natural wrapping; never apply independent horizontal/vertical scaling to glyphs or icons.

**The Live Type Rule.** Render names, project explanations, labels and navigation as text. Raster artwork supplies material, never readable interface copy.

## Layout

The shared non-home navigation is constrained to (1440px) with horizontal padding (36px). General content and the footer reach (1280px); prose reaches (780px). Desktop case pages use `min(100% - 72px,1280px)`. Case implementation rows divide labels and explanations in a (1:2) grid with a (48px) gap.

The homepage header is a normal flex layout. Its inner width and the main showcase use `calc(100% - clamp(40px,6.6vw,128px))` with a (1680px) maximum. The header has an (80px) minimum and vertical padding; it can grow with its content. The hero is a normal-flow flex column with a minimum of `calc(100svh - 80px)` rather than a fixed-height canvas.

The main homepage grid keeps the chosen left explanation/right evidence relationship. Its columns are `minmax(250px,23%) minmax(0,1fr)`; intro and related projects occupy the left column and the showcase spans their two rows on the right. The column gap is `clamp(32px,3.3vw,64px)` and the row gap (28px). Title, subtitle, explanation and actions share one normal-flow group. The process bar and evidence frame share the other. These relationships replace the rejected independent percentage-positioned text.

At (1199px) and below, the main grid becomes intro, showcase, then related projects in one column with (36px) gaps. Action and related-control groups can form two columns, up to (620px) wide. The evidence frame is (540px) high. The original desktop viewport dimensions remain a reference for material provenance, not coordinates to impose on live text.

At (999px) and below, navigation uses its two-column menu. The homepage header minimum becomes (76px). Process controls move above their two annotations; their group is bounded by (26.25rem). The rest of the shared reading-layout changes at this breakpoint remain in force.

At (639px) and below, action and related-control groups become single columns. The evidence frame is (570px) high, with independently reflowing live content. GraphRAG flow and search sections stack; the next-case and pause controls stack. Main homepage and reading gutters become (20px).

The homepage evidence frame has a (500px) desktop minimum rather than a fixed bitmap aspect ratio. The shared native financial summary uses its own (700px) compact-workspace breakpoint. Its case-page wrapper is (640px) high, changing to (650px) at that breakpoint. The original full PDF demo is an explicit destination, not embedded or scaled into the homepage.

The spacing entries are extracted recurring values, not a new globally enforced scale. Larger reading intervals are explicit in source: implementation starts after (88px), verification has (76px) vertical margins, and these reduce to (48px) on small screens.

## Elevation & Depth

Interface surfaces are flat at rest. Depth comes from raster sand grain, embossed button material, tonal layering and thin gold borders. There is no recurring active shadow token in these components and no active blur treatment. The source's glass-named reading container is an opaque bordered panel, not a frosted surface. Generic shadow declarations in the imported motion stylesheet target unused component classes and are not a mandate for this system.

### Material provenance

The approved reference is `.impeccable/mocks/gold-case.png`. Its build reference is `.impeccable/build/approved-comp.png`; per-region measurements live in `.impeccable/build/spec.json`. Original generated rasters are retained at:

- Background: `C:/Users/Admin/.codex/generated_images/01a206ff-db60-7923-84d1-d6b482b4cae8/exec-091e84d0-c891-4cd1-a101-7e27fec8f86e.png`, copied to `.impeccable/asset-work/background-generated.png`.
- Sun mark: `C:/Users/Admin/.codex/generated_images/01a206ff-db60-7923-84d1-d6b482b4cae8/exec-d57cab3e-ce9e-49b8-bbce-afadb3319922.png`, copied to `.impeccable/asset-work/sun-generated.png`.
- Button material: `C:/Users/Admin/.codex/generated_images/01a206ff-db60-7923-84d1-d6b482b4cae8/exec-81832514-c3e8-4227-bebf-30e158c03f10.png`, copied to `.impeccable/asset-work/button-generated.png`.

The retained approved asset set comprises four arc crops, a repeated sand texture, the isolated sun and two button plates under `assets/plates/`. The current homepage renders only the upper and lower arc crops, preserving their intrinsic ratio with (100%) width and automatic height. Rectangular edge masks fade into the same ground; the left arc fragments remain available in the asset set. Sand texture, the sun and the two action materials remain in use. Their adjacent `.png.json` files preserve origin, prompt, transformation and inspection pointers.

The ninth reviewed raster, `assets/plates/finverify-view.png`, is a real local demo capture retained as a provenance artifact. It does not provide the corrected homepage's readable UI text. The correction changes evidence delivery, without modifying the original raster files or resampling text and icons.

Factual limits matter: the background's native source is (1487 × 1058), the sun (1354 × 1162), and the button source (1774 × 887). The arc crops' 2× Lanczos conversion adds output pixels, not native detail. The repeated texture comes from a clean (40 × 140) reference region and is mirror-tiled. Native alpha is retained around and between the sun and button details; do not infer transparency from a dark-background preview alone.

**The Material Boundary Rule.** Keep gold arcs, sand and embossed surfaces as material assets. Keep project evidence separate and every actionable label in semantic HTML.

## Shapes

Concentric circles and sweeping arcs define the expressive material. The brand sun is sized from one axis: (76px) wide, automatic height, intrinsic aspect (456 / 390), with contain fitting; at (999px) and below its width is (56px). Upper and lower art retain intrinsic proportions and intentional cropping. No asset resampling or new generated art is part of this correction.

Process selectors use square aspect (1) and a (50%) radius. Their widths are bounded at (4.5rem), reducing to (4rem) at the navigation breakpoint; height follows the aspect rather than a separate viewport axis. Action and related-project SVGs keep nonshrinking square (1.875rem) boxes.

Controls use modest rounded corners; the evidence frame uses (16px), reducing to (12px) on small screens, while case visuals use (14px). The frontmatter radius roles are extracted from the current rules; the previous screenshot's separate inset-image radius is no longer a homepage component. Reading content relies on straight separators and open rows.

Borders are usually (1px); the application frame and process selectors use (2px). The action texture uses proportionate cover fitting and a uniform (1.16) scale inside a clipped control to remove frame seams. Only the material receives that crop treatment. Live text and icons retain their natural proportions; the existing interaction kit may apply its small uniform hover/press motion.

## Components

### Buttons

Reading actions are direct and solid: the primary uses Antique Gold with Matte Umber text, the secondary is transparent with Pale Gold text. Both use the content radius, (10px 24px) padding and a (48px) minimum height. Secondary hover mixes the background with the main ink and softens its border. Fine-pointer hover rises (1px); active press moves down (1px) and scales to (.985). Reduced motion removes these transforms.

Homepage actions use the approved material inside each semantic link. The control has a gold base, a warm (1px) border, the action radius, (10px 18px) padding and a (58px) minimum height. Its live label uses (1.25rem), line-height (1.4), beside a fixed square SVG. The material is cover-cropped with uniform scaling; the label is not bitmap-resampled or independently stretched.

All site controls inherit an immediate visible focus outline: (2px) Pale Gold, offset (5px). The native summary inherits the site focus outline, with a darker blue outline on its white-paper table scroller. The original full PDF demo keeps its own focus treatment. The source has no independent primary-hover color token or general error/disabled button palette; do not invent them.

### Process selectors

Three outlined circular buttons select a process annotation. Their pressed state uses a brighter gold stroke and a warmer dark fill; hover shares that treatment. Selection is represented by `aria-pressed`, and the annotation is announced politely. The source uses square aspect and bounded rem widths, with (1.25rem) labels reducing to (1.125rem) at the navigation breakpoint. Their grid keeps three tracks and lets the controls stay circular within available space. The controls are manual and have no automatic progression.

### Project selectors and next case

Related project controls are dark, outlined and rounded, with live labels and geometric inline SVG icons. They use a (54px) minimum height, (10px 16px) padding and (1.125rem) labels. Selecting a project immediately replaces its title, explanation, preview, stages and destinations. The next-case control uses the same manual switching; there is no timed carousel or whole-preview fade.

### Navigation

Brand and destination labels sit directly on the page ground in a normal flex row. The sun keeps its intrinsic aspect. A thin gold underline identifies hover and the current route. The mobile menu button is (46px) square and the reading-theme button (44px) square. The menu exposes expanded state, closes on Escape and restores focus to its trigger. Footer links keep (44px) minimum targets.

### Cards, tags and reading containers

Project cards are open rows with a top separator, (24px 0) padding, gold headings, muted stacks and repository names. They have no filled card background or cast shadow. Content-entry panels may use the opaque secondary ground, a warm border, the content radius and (24px) padding. Tags are plain muted (13px) text; they are not pill buttons. No reusable input or field component is implemented.

### Evidence frame

The homepage evidence frame is a gold-bordered container for native HTML, using the current preview-frame radius and no padded bitmap inset. The homepage and case pages reuse the same financial and memory preview components.

- **finverify:** `FinverifyPreview.astro` renders a clearly labeled synthetic table summary from `src/data/finverify-demo.json`. That data records `public/demos/finverify/index.html` as its source, preserving the example amounts, year and page labels. The three selectable relationships compute their displayed differences from those amounts. The summary identifies itself as “表格摘要”; it does not impersonate the original PDF viewer. Its explicit “打开原始 PDF 演示” link opens the full genuine demo, which retains page, coordinate and cell-location behavior.
- **GraphRAG:** semantic HTML presents the implementation structure, flow and Local/Global Search descriptions. It remains an explanation of the project, not fabricated app results.
- **ReAct memory:** shared `MemoryPreview.astro` renders the source-derived question, follow-up and rewritten question as native text at the documented sizes. The source SVG remains a retained artifact at `assets/projects/memory-comparison.svg`; it no longer supplies reduced text on either the homepage or the case page.

The financial summary uses an independently scrollable check rail and a white-paper table. At its compact breakpoint the checks become a row above the evidence. Preserve native text, the explicit synthetic-data label and real source destinations. The scored distortion repairs have been independently reviewed and accepted by the user for publication.

### Background motion control

A visible text button pauses or resumes the dust; its persisted preference is stored locally. The raster artwork remains still. The canvas draws (38) low-opacity grains, each orbiting within (12px) horizontally and (8px) vertically, at roughly (30fps). Motion stops while the hero is out of view or the document is hidden. Reduced motion clears the dust, disables the toggle with an explanatory label, and leaves all project controls usable.

**The Bounded Motion Rule.** Only background grains drift continuously. Preserve the pause control, reduced-motion fallback and manual project selection; keep evidence stable while it is read.

## Do's and Don'ts

### Do:

- **Do** use the extracted warm-gold tokens and the local font stack.
- **Do** keep project evidence independent of decorative material.
- **Do** preserve live labels, keyboard focus and truthful pressed or expanded states.
- **Do** reflow the desktop composition at the established responsive boundaries.
- **Do** keep reading surfaces quiet and respect the pause and reduced-motion preferences.
- **Do** preserve raster origin and transformation receipts when replacing or deriving an asset.

### Don't:

- **Don't** restore the discarded cyan or cobalt visual direction.
- **Don't** bake text, controls or fabricated software results into generated artwork.
- **Don't** replace approved sand and metal plates with generic gradients, blur or shadows.
- **Don't** turn the homepage composition into the layout for every reading page.
- **Don't** add automatic project cycling or motion that obscures evidence.
- **Don't** introduce a public owner identity beyond KBber.