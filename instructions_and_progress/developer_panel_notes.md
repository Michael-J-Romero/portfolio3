# Developer Panel Notes

## Goal
Build a hidden in-UI prototype panel for testing design variants without disrupting the current component/file structure.

## Current implementation scope
- Hidden panel toggled with `Shift + D`
- Local storage persistence for prototype state
- Hero variants wired into the live page
- About variants wired into the live page
- Variant definitions organized under `src/variants/...`
- Internal scroll region so panel content remains accessible when controls grow
- Tabbed grouping for easier category-based browsing

## Current hero controls
- Headline variant
- Supporting copy density
- Visual composition variant
- Resume placement in hero

## Current hero prototype coverage
- Long-form, concise, systems-forward, direct, and editorial headline directions
- Full, trimmed, and minimal supporting-copy density options
- Stacked, dominant, collage, and minimal abstract visual directions

## Current About prototype coverage
- Full, balanced, and reduced copy modes
- Even grid, featured-card, and editorial-list capability layouts
- Neutral, elevated, and chapter-separation section tones

## Important implementation rule
Do not fork existing page structure for design experiments.
Keep components in place and route prototype changes through variant state wherever practical.

## Expansion ideas
- Spacing density controls per section
- Typography scale variants
- Section background intensity toggles
- Projects card density variants
- Nav width / compactness variants
- About card rhythm variants
