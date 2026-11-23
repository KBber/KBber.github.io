---
name: KBber
description: "Antique gold and quiet umber surfaces for inspectable software work."
colors:
  bg: "#15120f"
  bg-2: "#201a13"
  ink: "#f0d5a3"
  ink-2: "#dfc391"
  muted: "#c8aa79"
  accent: "#e3a94f"
  accent-soft: "#edc580"
  accent-deep: "#986121"
  line: "#6d4d27"
  glass-border: "#70532b"
  glass-highlight: "#332718"
  reading-bg: "#f6efdf"
  reading-bg-2: "#eee0c5"
  reading-ink: "#342312"
  reading-ink-2: "#574021"
  reading-muted: "#6c4c28"
  reading-accent: "#865212"
  reading-accent-soft: "#6b4313"
  reading-line: "#be9d67"
  reading-glass-bg: "#f8f1e5"
  reading-glass-border: "#c7ac80"
  reading-glass-highlight: "#e7d7b9"
typography:
  display:
    fontFamily: "'Wix Madefor Text','Microsoft YaHei','PingFang SC',sans-serif"
    fontSize: "5.312vw"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Wix Madefor Text','Microsoft YaHei','PingFang SC',sans-serif"
    fontSize: "clamp(32px,4.5vw,64px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  subtitle:
    fontFamily: "'Wix Madefor Text','Microsoft YaHei','PingFang SC',sans-serif"
    fontSize: "2.455vw"
    fontWeight: 600
    lineHeight: 1.12
  title:
    fontFamily: "'Wix Madefor Text','Microsoft YaHei','PingFang SC',sans-serif"
    fontSize: "23px"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "'Wix Madefor Text','Microsoft YaHei','PingFang SC',sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Wix Madefor Text','Microsoft YaHei','PingFang SC',sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  nav:
    fontFamily: "'Wix Madefor Text','Microsoft YaHei','PingFang SC',sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.75
  code:
    fontFamily: "'Cascadia Code',Consolas,monospace"
    fontSize: "14px"
    lineHeight: 1.75
rounded:
  control: "5px"
  code-block: "6px"
  content: "8px"
  action: "10px"
  preview-image: "11px"
  preview-compact: "12px"
  case-visual: "14px"
  preview-frame: "18px"
  circle: "50%"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "28": "28px"
  "32": "32px"
  "36": "36px"
  "48": "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: "{rounded.content}"
    padding: "10px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.accent-soft}"
    rounded: "{rounded.content}"
    padding: "10px 24px"
  button-secondary-hover:
    backgroundColor: "color-mix(in oklab, var(--bg) 92%, var(--ink))"
    textColor: "{colors.accent-soft}"
    rounded: "{rounded.content}"
    padding: "10px 24px"
  hero-action:
    backgroundColor: "transparent"
    textColor: "#201407"
    rounded: "{rounded.action}"
  project-selector:
    backgroundColor: "#171410"
    textColor: "#e4b869"
    rounded: "{rounded.action}"
    padding: "0 16px"
  pipeline-step:
    backgroundColor: "#20170f"
    textColor: "{colors.accent-soft}"
    rounded: "{rounded.circle}"
  pipeline-step-selected:
    backgroundColor: "#2d2012"
    textColor: "{colors.accent-soft}"
    rounded: "{rounded.circle}"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
  tag:
    textColor: "{colors.muted}"
  work-card:
    textColor: "{colors.ink-2}"
    padding: "24px 0"
  reading-container:
    backgroundColor: "{colors.bg-2}"
    rounded: "{rounded.content}"
    padding: "24px"
  motion-toggle:
    backgroundColor: "{colors.bg}"
    textColor: "#dfbd7a"
    rounded: "{rounded.code-block}"
    padding: "8px 12px"
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

Source of truth: `src/styles/global.css`, `src/styles/taste-motion.css`, `src/layouts/BaseLayout.astro`, shared components, `src/pages/index.astro` and the project case template. This records the first implementation of the replacement world. The nine reviewed raster assets and assembled first viewport were approved in session `220eda7ac033f0d2143e48ac45f53ddde4a3abd12970e15b7c6c76248b4cdd8b`; this document does not grant publication approval.

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

**The Warm World Rule.** Keep interface accents within the approved gold, ochre and umber family. Project screenshots retain their own factual colors.

## Typography

**Display and Body Font:** local variable Wix Madefor Text, with Microsoft YaHei, PingFang SC and sans-serif fallback. The two bundled WOFF2 files cover Latin and Latin Extended; CJK glyphs come from the system stack. Source weights span (400–700), with `font-display: swap`.

**Code Font:** Cascadia Code, Consolas, monospace. The source serif alias resolves to the sans stack; this implementation has no separate serif display face.

### Hierarchy

- **Display:** the homepage project name uses the frontmatter display role on desktop. Tablet changes to `clamp(52px,9vw,79px)` with line-height (1.03); small screens use `clamp(48px,14vw,65px)`. The GraphRAG title has a desktop-specific smaller clamp in source.
- **Headline:** case headings use the headline role; at the small breakpoint they become (36px).
- **Subtitle:** the homepage subtitle uses the subtitle role on desktop, (29px) with line-height (1.5) on tablet and (23px) on small screens. Case subtitles use `clamp(23px,2.4vw,32px)`.
- **Title:** work-card headings use the title role. Case section headings use `clamp(25px,3vw,36px)`, weight (500), line-height (1.3).
- **Body:** the base body role supports reading. Case introductions use (18px) and a (70ch) maximum; implementation copy uses (17px), reducing to (16px) on small screens. General introductions stop at (65ch).
- **Label:** metadata uses the label role; tags are (13px). Desktop homepage annotations scale with viewport width; reading labels remain steady.
- **Navigation:** shared navigation uses the nav role; the approved desktop homepage scales it with `clamp(17px,1.55vw,23px)` and letter-spacing (.12em).

**The Live Type Rule.** Render names, project explanations, labels and navigation as text. Raster artwork supplies material, never readable interface copy.

## Layout

The shared navigation is constrained to (1440px) with horizontal padding (36px). General content and the footer reach (1280px); prose reaches (780px). Desktop case pages use `min(100% - 72px,1280px)`. Case implementation rows divide labels and explanations in a (1:2) grid with a (48px) gap.

The desktop homepage is a viewport composition based on the approved (1487 × 1058) reference. It uses percentage placement and a (100svh) hero with a (740px) minimum. The project window occupies the broad right-hand field; this positioning belongs to the homepage surface contract.

At (999px) and below, the header returns to normal flow and navigation opens as a two-column menu. The homepage switches to a two-column content grid, with the preview across both columns and paired actions below it. Upper and lower art become subdued cropped bands; left arc fragments and separate desktop button plates are hidden. The buttons reuse their material as a background. The preview uses an aspect ratio of (1.81).

At (639px) and below, the homepage and project directory become a single column. The preview ratio becomes (1.5). Case implementation rows stack, process lists become two columns, and case actions stack. Main horizontal gutters become (20px); medium layouts use (24px) or (28px) depending on surface.

The spacing entries are extracted recurring values, not a new globally enforced scale. Larger reading intervals are explicit in source: implementation starts after (88px), verification has (76px) vertical margins, and these reduce to (48px) on small screens.

## Elevation & Depth

Interface surfaces are flat at rest. Depth comes from raster sand grain, embossed button material, tonal layering and thin gold borders. There is no recurring active shadow token in these components and no active blur treatment. The source's glass-named reading container is an opaque bordered panel, not a frosted surface. Generic shadow declarations in the imported motion stylesheet target unused component classes and are not a mandate for this system.

### Material provenance

The approved reference is `.impeccable/mocks/gold-case.png`. Its build reference is `.impeccable/build/approved-comp.png`; per-region measurements live in `.impeccable/build/spec.json`. Original generated rasters are retained at:

- Background: `C:/Users/Admin/.codex/generated_images/01a206ff-db60-7923-84d1-d6b482b4cae8/exec-091e84d0-c891-4cd1-a101-7e27fec8f86e.png`, copied to `.impeccable/asset-work/background-generated.png`.
- Sun mark: `C:/Users/Admin/.codex/generated_images/01a206ff-db60-7923-84d1-d6b482b4cae8/exec-d57cab3e-ce9e-49b8-bbce-afadb3319922.png`, copied to `.impeccable/asset-work/sun-generated.png`.
- Button material: `C:/Users/Admin/.codex/generated_images/01a206ff-db60-7923-84d1-d6b482b4cae8/exec-81832514-c3e8-4227-bebf-30e158c03f10.png`, copied to `.impeccable/asset-work/button-generated.png`.

Shipping art comprises four arc crops, a repeated sand texture, the isolated sun and two button plates under `assets/plates/`. Their adjacent `.png.json` files preserve origin, prompt, transformation and inspection pointers. The ninth reviewed raster, `assets/plates/finverify-view.png`, is a real local demo capture, not generated interface text.

Factual limits matter: the background's native source is (1487 × 1058), the sun (1354 × 1162), and the button source (1774 × 887). The arc crops' 2× Lanczos conversion adds output pixels, not native detail. The repeated texture comes from a clean (40 × 140) reference region and is mirror-tiled. Native alpha is retained around and between the sun and button details; do not infer transparency from a dark-background preview alone.

**The Material Boundary Rule.** Keep gold arcs, sand and embossed surfaces as material assets. Keep evidence images separate and every actionable label in semantic HTML.

## Shapes

Concentric circles and sweeping arcs define the expressive material. Functional process selectors are true circles. Controls use modest rounded corners; application previews use a larger outer frame and smaller inset image radius. Reading content relies on straight separators and open rows.

The frontmatter radius roles are extracted from real rules. They are contextual: a case visual, code block and action do not share one universal radius. Borders are usually (1px); the desktop application frame and process selectors use (2px). Preserve the clipping of approved arc artwork instead of inventing new ornaments to fill quiet areas.

## Components

### Buttons

Reading actions are direct and solid: the primary uses Antique Gold with Matte Umber text, the secondary is transparent with Pale Gold text. Both use the content radius, (10px 24px) padding and a (48px) minimum height. Secondary hover mixes the background with the main ink and softens its border. Fine-pointer hover rises (1px); active press moves down (1px) and scales to (.985). Reduced motion removes these transforms.

Homepage actions place live dark labels and line icons over the approved material plates. The desktop semantic control remains transparent above its raster. Compact layouts apply the same material directly as a background and use a (56px) minimum height. Do not substitute a flat CSS approximation for the approved plate.

All controls inherit an immediate visible focus outline: (2px) Pale Gold, offset (5px). The source has no independent primary-hover color token or error/disabled button palette; do not invent them.

### Process selectors

Three outlined circular buttons select a process annotation. Their pressed state uses a brighter gold stroke and a warmer dark fill; hover shares that treatment. Selection is represented by `aria-pressed`, and the annotation is announced politely. Compact layouts use (64px) circles. The controls are manual and have no automatic progression.

### Project selectors and next case

Related project controls are dark, outlined and rounded, with live labels and geometric inline SVG icons. They meet a (44px) minimum target on desktop and (54px) in the compact grid. Selecting a project immediately replaces its title, explanation, preview, stages and destinations. The next-case control uses the same manual switching; there is no timed carousel or whole-preview fade.

### Navigation

Brand and destination labels sit directly on the page ground. A thin gold underline identifies hover and the current route. The mobile menu button is (46px) square and the reading-theme button (44px) square. The menu exposes expanded state, closes on Escape and restores focus to its trigger. Footer links keep (44px) minimum targets.

### Cards, tags and reading containers

Project cards are open rows with a top separator, (24px 0) padding, gold headings, muted stacks and repository names. They have no filled card background or cast shadow. Content-entry panels may use the opaque secondary ground, a warm border, the content radius and (24px) padding. Tags are plain muted (13px) text; they are not pill buttons. No reusable input or field component is implemented.

### Evidence frame

The homepage uses a thin gold frame, the preview-frame radius, (5px) inset and a smaller rounded image. On compact layouts the inset becomes (3px), and the frame uses preview-compact. Case evidence uses the case-visual radius and a warm separator border. Preserve genuine project captures and source diagrams; an explanatory structure preview must remain labeled as such.

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