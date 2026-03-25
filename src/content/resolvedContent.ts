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

  const resumeAction = {
    id: 'resume',
    label:
      allSettings.hero?.actions?.resumeLabel
      ?? allContent.site?.contactLinks?.resume?.label
      ?? 'Resume',
    href:
      allContent.site?.contactLinks?.resume?.href
      ?? allContent.closing?.contact?.actions?.[1]?.href
      ?? '#',
  };

  return [...actionsWithoutResume, resumeAction];
}

function resolveProjectCard(project: any, settingsProject: any, variantState: VariantState) {
  const showMeta = variantState.projectsCard !== 'minimal';
  const showTags = variantState.projectsCard !== 'compact' && variantState.projectsCard !== 'minimal';

  const summary =
    variantState.projectsCard === 'compact' || variantState.projectsCard === 'minimal'
      ? settingsProject?.compactSummary ?? project.card?.summary
      : variantState.projectsCard === 'outcomes'
        ? project.dialog?.outcome ?? settingsProject?.outcome ?? project.card?.summary
        : variantState.projectsCard === 'signals'
          ? project.card?.previewContext ?? settingsProject?.previewContext ?? project.card?.summary
          : project.card?.summary;

  const openLabel =
    allSettings.projects?.openLabels?.[variantState.projectsCard]
    ?? project.card?.openLabel
    ?? allContent.projects?.ui?.cardOpenLabel
    ?? 'Open Project';

  return {
    previewLabel: project.card?.previewLabel,
    previewContext: project.card?.previewContext,
    ...(showMeta ? { meta: project.card?.meta } : {}),
    ...(summary ? { summary } : {}),
    ...(variantState.projectsCard === 'outcomes' && project.dialog?.outcome
      ? {
          outcomeNote: `${allSettings.projects?.ui?.whyItMattersPrefix ?? 'Why it matters:'} ${project.dialog.outcome}`,
        }
      : {}),
    ...(variantState.projectsCard === 'signals'
      ? {
          signalChips: [
            project.card?.previewLabel,
            allSettings.projects?.ui?.proofFocusLabel ?? 'Proof focus',
          ].filter(Boolean),
        }
      : {}),
    ...(showTags ? { tech: project.card?.tech ?? project.dialog?.tech } : {}),
    openLabel,
  };
}

function resolveInteractiveFeaturedCard(variantState: VariantState) {
  const project = allContent.interactive?.featured;
  const openLabel =
    allSettings.interactive?.featuredOpenLabels?.[variantState.interactiveFeatured]
    ?? project?.card?.openLabel
    ?? allContent.interactive?.ui?.featuredOpenLabel
    ?? 'Open Project';

  const baseCard = {
    statusLabel: project?.card?.statusLabel ?? allContent.interactive?.ui?.inDevelopmentLabel,
    openLabel,
  };

  if (variantState.interactiveFeatured === 'split') {
    return {
      ...baseCard,
      detail: project?.card?.detail,
    };
  }

  if (variantState.interactiveFeatured === 'wide') {
    return {
      ...baseCard,
      detail: project?.card?.detail,
      signals: project?.card?.signals,
    };
  }

  if (variantState.interactiveFeatured === 'imageLeft1') {
    const isDesktop =
      typeof window === 'undefined'
        ? true
        : window.matchMedia('(min-width: 1024px)').matches;

    if (!isDesktop) {
      return {
        ...baseCard,
        summary:
          variantState.interactiveLegacy === 'signals'
            ? project?.card?.detail
            : project?.card?.summary,
        ...(variantState.interactiveLegacy === 'signals'
          ? { signals: project?.card?.signals }
          : {}),
      };
    }

    return {
      ...baseCard,
      detail: project?.card?.detail,
      signals: project?.card?.signals,
    };
  }

  if (variantState.interactiveFeatured === 'hybrid' || variantState.interactiveFeatured === 'lab') {
    return {
      ...baseCard,
      detail: project?.card?.detail,
      signals: project?.card?.signals,
    };
  }

  return {
    ...baseCard,
    ...(project?.card?.summary ? { summary: project.card.summary } : {}),
  };
}

function resolveInteractiveLegacyCard(project: any, variantState: VariantState) {
  const showSignals = variantState.interactiveLegacy === 'signals';

  return {
    summary: showSignals ? project.dialog?.detail : project.card?.summary,
    ...(showSignals ? { signals: project.dialog?.signals ?? project.card?.signals } : {}),
    openLabel:
      allSettings.interactive?.ui?.openProjectLabel
      ?? allContent.interactive?.ui?.legacyOpenLabel
      ?? project.card?.openLabel,
  };
}

export function resolveAllContent(variantState: VariantState): ResolvedContent {
  const aboutCopy = allSettings.about?.copyVariants?.[variantState.aboutCopy];
  const projectSectionVariant = allSettings.projects?.sectionVariants?.[variantState.projectsIntro];
  const interactiveSectionVariant = allSettings.interactive?.sectionVariants?.[variantState.interactiveIntro];
  const skillsSectionVariant = allSettings.skills?.sectionVariants?.[variantState.skillsIntro];
  const contactVariant = allSettings.closing?.contactVariants?.[variantState.contactIntro];
  const footerLine = allSettings.closing?.footerLineVariants?.[variantState.contactFooter];

  return {
    ...allContent,
    hero: {
      ...allContent.hero,
      headline: allSettings.hero?.headlines?.[variantState.heroHeadline] ?? allContent.hero.headline,
      supportCopy: allSettings.hero?.supportCopy?.[variantState.heroSupport] ?? allContent.hero.supportCopy,
      actions: resolveHeroActions(variantState),
    },
    about: {
      ...allContent.about,
      paragraphs: aboutCopy
        ? [aboutCopy.primary, ...(aboutCopy.secondary ? [aboutCopy.secondary] : [])]
        : allContent.about.paragraphs,
    },
    projects: {
      ...allContent.projects,
      eyebrow: projectSectionVariant?.eyebrow ?? allContent.projects.eyebrow,
      heading: projectSectionVariant?.heading ?? allContent.projects.heading,
      intro: projectSectionVariant?.intro ?? allContent.projects.intro,
      ui: {
        ...allContent.projects.ui,
        cardOpenLabel:
          allSettings.projects?.openLabels?.[variantState.projectsCard]
          ?? allContent.projects.ui.cardOpenLabel,
        ...(variantState.projectsCard === 'outcomes'
          ? {
              whyItMattersPrefix:
                allSettings.projects?.ui?.whyItMattersPrefix
                ?? allContent.projects.ui?.whyItMattersPrefix,
            }
          : {}),
        ...(variantState.projectsCard === 'signals'
          ? {
              proofFocusLabel:
                allSettings.projects?.ui?.proofFocusLabel
                ?? allContent.projects.ui?.proofFocusLabel,
            }
          : {}),
        liveSiteLabel:
          allSettings.projects?.ui?.liveSiteLabel
          ?? allContent.projects.ui.liveSiteLabel,
      },
      items: allContent.projects.items.map((project: any, index: number) => {
        const settingsProject = allSettings.projects?.featured?.[index];

        return {
          ...project,
          card: resolveProjectCard(project, settingsProject, variantState),
          dialog: {
            ...project.dialog,
            ...(project.dialog?.liveSite
              ? {
                  liveSite: {
                    ...project.dialog.liveSite,
                    label:
                      allSettings.projects?.ui?.liveSiteLabel
                      ?? project.dialog.liveSite.label,
                  },
                }
              : {}),
          },
        };
      }),
    },
    interactive: {
      ...allContent.interactive,
      eyebrow: interactiveSectionVariant?.eyebrow ?? allContent.interactive.eyebrow,
      heading: interactiveSectionVariant?.heading ?? allContent.interactive.heading,
      intro: interactiveSectionVariant?.intro ?? allContent.interactive.intro,
      legacyHeading: interactiveSectionVariant?.legacyHeading ?? allContent.interactive.legacyHeading,
      legacyIntro: interactiveSectionVariant?.legacyIntro ?? allContent.interactive.legacyIntro,
      ui: {
        ...allContent.interactive.ui,
        featuredOpenLabel:
          allSettings.interactive?.featuredOpenLabels?.[variantState.interactiveFeatured]
          ?? allContent.interactive.ui.featuredOpenLabel,
        legacyOpenLabel:
          allSettings.interactive?.ui?.openProjectLabel
          ?? allContent.interactive.ui.legacyOpenLabel,
      },
      featured: {
        ...allContent.interactive.featured,
        card: resolveInteractiveFeaturedCard(variantState),
      },
      legacy: allContent.interactive.legacy.map((project: any) => ({
        ...project,
        card: resolveInteractiveLegacyCard(project, variantState),
      })),
    },
    skills: {
      ...allContent.skills,
      eyebrow: skillsSectionVariant?.eyebrow ?? allContent.skills.eyebrow,
      heading: skillsSectionVariant?.heading ?? allContent.skills.heading,
      intro: skillsSectionVariant?.intro ?? allContent.skills.intro,
    },
    closing: {
      ...allContent.closing,
      contact: {
        ...allContent.closing.contact,
        eyebrow: contactVariant?.eyebrow ?? allContent.closing.contact.eyebrow,
        heading: contactVariant?.heading ?? allContent.closing.contact.heading,
        body: contactVariant?.body ?? allContent.closing.contact.body,
        availability: contactVariant?.availability ?? allContent.closing.contact.availability,
        actions: [
          {
            ...(allContent.closing.contact.actions?.[0] ?? { id: 'primary', href: '#' }),
            label:
              contactVariant?.primaryLabel
              ?? allContent.closing.contact.actions?.[0]?.label,
          },
          {
            ...(allContent.closing.contact.actions?.[1] ?? { id: 'secondary', href: '#' }),
            label:
              contactVariant?.secondaryLabel
              ?? allContent.closing.contact.actions?.[1]?.label,
          },
        ],
      },
      footer: {
        ...allContent.closing.footer,
        footline: footerLine
          ? `${footerLine} © ${new Date().getFullYear()}`
          : allContent.closing.footer.footline,
      },
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
