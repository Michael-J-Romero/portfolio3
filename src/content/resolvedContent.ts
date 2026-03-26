import allContent, { type AllContent } from './allContent';
import allSettings from './allSettings';
import type { VariantState } from '../variants/config/types';

export type ResolvedContent = AllContent;

function resolveHeroActions(variantState: VariantState) {
  const baseActions = Array.isArray(allContent.hero?.actions) ? allContent.hero.actions : [];
  const actionsWithoutResume = baseActions.filter((action: { id?: string }) => action.id !== 'resume');

  if (variantState.heroResume !== 'hero-link') {
    return actionsWithoutResume;
  }

  if (baseActions.some((action: { id?: string }) => action.id === 'resume')) {
    return baseActions;
  }

  const resumeAction = {
    id: 'resume',
    label: allContent.site?.contactLinks?.resume?.label ?? 'Resume',
    href:
      allContent.site?.contactLinks?.resume?.href
      ?? allContent.closing?.contact?.actions?.[1]?.href
      ?? '#',
  };

  return [...actionsWithoutResume, resumeAction];
}

export function resolveAllContent(variantState: VariantState): ResolvedContent {
  return {
    ...allContent,
    hero: {
      ...allContent.hero,
      actions: resolveHeroActions(variantState),
    },
  };
}

export function stringifyResolvedAllContent(variantState: VariantState) {
  return JSON.stringify(resolveAllContent(variantState), null, 2);
}

export function stringifyAllSettings(variantState: VariantState) {
  return JSON.stringify(
    {
      ...allSettings,
      activeVariantState: variantState,
    },
    null,
    2,
  );
}
