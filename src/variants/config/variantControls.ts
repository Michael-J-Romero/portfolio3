import type {
  AboutCardsVariantId,
  AboutCopyVariantId,
  AboutToneVariantId,
  BackgroundContrastVariantId,
  BackgroundGridVariantId,
  BackgroundParallaxVariantId,
  BackgroundStyleVariantId,
  ContactFooterVariantId,
  ContactIntroVariantId,
  ContactLayoutVariantId,
  ContactSurfaceVariantId,
  DialogLayoutVariantId,
  DialogSizeVariantId,
  HeroHeadlineVariantId,
  HeroLayoutVariantId,
  HeroResumeMode,
  HeroSupportVariantId,
  NavbarStyleVariantId,
  InteractiveFeaturedVariantId,
  InteractiveIntroVariantId,
  InteractiveLegacyVariantId,
  InteractiveSurfaceVariantId,
  OptimizationAtmosphereVariantId,
  OptimizationGlassBehaviorVariantId,
  OptimizationGlassLevelVariantId,
  OptimizationGlassPauseVariantId,
  OptimizationGlassScopeVariantId,
  OptimizationGlassTransitionVariantId,
  OptimizationSurfaceVariantId,
  SkillsChipVariantId,
  SkillsIntroVariantId,
  SkillsLayoutVariantId,
  ProjectsCardVariantId,
  ProjectsIntroVariantId,
  ProjectsLayoutVariantId,
  ProjectsSurfaceVariantId,
  VariantControlDefinition,
} from './types';

export const VARIANT_CONTROLS: Array<
  | VariantControlDefinition<AboutCardsVariantId>
  | VariantControlDefinition<AboutCopyVariantId>
  | VariantControlDefinition<AboutToneVariantId>
  | VariantControlDefinition<BackgroundContrastVariantId>
  | VariantControlDefinition<BackgroundGridVariantId>
  | VariantControlDefinition<BackgroundParallaxVariantId>
  | VariantControlDefinition<BackgroundStyleVariantId>
  | VariantControlDefinition<ContactFooterVariantId>
  | VariantControlDefinition<ContactIntroVariantId>
  | VariantControlDefinition<ContactLayoutVariantId>
  | VariantControlDefinition<ContactSurfaceVariantId>
  | VariantControlDefinition<DialogLayoutVariantId>
  | VariantControlDefinition<DialogSizeVariantId>
  | VariantControlDefinition<HeroHeadlineVariantId>
  | VariantControlDefinition<HeroLayoutVariantId>
  | VariantControlDefinition<HeroSupportVariantId>
  | VariantControlDefinition<HeroResumeMode>
  | VariantControlDefinition<NavbarStyleVariantId>
  | VariantControlDefinition<InteractiveFeaturedVariantId>
  | VariantControlDefinition<InteractiveIntroVariantId>
  | VariantControlDefinition<InteractiveLegacyVariantId>
  | VariantControlDefinition<InteractiveSurfaceVariantId>
  | VariantControlDefinition<OptimizationAtmosphereVariantId>
  | VariantControlDefinition<OptimizationGlassBehaviorVariantId>
  | VariantControlDefinition<OptimizationGlassLevelVariantId>
  | VariantControlDefinition<OptimizationGlassPauseVariantId>
  | VariantControlDefinition<OptimizationGlassScopeVariantId>
  | VariantControlDefinition<OptimizationGlassTransitionVariantId>
  | VariantControlDefinition<OptimizationSurfaceVariantId>
  | VariantControlDefinition<SkillsChipVariantId>
  | VariantControlDefinition<SkillsIntroVariantId>
  | VariantControlDefinition<SkillsLayoutVariantId>
  | VariantControlDefinition<ProjectsCardVariantId>
  | VariantControlDefinition<ProjectsIntroVariantId>
  | VariantControlDefinition<ProjectsLayoutVariantId>
  | VariantControlDefinition<ProjectsSurfaceVariantId>
> = [
  {
    id: 'heroHeadline',
    category: 'hero',
    label: 'Hero headline',
    description: 'Controls the first-read density and tone of the main hero statement.',
    options: [
      {
        value: 'current',
        label: 'Current long-form',
        description: 'Keeps the original more descriptive hero statement.',
      },
      {
        value: 'concise',
        label: 'Concise recommended',
        description: 'Shorter, cleaner headline for stronger first-glance impact.',
      },
      {
        value: 'systems',
        label: 'Systems-forward',
        description: 'Emphasizes interactive and technical foundations more directly.',
      },
      {
        value: 'direct',
        label: 'Direct design-led',
        description: 'A cleaner, more immediate line focused on visual polish and depth.',
      },
      {
        value: 'editorial',
        label: 'Editorial hero-first',
        description: 'A more refined hero statement with slightly more design-forward phrasing.',
      },
      {
        value: 'compact',
        label: 'Compact',
        description: 'Very short — just 4 words focusing on core message.',
      },
      {
        value: 'minimal',
        label: 'Minimal with context',
        description: 'Brief headline mentioning game development roots (8 words).',
      },
      {
        value: 'brief',
        label: 'Brief descriptive',
        description: 'Short but descriptive, emphasizing polished and interaction-driven (5 words).',
      },
    ],
  },
  {
    id: 'heroSupport',
    category: 'hero',
    label: 'Hero supporting copy',
    description: 'Controls paragraph density beneath the headline.',
    options: [
      {
        value: 'current',
        label: 'Current paragraph',
        description: 'Uses the fuller supporting introduction currently on the page.',
      },
      {
        value: 'trimmed',
        label: 'Trimmed paragraph',
        description: 'Tighter support copy for a more editorial opening screen.',
      },
      {
        value: 'minimal',
        label: 'Minimal paragraph',
        description: 'A very reduced support line for testing a cleaner opening composition.',
      },
    ],
  },
  {
    id: 'heroLayout',
    category: 'hero',
    label: 'Hero layout',
    description: 'Controls how content and animation are arranged in the hero section to give the square animation appropriate space.',
    options: [
      {
        value: 'balanced-split',
        label: 'Balanced split',
        description: 'Current layout with slightly text-favored columns (1.1fr text / 0.9fr animation).',
      },
      {
        value: 'balanced-overlap',
        label: 'Balanced overlap',
        description: 'A close clone of balanced split with a larger animation drifting behind the text column.',
      },
      {
        value: 'balanced-overlap-strong',
        label: 'Balanced overlap strong',
        description: 'Pushes the same overlap idea further with a much larger animation spilling farther behind the text.',
      },
      {
        value: 'balanced-sticky-parallax',
        label: 'Balanced sticky parallax',
        description: 'Keeps the split structure but top-aligns the animation, holds it sticky, and adds scroll parallax on larger screens.',
      },
      {
        value: 'extreme-parallax',
        label: 'Extreme parallax',
        description: 'Animation scrolls significantly slower than the page creating a strong depth effect without sticky positioning.',
      },
      {
        value: 'extreme-parallax-fade',
        label: 'Extreme parallax fade',
        description: 'Same slow scroll parallax as extreme version, intended to pair with the About solid-cover tone instead of fading the hero visual itself.',
      },
      {
        value: 'extreme-parallax-fade2',
        label: 'Extreme parallax fade 2',
        description: 'A smoother Framer Motion version of the fixed extreme parallax treatment, intended to pair with the About solid-cover tone.',
      },
      {
        value: 'animation-large',
        label: 'Animation large',
        description: 'Shifts balance to give the square animation more presence (0.9fr text / 1.1fr animation).',
      },
      {
        value: 'stacked-priority',
        label: 'Stacked priority',
        description: 'Vertical stack with animation below text, emphasizing content hierarchy first.',
      },
      {
        value: 'animation-dominant',
        label: 'Animation dominant',
        description: 'Makes animation significantly larger while keeping text compact and efficient.',
      },
      {
        value: 'centered-showcase',
        label: 'Centered showcase',
        description: 'Centers both elements with animation positioned prominently for maximum visual impact.',
      },
      {
        value: 'header-split-actions',
        label: 'Header split actions',
        description: 'Title spans the top, text and animation sit side-by-side below, actions centered at bottom.',
      },
      {
        value: 'title-priority-split',
        label: 'Title priority split',
        description: 'Large title on top with full attention, balanced content and animation columns, unified actions below.',
      },
      {
        value: 'unified-top-columns',
        label: 'Unified top columns',
        description: 'Compact header at top, subtitle and animation as balanced columns, actions span the bottom.',
      },
    ],
  },
  {
    id: 'heroResume',
    category: 'hero',
    label: 'Resume placement',
    description: 'Decides whether Resume appears in the hero CTA row or is reserved for later.',
    options: [
      {
        value: 'hero-link',
        label: 'Show in hero',
        description: 'Keep Resume as a tertiary text link in the hero.',
      },
      {
        value: 'nav-only',
        label: 'Hide from hero',
        description: 'Remove Resume from the hero to reduce density.',
      },
    ],
  },
  {
    id: 'navbarStyle',
    category: 'hero',
    label: 'Navbar style',
    description: 'Controls the navigation bar visual treatment and positioning behavior.',
    options: [
      {
        value: 'floating',
        label: 'Floating capsule',
        description: 'Current floating rounded navbar with inset positioning and glass effects.',
      },
      {
        value: 'fixed-top',
        label: 'Fixed edge',
        description: 'Traditional full-width navbar fixed to the top edge of the viewport.',
      },
      {
        value: 'minimal',
        label: 'Minimal clean',
        description: 'Simplified navbar with reduced decoration and cleaner appearance.',
      },
      {
        value: 'compact',
        label: 'Compact dense',
        description: 'Smaller, more condensed navbar with tighter spacing throughout.',
      },
      {
        value: 'bold',
        label: 'Bold accent',
        description: 'Stronger accent colors and more prominent visual presence.',
      },
    ],
  },
  {
    id: 'aboutCopy',
    category: 'about',
    label: 'About copy mode',
    description: 'Controls how much narrative weight the About section carries.',
    options: [
      {
        value: 'full',
        label: 'Full narrative',
        description: 'Keeps the current fuller two-paragraph structure.',
      },
      {
        value: 'balanced',
        label: 'Balanced hierarchy',
        description: 'Reduces reading weight while keeping the section credible and complete.',
      },
      {
        value: 'reduced',
        label: 'Reduced narrative',
        description: 'Compresses About into a more editorial summary.',
      },
    ],
  },
  {
    id: 'aboutCards',
    category: 'about',
    label: 'About layout',
    description: 'Changes the overall presentation of the three About focus areas.',
    options: [
      {
        value: 'grid',
        label: 'Three-column grid',
        description: 'Balanced three-up layout for the core pillars.',
      },
      {
        value: 'featured',
        label: 'Featured lead card',
        description: 'Makes the first pillar dominant while the other two support it.',
      },
      {
        value: 'editorial',
        label: 'Editorial list',
        description: 'Reduces card heaviness and moves toward a lighter editorial feel.',
      },
      {
        value: 'split',
        label: 'Split feature rows',
        description: 'Reshapes the area into wide horizontal feature rows with stronger reading rhythm.',
      },
      {
        value: 'rail',
        label: 'Accent rail stack',
        description: 'Keeps the vertical stacked rhythm but treats each pillar as a separate lane with accent rails instead of steps.',
      },
      {
        value: 'panel',
        label: 'Split panel stack',
        description: 'Uses wide split cards with a stronger left label column and a cool accent seam.',
      },
      {
        value: 'beacon',
        label: 'Beacon cards',
        description: 'Stacks independent cards with compact accent markers and more glow-driven emphasis.',
      },
    ],
  },
  {
    id: 'aboutTone',
    category: 'about',
    label: 'Section tone',
    description: 'Controls how strongly the About section separates from surrounding sections.',
    options: [
      {
        value: 'neutral',
        label: 'Neutral surface',
        description: 'Minimal tonal distinction from the surrounding page.',
      },
      {
        value: 'elevated',
        label: 'Elevated surface',
        description: 'Adds a subtler raised-surface feel behind the section.',
      },
      {
        value: 'chapter',
        label: 'Chapter separation',
        description: 'Creates a stronger chapter break before proof-of-work sections.',
      },
      {
        value: 'solid-cover',
        label: 'Solid cover',
        description: 'Uses an opaque About surface with a top cover edge so the section cleanly hides the hero visual as it scrolls in.',
      },
    ],
  },
  {
    id: 'backgroundStyle',
    category: 'background',
    label: 'Background style',
    description: 'Changes the overall page background composition.',
    options: [
      {
        value: 'minimal',
        label: 'Minimal field',
        description: 'Very restrained background with only a faint ambient glow.',
      },
      {
        value: 'halo',
        label: 'Top halo',
        description: 'A centered halo glow similar to the current direction.',
      },
      {
        value: 'mesh',
        label: 'Ambient mesh',
        description: 'Multiple soft glows distributed across the page.',
      },
      {
        value: 'aurora',
        label: 'Aurora wash',
        description: 'Diagonal luminous washes with a more atmospheric feel.',
      },
      {
        value: 'contrast',
        label: 'High contrast stage',
        description: 'Darker base with stronger spotlight separation.',
      },
      {
        value: 'ink',
        label: 'Ink field',
        description: 'Moodier background with off-center illuminated pockets.',
      },
    ],
  },
  {
    id: 'backgroundGrid',
    category: 'background',
    label: 'Grid overlay',
    description: 'Controls whether the page background includes a grid and what kind.',
    options: [
      {
        value: 'none',
        label: 'No grid',
        description: 'Disables the page grid entirely.',
      },
      {
        value: 'fine',
        label: 'Fine grid',
        description: 'Subtle medium-density grid.',
      },
      {
        value: 'wide',
        label: 'Wide grid',
        description: 'Larger grid cells with a calmer technical feel.',
      },
      {
        value: 'blueprint',
        label: 'Blueprint grid',
        description: 'More visible technical grid with fine subdivisions.',
      },
    ],
  },
  {
    id: 'backgroundContrast',
    category: 'background',
    label: 'Contrast level',
    description: 'Controls how strong the background glow and grid read against the page.',
    options: [
      {
        value: 'soft',
        label: 'Soft',
        description: 'More restrained and low-contrast.',
      },
      {
        value: 'balanced',
        label: 'Balanced',
        description: 'Moderate contrast for general use.',
      },
      {
        value: 'high',
        label: 'High',
        description: 'Stronger contrast and more visible background structure.',
      },
    ],
  },
  {
    id: 'backgroundParallax',
    category: 'background',
    label: 'Background parallax',
    description: 'Restores lightweight scroll-reactive movement for the root CSS background only.',
    options: [
      {
        value: 'none',
        label: 'None',
        description: 'No background parallax movement.',
      },
      {
        value: 'soft',
        label: 'Soft parallax',
        description: 'Very light scroll-linked background drift designed to stay inexpensive.',
      },
      {
        value: 'depth',
        label: 'Depth parallax',
        description: 'A slightly stronger offset for more visible page-depth motion.',
      },
    ],
  },
  {
    id: 'optimizationSurface',
    category: 'optimization',
    label: 'Section surfaces',
    description: 'Controls how transparent or solid section and card surfaces feel across the page.',
    options: [
      {
        value: 'airy',
        label: 'Airy transparency',
        description: 'Brings back a lighter translucent surface treatment.',
      },
      {
        value: 'balanced',
        label: 'Balanced',
        description: 'Keeps a moderate amount of transparency without going fully solid.',
      },
      {
        value: 'solid',
        label: 'Solid surfaces',
        description: 'Removes most transparency from section and card surfaces for maximum stability.',
      },
    ],
  },
  {
    id: 'optimizationAtmosphere',
    category: 'optimization',
    label: 'Section atmosphere',
    description: 'Controls how much section-level glow and tonal atmosphere is allowed.',
    options: [
      {
        value: 'full',
        label: 'Full atmosphere',
        description: 'Keeps the richer section glows and tonal accents.',
      },
      {
        value: 'reduced',
        label: 'Reduced atmosphere',
        description: 'Softens section glow and decorative tonal shifts.',
      },
      {
        value: 'off',
        label: 'Atmosphere off',
        description: 'Removes most section-level atmospheric accent layers.',
      },
    ],
  },
  {
    id: 'optimizationGlassLevel',
    category: 'optimization',
    label: 'Glass intensity',
    description: 'Reintroduces backdrop-filter at controlled levels so you can test glass without forcing the heaviest version everywhere.',
    options: [
      {
        value: 'off',
        label: 'Off',
        description: 'Keeps the current opaque performance-safe surfaces with no live glass blur.',
      },
      {
        value: 'subtle',
        label: 'Subtle glass',
        description: 'A light blur and tint reduction intended to stay the safest visually and technically.',
      },
      {
        value: 'medium',
        label: 'Medium glass',
        description: 'A more noticeable frosted treatment with moderate blur and stronger translucency.',
      },
      {
        value: 'strong',
        label: 'Strong glass',
        description: 'The richest glass treatment available in this setup and the most likely to cost performance.',
      },
    ],
  },
  {
    id: 'optimizationGlassBehavior',
    category: 'optimization',
    label: 'Glass behavior',
    description: 'Controls whether the UI stays on a high-quality fake glass treatment or restores real backdrop blur after scrolling settles.',
    options: [
      {
        value: 'fake',
        label: 'Fake glass only',
        description: 'Uses the glass look without live backdrop blur, which is the safest performance choice.',
      },
      {
        value: 'idle-snapshot',
        label: 'Idle real, cached snapshot',
        description: 'Captures the navbar background while idle, then uses that cached image during scroll before restoring real blur once idle again.',
      },
      {
        value: 'idle-fade',
        label: 'Idle real, smooth fade',
        description: 'Transitions the navbar between fake glass during motion and real glass when idle with a softer visual handoff.',
      },
      {
        value: 'always-real',
        label: 'Always real',
        description: 'Keeps live backdrop blur active on every eligible surface and is the most expensive option.',
      },
    ],
  },
  {
    id: 'optimizationGlassTransition',
    category: 'optimization',
    label: 'Glass transition length',
    description: 'Controls how long the navbar takes to ease back into real glass once scrolling has fully settled.',
    options: [
      {
        value: 'quick',
        label: 'Quick',
        description: 'A shorter return transition with less lingering motion.',
      },
      {
        value: 'balanced',
        label: 'Balanced',
        description: 'A moderate return transition suitable for most combinations.',
      },
      {
        value: 'slow',
        label: 'Slow',
        description: 'A longer return transition with a more noticeable handoff.',
      },
      {
        value: 'cinematic',
        label: 'Cinematic',
        description: 'The longest return transition for a very soft glass re-entry.',
      },
    ],
  },
  {
    id: 'optimizationGlassPause',
    category: 'optimization',
    label: 'Idle pause before glass',
    description: 'Controls how long scrolling must stay settled before the navbar returns to real glass, which also debounces small scroll interruptions.',
    options: [
      {
        value: 'short',
        label: 'Short pause',
        description: 'Returns to real glass sooner after motion stops.',
      },
      {
        value: 'balanced',
        label: 'Balanced pause',
        description: 'A moderate pause that avoids most rapid toggling.',
      },
      {
        value: 'long',
        label: 'Long pause',
        description: 'Waits longer before restoring real glass so tiny scrolls do not retrigger it constantly.',
      },
      {
        value: 'linger',
        label: 'Linger',
        description: 'The most debounced option, keeping fake glass active until scrolling has been clearly idle for a while.',
      },
    ],
  },
  {
    id: 'optimizationGlassScope',
    category: 'optimization',
    label: 'Glass scope',
    description: 'Controls whether glass is limited to persistent chrome or allowed onto section surfaces too.',
    options: [
      {
        value: 'chrome',
        label: 'Chrome only',
        description: 'Applies glass only to the navbar, mobile menu, and developer panel.',
      },
      {
        value: 'visible',
        label: 'Visible sections',
        description: 'Applies section glass only while a section is in view, while chrome stays glassy.',
      },
      {
        value: 'full',
        label: 'All eligible surfaces',
        description: 'Applies glass to both chrome and the main eligible content surfaces across the page.',
      },
    ],
  },
  {
    id: 'contactIntro',
    category: 'closing',
    label: 'Contact framing',
    description: 'Changes the tone of the closing call-to-action section.',
    options: [
      {
        value: 'direct',
        label: 'Direct contact',
        description: 'Keeps the straightforward current call-to-action tone.',
      },
      {
        value: 'conversational',
        label: 'Conversational',
        description: 'Feels more like an invitation to talk than a formal CTA.',
      },
      {
        value: 'opportunities',
        label: 'Opportunities',
        description: 'Makes availability and role fit more explicit.',
      },
      {
        value: 'editorial',
        label: 'Editorial closing note',
        description: 'A quieter and more restrained final section tone.',
      },
    ],
  },
  {
    id: 'contactLayout',
    category: 'closing',
    label: 'Contact layout',
    description: 'Changes the structure of the closing call-to-action block.',
    options: [
      {
        value: 'centered',
        label: 'Centered CTA',
        description: 'Keeps the current centered closing composition.',
      },
      {
        value: 'split',
        label: 'Split closing',
        description: 'Uses a left-right split between message and actions.',
      },
      {
        value: 'stacked',
        label: 'Stacked note',
        description: 'A more linear, editorial closing stack with quieter pacing.',
      },
    ],
  },
  {
    id: 'contactSurface',
    category: 'closing',
    label: 'Contact surface',
    description: 'Changes the visual atmosphere of the contact section.',
    options: [
      {
        value: 'ambient',
        label: 'Ambient glow',
        description: 'Keeps the current soft atmospheric background.',
      },
      {
        value: 'glow',
        label: 'Accent glow',
        description: 'Increases the cyan focus and closing-stage energy.',
      },
      {
        value: 'quiet',
        label: 'Quiet surface',
        description: 'Pulls the atmosphere back for a calmer final section.',
      },
    ],
  },
  {
    id: 'contactFooter',
    category: 'closing',
    label: 'Footer tone',
    description: 'Adjusts the footer line emphasis beneath the contact section.',
    options: [
      {
        value: 'simple',
        label: 'Simple footer',
        description: 'Minimal footer emphasis.',
      },
      {
        value: 'network',
        label: 'Network footer',
        description: 'Leans on the outbound link set more clearly.',
      },
      {
        value: 'build',
        label: 'Build note footer',
        description: 'Keeps the footer as a concise build note.',
      },
    ],
  },
  {
    id: 'skillsIntro',
    category: 'skills',
    label: 'Section framing',
    description: 'Changes how the Capabilities section is positioned in relation to the rest of the page.',
    options: [
      {
        value: 'capabilities',
        label: 'Capabilities',
        description: 'Keeps the current straightforward capabilities framing.',
      },
      {
        value: 'strengths',
        label: 'Working strengths',
        description: 'Makes the section feel more like a concise map of recurring strengths.',
      },
      {
        value: 'toolkit',
        label: 'Toolkit',
        description: 'Frames the section as a more practical tool-and-method overview.',
      },
      {
        value: 'proof',
        label: 'Supporting proof',
        description: 'Positions the section as broader context behind the project work.',
      },
    ],
  },
  {
    id: 'skillsLayout',
    category: 'skills',
    label: 'Layout mode',
    description: 'Changes the structure of the capabilities groups.',
    options: [
      {
        value: 'grid',
        label: 'Balanced grid',
        description: 'A clear four-card grid with even weight across groups.',
      },
      {
        value: 'featured',
        label: 'Featured lead',
        description: 'Gives the first group stronger hierarchy and lets the others support it.',
      },
      {
        value: 'bands',
        label: 'Horizontal bands',
        description: 'Turns the section into stacked bands with stronger label-to-content separation.',
      },
      {
        value: 'editorial',
        label: 'Editorial list',
        description: 'A calmer list-like layout with less card-block repetition.',
      },
    ],
  },
  {
    id: 'skillsChip',
    category: 'skills',
    label: 'Skill item treatment',
    description: 'Changes how the individual capability items are displayed inside each group.',
    options: [
      {
        value: 'chips',
        label: 'Chips',
        description: 'Keeps the current chip-based readout.',
      },
      {
        value: 'minimal',
        label: 'Minimal list',
        description: 'Removes most chip styling for a cleaner, lower-noise read.',
      },
      {
        value: 'grouped',
        label: 'Grouped stack',
        description: 'Uses denser grouped tags for a more compact technical feel.',
      },
    ],
  },
  {
    id: 'interactiveIntro',
    category: 'interactive',
    label: 'Section framing',
    description: 'Changes how Games & Interactive Work is positioned within the portfolio story.',
    options: [
      {
        value: 'roots',
        label: 'Game roots',
        description: 'Frames the section as the origin of your interactive thinking.',
      },
      {
        value: 'current',
        label: 'Current + roots',
        description: 'Balances the current VR project against the older game archive.',
      },
      {
        value: 'systems',
        label: 'Systems-forward',
        description: 'Emphasizes the section as proof of systems, motion, and responsive behavior.',
      },
      {
        value: 'play',
        label: 'Play + prototyping',
        description: 'Gives the section a more experimental and prototype-driven tone.',
      },
    ],
  },
  {
    id: 'interactiveFeatured',
    category: 'interactive',
    label: 'Featured project treatment',
    description: 'Changes how the current Rhythm Drumming VR project is presented.',
    options: [
      {
        value: 'spotlight',
        label: 'Spotlight card',
        description: 'A broad hero-style feature card for the current project.',
      },
      {
        value: 'split',
        label: 'Split prototype panel',
        description: 'Separates meta and summary into a stronger left-right layout.',
      },
      {
        value: 'imageLeft1',
        label: 'Image left 1',
        description: 'A more balanced image-left split with a large preview that avoids the tallest crop.',
      },
      {
        value: 'wide',
        label: 'Wide image split',
        description: 'Uses a broader image panel at roughly two-thirds width with supporting text alongside it.',
      },
      {
        value: 'hybrid',
        label: 'Hybrid editorial split',
        description: 'Places a partial summary beside the image and moves the remaining details underneath.',
      },
      {
        value: 'lab',
        label: 'Prototype lab',
        description: 'Adds more structured signals and a slightly more technical treatment.',
      },
    ],
  },
  {
    id: 'interactiveLegacy',
    category: 'interactive',
    label: 'Legacy archive layout',
    description: 'Changes how the older game projects are presented below the featured project.',
    options: [
      {
        value: 'grid',
        label: 'Archive grid',
        description: 'Three-up legacy project cards with equal weight.',
      },
      {
        value: 'rail',
        label: 'Archive rail',
        description: 'Wide horizontal project rows for a calmer reading rhythm.',
      },
      {
        value: 'signals',
        label: 'Signal cards',
        description: 'Smaller cards with concise project signals and less summary weight.',
      },
    ],
  },
  {
    id: 'interactiveSurface',
    category: 'interactive',
    label: 'Surface treatment',
    description: 'Changes the visual tone of the featured project and archive surfaces.',
    options: [
      {
        value: 'ambient',
        label: 'Ambient gradients',
        description: 'Keeps the current atmospheric presentation.',
      },
      {
        value: 'framed',
        label: 'Framed UI chrome',
        description: 'Makes the media areas feel more like interface windows or browser frames.',
      },
      {
        value: 'blueprint',
        label: 'Blueprint lines',
        description: 'Leans into grid lines and diagram-like overlays for a more systems-forward tone.',
      },
    ],
  },
  {
    id: 'projectsIntro',
    category: 'projects',
    label: 'Section framing',
    description: 'Changes how the Featured Web Projects intro positions the proof section.',
    options: [
      {
        value: 'direct',
        label: 'Direct portfolio proof',
        description: 'Straightforward framing focused on featured work and breadth.',
      },
      {
        value: 'delivery',
        label: 'Delivery-focused',
        description: 'Emphasizes shipped work, implementation quality, and maintainability.',
      },
      {
        value: 'product',
        label: 'Product-thinking',
        description: 'Frames the section more like application case studies than a gallery.',
      },
      {
        value: 'selective',
        label: 'Selective proof',
        description: 'Makes the section feel more curated and deliberate, with less gallery energy.',
      },
      {
        value: 'casebook',
        label: 'Casebook tone',
        description: 'Leans harder into project reasoning and what each piece demonstrates.',
      },
    ],
  },
  {
    id: 'projectsLayout',
    category: 'projects',
    label: 'Card layout',
    description: 'Controls the section rhythm between one dominant feature, a balanced grid, and a more editorial rail.',
    options: [
      {
        value: 'featured',
        label: 'Featured-first',
        description: 'One dominant leading project followed by supporting cards.',
      },
      {
        value: 'imageLeft1',
        label: 'Image left 1',
        description: 'Keeps the lead project dominant while giving the image a more balanced medium height.',
      },
      {
        value: 'balanced',
        label: 'Balanced grid',
        description: 'Three cards presented with more equal visual weight.',
      },
      {
        value: 'editorial',
        label: 'Editorial rail',
        description: 'A calmer stacked layout with more horizontal reading rhythm.',
      },
      {
        value: 'staggered',
        label: 'Staggered mosaic',
        description: 'Breaks the section into uneven card heights to reduce template-like repetition.',
      },
      {
        value: 'showcase',
        label: 'Showcase split',
        description: 'Pairs a dominant lead card with a tighter vertical support column.',
      },
    ],
  },
  {
    id: 'projectsCard',
    category: 'projects',
    label: 'Card detail mode',
    description: 'Adjusts how much information is visible before the modal opens.',
    options: [
      {
        value: 'detailed',
        label: 'Detailed cards',
        description: 'Shows summary text, tags, and the fuller current card density.',
      },
      {
        value: 'compact',
        label: 'Compact cards',
        description: 'Pulls back visible detail so hierarchy comes more from structure.',
      },
      {
        value: 'outcomes',
        label: 'Outcome-led cards',
        description: 'Highlights what each project proves before the modal carries the rest.',
      },
      {
        value: 'minimal',
        label: 'Minimal cards',
        description: 'Removes most collapsed-card detail so the section breathes more.',
      },
      {
        value: 'signals',
        label: 'Signal cards',
        description: 'Uses small proof signals and context chips instead of fuller summaries.',
      },
    ],
  },
  {
    id: 'projectsSurface',
    category: 'projects',
    label: 'Surface treatment',
    description: 'Changes the visual character of the project media panels and modal preview surface.',
    options: [
      {
        value: 'ambient',
        label: 'Ambient gradients',
        description: 'Keeps the current atmospheric gradient surfaces.',
      },
      {
        value: 'framed',
        label: 'Framed UI chrome',
        description: 'Makes the media areas feel more like interface windows or browser frames.',
      },
      {
        value: 'blueprint',
        label: 'Blueprint lines',
        description: 'Leans into grid lines and diagram-like overlays for a more systems-forward tone.',
      },
    ],
  },
  {
    id: 'dialogLayout',
    category: 'dialogs',
    label: 'Dialog body layout',
    description: 'Keeps media full bleed while changing how the text and supporting details are arranged underneath it.',
    options: [
      {
        value: 'stacked',
        label: 'Stacked narrative',
        description: 'Single-column body layout with the supporting blocks flowing underneath the main copy.',
      },
      {
        value: 'split',
        label: 'Split content',
        description: 'Main copy on the left with secondary details in a supporting right column.',
      },
      {
        value: 'sidebar',
        label: 'Sticky sidebar',
        description: 'A more editorial layout with the supporting block held in a narrower sticky side rail on larger screens.',
      },
    ],
  },
  {
    id: 'dialogSize',
    category: 'dialogs',
    label: 'Dialog size',
    description: 'Changes the overall width and visual scale of the shared project popup.',
    options: [
      {
        value: 'compact',
        label: 'Compact',
        description: 'A narrower dialog for tighter reading and less screen takeover.',
      },
      {
        value: 'standard',
        label: 'Standard',
        description: 'Balanced default size for most project detail states.',
      },
      {
        value: 'expanded',
        label: 'Expanded',
        description: 'A wider case-study presentation with more breathing room for content.',
      },
    ],
  },
];
