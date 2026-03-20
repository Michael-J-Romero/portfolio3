export type HeroHeadlineVariantId = 'current' | 'concise' | 'systems' | 'direct' | 'editorial' | 'compact' | 'minimal' | 'brief';
export type HeroLayoutVariantId = 'balanced-split' | 'balanced-overlap' | 'balanced-overlap-strong' | 'balanced-sticky-parallax' | 'extreme-parallax' | 'extreme-parallax-fade' | 'extreme-parallax-fade2' | 'animation-large' | 'stacked-priority' | 'animation-dominant' | 'centered-showcase' | 'header-split-actions' | 'title-priority-split' | 'unified-top-columns';
export type HeroSupportVariantId = 'current' | 'trimmed' | 'minimal';
export type HeroResumeMode = 'hero-link' | 'nav-only';
export type NavbarStyleVariantId = 'floating' | 'fixed-top' | 'minimal' | 'compact' | 'bold';
export type AboutCopyVariantId = 'full' | 'balanced' | 'reduced';
export type AboutCardsVariantId = 'grid' | 'featured' | 'editorial' | 'split' | 'rail' | 'panel' | 'beacon';
export type AboutToneVariantId = 'neutral' | 'elevated' | 'chapter' | 'solid-cover';
export type ProjectsIntroVariantId = 'direct' | 'delivery' | 'product' | 'selective' | 'casebook';
export type ProjectsLayoutVariantId = 'featured' | 'imageLeft1' | 'balanced' | 'editorial' | 'staggered' | 'showcase';
export type ProjectsCardVariantId = 'detailed' | 'compact' | 'outcomes' | 'minimal' | 'signals';
export type ProjectsSurfaceVariantId = 'ambient' | 'framed' | 'blueprint';
export type DialogLayoutVariantId = 'stacked' | 'split' | 'sidebar';
export type DialogSizeVariantId = 'compact' | 'standard' | 'expanded';
export type InteractiveIntroVariantId = 'roots' | 'current' | 'systems' | 'play';
export type InteractiveFeaturedVariantId = 'spotlight' | 'split' | 'imageLeft1' | 'wide' | 'hybrid' | 'lab';
export type InteractiveLegacyVariantId = 'grid' | 'rail' | 'signals';
export type InteractiveSurfaceVariantId = 'ambient' | 'framed' | 'blueprint';
export type SkillsIntroVariantId = 'capabilities' | 'strengths' | 'toolkit' | 'proof';
export type SkillsLayoutVariantId = 'grid' | 'featured' | 'bands' | 'editorial';
export type SkillsChipVariantId = 'chips' | 'minimal' | 'grouped';
export type ContactIntroVariantId = 'direct' | 'conversational' | 'opportunities' | 'editorial';
export type ContactLayoutVariantId = 'centered' | 'split' | 'stacked';
export type ContactFooterVariantId = 'simple' | 'network' | 'build';
export type ContactSurfaceVariantId = 'ambient' | 'glow' | 'quiet';
export type BackgroundStyleVariantId = 'minimal' | 'halo' | 'mesh' | 'aurora' | 'contrast' | 'ink';
export type BackgroundGridVariantId = 'none' | 'fine' | 'wide' | 'blueprint';
export type BackgroundContrastVariantId = 'soft' | 'balanced' | 'high';
export type BackgroundParallaxVariantId = 'none' | 'soft' | 'depth';
export type OptimizationSurfaceVariantId = 'airy' | 'balanced' | 'solid';
export type OptimizationAtmosphereVariantId = 'full' | 'reduced' | 'off';
export type OptimizationGlassLevelVariantId = 'off' | 'subtle' | 'medium' | 'strong';
export type OptimizationGlassScopeVariantId = 'chrome' | 'visible' | 'full';
export type OptimizationGlassBehaviorVariantId = 'fake' | 'idle-snapshot' | 'idle-fade' | 'always-real';
export type OptimizationGlassTransitionVariantId = 'quick' | 'balanced' | 'slow' | 'cinematic';
export type OptimizationGlassPauseVariantId = 'short' | 'balanced' | 'long' | 'linger';
export type DeveloperPanelTabId = 'background' | 'optimization' | 'hero' | 'about' | 'projects' | 'dialogs' | 'interactive' | 'skills' | 'closing';

export interface VariantState {
  backgroundStyle: BackgroundStyleVariantId;
  backgroundGrid: BackgroundGridVariantId;
  backgroundContrast: BackgroundContrastVariantId;
  backgroundParallax: BackgroundParallaxVariantId;
  optimizationSurface: OptimizationSurfaceVariantId;
  optimizationAtmosphere: OptimizationAtmosphereVariantId;
  optimizationGlassLevel: OptimizationGlassLevelVariantId;
  optimizationGlassScope: OptimizationGlassScopeVariantId;
  optimizationGlassBehavior: OptimizationGlassBehaviorVariantId;
  optimizationGlassTransition: OptimizationGlassTransitionVariantId;
  optimizationGlassPause: OptimizationGlassPauseVariantId;
  heroHeadline: HeroHeadlineVariantId;
  heroLayout: HeroLayoutVariantId;
  heroSupport: HeroSupportVariantId;
  heroResume: HeroResumeMode;
  navbarStyle: NavbarStyleVariantId;
  aboutCopy: AboutCopyVariantId;
  aboutCards: AboutCardsVariantId;
  aboutTone: AboutToneVariantId;
  projectsIntro: ProjectsIntroVariantId;
  projectsLayout: ProjectsLayoutVariantId;
  projectsCard: ProjectsCardVariantId;
  projectsSurface: ProjectsSurfaceVariantId;
  dialogLayout: DialogLayoutVariantId;
  dialogSize: DialogSizeVariantId;
  interactiveIntro: InteractiveIntroVariantId;
  interactiveFeatured: InteractiveFeaturedVariantId;
  interactiveLegacy: InteractiveLegacyVariantId;
  interactiveSurface: InteractiveSurfaceVariantId;
  skillsIntro: SkillsIntroVariantId;
  skillsLayout: SkillsLayoutVariantId;
  skillsChip: SkillsChipVariantId;
  contactIntro: ContactIntroVariantId;
  contactLayout: ContactLayoutVariantId;
  contactFooter: ContactFooterVariantId;
  contactSurface: ContactSurfaceVariantId;
}

export interface VariantOption<T extends string> {
  value: T;
  label: string;
  description: string;
}

export interface VariantControlDefinition<T extends string> {
  id: keyof VariantState;
  category: DeveloperPanelTabId;
  label: string;
  description: string;
  options: Array<VariantOption<T>>;
}
