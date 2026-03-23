import siteCopy from './siteCopy';
import type { VariantState } from '../variants/config/types';
import { FOOTER_LINE_VARIANTS } from '../variants/closing/closingContent';
import { FEATURED_VARIANT_OPEN_LABELS } from '../variants/interactive/interactiveContent';
import { PROJECT_CARD_OPEN_LABELS } from '../variants/projects/projectContent';

function resolveHeroActions(variantState: VariantState) {
  const actions = [
    {
      id: 'primary',
      label: siteCopy.hero.actions.primaryLabel,
      href: siteCopy.hero.actions.primaryHref,
    },
    {
      id: 'secondary',
      label: siteCopy.hero.actions.secondaryLabel,
      href: siteCopy.hero.actions.secondaryHref,
    },
  ];

  if (variantState.heroResume === 'hero-link') {
    actions.push({
      id: 'resume',
      label: siteCopy.hero.actions.resumeLabel,
      href: siteCopy.hero.actions.resumeHref,
    });
  }

  return actions;
}

function resolveProjectCard(project: (typeof siteCopy.projects.featured)[number], variantState: VariantState) {
  const showMeta = variantState.projectsCard !== 'minimal';
  const showTags = variantState.projectsCard !== 'compact' && variantState.projectsCard !== 'minimal';

  const summary =
    variantState.projectsCard === 'compact' || variantState.projectsCard === 'minimal'
      ? project.compactSummary
      : variantState.projectsCard === 'outcomes'
        ? project.outcome
        : variantState.projectsCard === 'signals'
          ? project.previewContext
          : project.summary;

  return {
    previewLabel: project.previewLabel,
    previewContext: project.previewContext,
    ...(showMeta ? { meta: project.meta } : {}),
    summary,
    ...(variantState.projectsCard === 'outcomes'
      ? {
          outcomeNote: `${siteCopy.projects.ui.whyItMattersPrefix} ${project.outcome}`,
        }
      : {}),
    ...(variantState.projectsCard === 'signals'
      ? {
          signalChips: [project.previewLabel, siteCopy.projects.ui.proofFocusLabel],
        }
      : {}),
    ...(showTags ? { tech: project.tech } : {}),
    openLabel: PROJECT_CARD_OPEN_LABELS[variantState.projectsCard],
  };
}

function resolveInteractiveFeaturedCard(variantState: VariantState) {
  const project = siteCopy.interactive.featured;
  const isDesktop = typeof window === 'undefined'
    ? true
    : window.matchMedia('(min-width: 1024px)').matches;
  const openLabel = FEATURED_VARIANT_OPEN_LABELS[variantState.interactiveFeatured];
  const baseCard = {
    statusLabel: siteCopy.interactive.ui.inDevelopmentLabel,
    openLabel,
  };

  if (variantState.interactiveFeatured === 'split') {
    return {
      ...baseCard,
      detail: project.detail,
    };
  }

  if (variantState.interactiveFeatured === 'wide') {
    return {
      ...baseCard,
      detail: project.detail,
      signals: project.signals,
    };
  }

  if (variantState.interactiveFeatured === 'imageLeft1') {
    if (!isDesktop) {
      return {
        ...baseCard,
        summary:
          variantState.interactiveLegacy === 'signals'
            ? project.detail
            : project.summary,
        ...(variantState.interactiveLegacy === 'signals'
          ? { signals: project.signals }
          : {}),
      };
    }

    return {
      ...baseCard,
      detail: project.detail,
      signals: project.signals,
    };
  }

  if (variantState.interactiveFeatured === 'hybrid') {
    return {
      ...baseCard,
      detail: project.detail,
      signals: project.signals,
    };
  }

  if (variantState.interactiveFeatured === 'lab') {
    return {
      ...baseCard,
      detail: project.detail,
      signals: project.signals,
    };
  }

  return baseCard;
}

function resolveInteractiveLegacyCard(project: (typeof siteCopy.interactive.legacy)[number], variantState: VariantState) {
  const showSignals = variantState.interactiveLegacy === 'signals';

  return {
    summary: showSignals ? project.detail : project.summary,
    ...(showSignals ? { signals: project.signals } : {}),
    openLabel: siteCopy.interactive.ui.openProjectLabel,
  };
}

export function resolveSiteCopy(variantState: VariantState) {
  const heroCopy = {
    sectionId: 'hero',
    eyebrow: siteCopy.hero.eyebrow,
    headline: siteCopy.hero.headlines[variantState.heroHeadline],
    supportCopy: siteCopy.hero.supportCopy[variantState.heroSupport],
    actions: resolveHeroActions(variantState),
    animation: {
      reactLogoAlt: siteCopy.hero.animation.reactLogoAlt,
    },
  };

  const aboutCopy = siteCopy.about.copyVariants[variantState.aboutCopy];
  const footerLine = FOOTER_LINE_VARIANTS[variantState.contactFooter];
  const contactCopy = siteCopy.closing.contactVariants[variantState.contactIntro];

  return {
    site: {
      meta: siteCopy.site.meta,
      identity: siteCopy.site.identity,
      contactLinks: siteCopy.site.contactLinks,
    },
    navigation: {
      logo: {
        text: siteCopy.site.identity.logoText,
        accent: siteCopy.site.identity.logoAccent,
        href: '#hero',
      },
      links: siteCopy.navigation.links,
      cta: siteCopy.navigation.cta,
      mobileMenu: siteCopy.navigation.mobileMenu,
    },
    hero: heroCopy,
    about: {
      sectionId: 'about',
      eyebrow: siteCopy.about.eyebrow,
      heading: siteCopy.about.heading,
      paragraphs: [aboutCopy.primary, ...(aboutCopy.secondary ? [aboutCopy.secondary] : [])],
      focusAreas: siteCopy.about.focusAreas,
    },
    projects: {
      sectionId: 'featured-work',
      eyebrow: siteCopy.projects.sectionVariants[variantState.projectsIntro].eyebrow,
      heading: siteCopy.projects.sectionVariants[variantState.projectsIntro].heading,
      intro: siteCopy.projects.sectionVariants[variantState.projectsIntro].intro,
      ui: {
        cardOpenLabel: PROJECT_CARD_OPEN_LABELS[variantState.projectsCard],
        contributionsHeading: siteCopy.projects.ui.contributionsHeading,
        ...(variantState.projectsCard === 'outcomes'
          ? { whyItMattersPrefix: siteCopy.projects.ui.whyItMattersPrefix }
          : {}),
        ...(variantState.projectsCard === 'signals'
          ? { proofFocusLabel: siteCopy.projects.ui.proofFocusLabel }
          : {}),
        liveSiteLabel: siteCopy.projects.ui.liveSiteLabel,
      },
      items: siteCopy.projects.featured.map((project) => ({
        id: project.id,
        title: project.title,
        meta: project.meta,
        imageAlt: project.imageAlt,
        card: resolveProjectCard(project, variantState),
        dialog: {
          mediaLabel: project.previewLabel,
          overview: project.overview,
          outcome: project.outcome,
          contributions: project.contributions,
          tech: project.tech,
          ...(project.liveUrl
            ? {
                liveSite: {
                  label: siteCopy.projects.ui.liveSiteLabel,
                  href: project.liveUrl,
                },
              }
            : {}),
        },
      })),
    },
    interactive: {
      sectionId: 'interactive',
      eyebrow: siteCopy.interactive.sectionVariants[variantState.interactiveIntro].eyebrow,
      heading: siteCopy.interactive.sectionVariants[variantState.interactiveIntro].heading,
      intro: siteCopy.interactive.sectionVariants[variantState.interactiveIntro].intro,
      legacyHeading: siteCopy.interactive.sectionVariants[variantState.interactiveIntro].legacyHeading,
      legacyIntro: siteCopy.interactive.sectionVariants[variantState.interactiveIntro].legacyIntro,
      ui: {
        featuredOpenLabel: FEATURED_VARIANT_OPEN_LABELS[variantState.interactiveFeatured],
        legacyOpenLabel: siteCopy.interactive.ui.openProjectLabel,
        projectSignalsLabel: siteCopy.interactive.ui.projectSignalsLabel,
        mediaLabel: siteCopy.interactive.ui.mediaLabel,
        embeddedVideoNote: siteCopy.interactive.ui.embeddedVideoNote,
        inDevelopmentLabel: siteCopy.interactive.ui.inDevelopmentLabel,
      },
      featured: {
        id: siteCopy.interactive.featured.id,
        title: siteCopy.interactive.featured.title,
        meta: siteCopy.interactive.featured.meta,
        imageAlt: siteCopy.interactive.featured.imageAlt,
        card: resolveInteractiveFeaturedCard(variantState),
        dialog: {
          ...(siteCopy.interactive.featured.summary
            ? { summary: siteCopy.interactive.featured.summary }
            : {}),
          detail: siteCopy.interactive.featured.detail,
          signals: siteCopy.interactive.featured.signals,
        },
      },
      legacy: siteCopy.interactive.legacy.map((project) => ({
        id: project.id,
        title: project.title,
        meta: project.meta,
        imageAlt: project.imageAlt,
        card: resolveInteractiveLegacyCard(project, variantState),
        dialog: {
          summary: project.summary,
          detail: project.detail,
          signals: project.signals,
          ...(project.videoUrl ? { videoUrl: project.videoUrl } : {}),
        },
      })),
    },
    skills: {
      sectionId: 'skills',
      eyebrow: siteCopy.skills.sectionVariants[variantState.skillsIntro].eyebrow,
      heading: siteCopy.skills.sectionVariants[variantState.skillsIntro].heading,
      intro: siteCopy.skills.sectionVariants[variantState.skillsIntro].intro,
      groups: siteCopy.skills.groups,
    },
    closing: {
      contact: {
        sectionId: 'contact',
        eyebrow: contactCopy.eyebrow,
        heading: contactCopy.heading,
        body: contactCopy.body,
        availability: contactCopy.availability,
        actions: [
          {
            id: 'primary',
            label: contactCopy.primaryLabel,
            href: siteCopy.site.contactLinks.email.href,
          },
          {
            id: 'secondary',
            label: contactCopy.secondaryLabel,
            href: siteCopy.site.contactLinks.resume.href,
          },
        ],
      },
      footer: {
        name: siteCopy.site.identity.fullName,
        links: [
          siteCopy.site.contactLinks.email,
          siteCopy.site.contactLinks.linkedin,
          siteCopy.site.contactLinks.github,
        ],
        footline: `${footerLine} © ${new Date().getFullYear()}`,
      },
    },
    dialogs: siteCopy.dialogs,
  };
}

export function stringifyResolvedSiteCopy(variantState: VariantState) {
  return JSON.stringify(resolveSiteCopy(variantState), null, 2);
}