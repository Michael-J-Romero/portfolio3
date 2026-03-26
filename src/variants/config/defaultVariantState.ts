import allSettings from '../../content/allSettings';
import type { VariantState } from './types';

const BASE_DEFAULT_VARIANT_STATE: VariantState = {
  heroHeadline: 'current',
  heroLayout: 'balanced-split',
  heroSupport: 'current',
  heroResume: 'hero-link',
  navbarStyle: 'floating',
  aboutCopy: 'full',
  aboutCards: 'grid',
  aboutTone: 'neutral',
  projectsIntro: 'direct',
  projectsLayout: 'featured',
  projectsCard: 'detailed',
  projectsSurface: 'ambient',
  dialogLayout: 'split',
  dialogSize: 'standard',
  interactiveIntro: 'roots',
  interactiveFeatured: 'spotlight',
  interactiveLegacy: 'grid',
  interactiveSurface: 'ambient',
  skillsIntro: 'capabilities',
  skillsLayout: 'grid',
  skillsChip: 'chips',
  contactIntro: 'direct',
  contactLayout: 'centered',
  contactFooter: 'build',
  contactSurface: 'ambient',
  backgroundStyle: 'halo',
  backgroundGrid: 'fine',
  backgroundContrast: 'balanced',
  backgroundParallax: 'none',
  optimizationSurface: 'balanced',
  optimizationAtmosphere: 'full',
  optimizationGlassLevel: 'off',
  optimizationGlassScope: 'visible',
  optimizationGlassBehavior: 'fake',
  optimizationGlassTransition: 'slow',
  optimizationGlassPause: 'long',
};

function extractKnownVariantDefaults(rawState: unknown): Partial<VariantState> {
  if (!rawState || typeof rawState !== 'object') {
    return {};
  }

  const source = rawState as Record<string, unknown>;
  const knownDefaults: Partial<VariantState> = {};
  const mutableDefaults = knownDefaults as Record<keyof VariantState, VariantState[keyof VariantState]>;

  (Object.keys(BASE_DEFAULT_VARIANT_STATE) as Array<keyof VariantState>).forEach((key) => {
    const value = source[key as string];
    if (typeof value === 'string') {
      mutableDefaults[key] = value as VariantState[keyof VariantState];
    }
  });

  return knownDefaults;
}

const settingsDefaultVariantState = extractKnownVariantDefaults(
  (allSettings as { activeVariantState?: unknown }).activeVariantState,
);

export const DEFAULT_VARIANT_STATE: VariantState = {
  ...BASE_DEFAULT_VARIANT_STATE,
  ...settingsDefaultVariantState,
};

export const VARIANT_STORAGE_KEY = 'portfolio3.variant-state';
export const DEV_PANEL_SHORTCUT_LABEL = 'Shift + D';
