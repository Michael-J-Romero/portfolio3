import { ArrowUpRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import ProjectDetailDialog from '../ProjectDetailDialog/ProjectDetailDialog';
import { useVariantPanel } from '../../variants';
import {
  FEATURED_INTERACTIVE_PROJECT,
  FEATURED_VARIANT_OPEN_LABELS,
  INTERACTIVE_SECTION_COPY,
  LEGACY_GAMES,
  type InteractiveProject,
} from '../../variants/interactive/interactiveContent';
import type {
  InteractiveFeaturedVariantId,
  InteractiveLegacyVariantId,
  InteractiveSurfaceVariantId,
} from '../../variants';
import styles from './InteractiveWork.module.scss';

function InteractiveDialogAside({
  project,
}: {
  project: InteractiveProject;
}) {
  return (
    <div className={styles.dialogAside}>
      <div className={styles.dialogAsideBlock}>
        <p className={styles.dialogAsideLabel}>Project signals</p>
        <div className={styles.signalRow}>
          {project.signals.map((signal) => (
            <span key={signal} className={styles.signalChip}>{signal}</span>
          ))}
        </div>
      </div>
      {project.videoUrl ? (
        <div className={styles.dialogAsideBlock}>
          <p className={styles.dialogAsideLabel}>Media</p>
          <p className={styles.dialogAsideText}>Embedded walkthrough video with instant stop on close.</p>
        </div>
      ) : null}
    </div>
  );
}

function LegacyCard({
  game,
  index,
  layoutVariant,
  surfaceVariant,
}: {
  game: InteractiveProject;
  index: number;
  layoutVariant: InteractiveLegacyVariantId;
  surfaceVariant: InteractiveSurfaceVariantId;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const showSignals = layoutVariant === 'signals';

  return (
    <ProjectDetailDialog
      title={game.title}
      meta={game.meta}
      imageSrc={game.imageSrc}
      imageAlt={game.imageAlt ?? `${game.title} screenshot`}
      videoUrl={game.videoUrl}
      dialogClassName={styles[`dialog-${surfaceVariant}`]}
      mediaClassName={styles[`dialogMedia-${surfaceVariant}`]}
      closeClassName={styles.closeBtn}
      mainContent={(
        <>
          <p className={styles.dialogBody}>{game.summary}</p>
          <p className={styles.dialogDetail}>{game.detail}</p>
        </>
      )}
      asideContent={<InteractiveDialogAside project={game} />}
    >
      <motion.button
        ref={ref}
        className={clsx(
          styles.legacyCard,
          styles[`legacy-${layoutVariant}`],
          styles[`surface-${surfaceVariant}`],
        )}
        type="button"
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
      >
        {game.imageSrc && (
          <div className={styles.legacyMedia}>
            <img src={game.imageSrc} alt={game.imageAlt ?? `${game.title} screenshot`} className={styles.legacyMediaAsset} loading="lazy" decoding="async" />
            {game.videoUrl && (
              <div className={styles.videoPlayOverlay} aria-hidden="true">
                <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
              </div>
            )}
          </div>
        )}
        <h4>{game.title}</h4>
        <p className={styles.meta}>{game.meta}</p>
        <p>{showSignals ? game.detail : game.summary}</p>
        {showSignals && (
          <div className={styles.signalRow}>
            {game.signals.map((signal) => (
              <span key={signal} className={styles.signalChip}>{signal}</span>
            ))}
          </div>
        )}
        <span className={styles.openLink}>
          Open Project <ArrowUpRight size={14} />
        </span>
      </motion.button>
    </ProjectDetailDialog>
  );
}

function FeaturedInteractiveCard({
  project,
  featuredVariant,
  legacyVariant,
  surfaceVariant,
}: {
  project: InteractiveProject;
  featuredVariant: InteractiveFeaturedVariantId;
  legacyVariant: InteractiveLegacyVariantId;
  surfaceVariant: InteractiveSurfaceVariantId;
}) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(min-width: 1024px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (featuredVariant === 'split') {
    return (
      <button className={clsx(styles.featuredCard, styles.featuredSplit, styles[`surface-${surfaceVariant}`])} type="button">
        {project.imageSrc && (
          <div className={styles.featuredMedia}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
          </div>
        )}
        <div className={styles.featuredLead}>
          <span className={styles.inDevelopment}>In Development</span>
          <h3>{project.title}</h3>
          <p className={styles.meta}>{project.meta}</p>
        </div>
        <div className={styles.featuredBody}>
          <p>{project.summary}</p>
          <p className={styles.featuredDetail}>{project.detail}</p>
          <span className={styles.openLink}>
            {FEATURED_VARIANT_OPEN_LABELS[featuredVariant]} <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    ); 
  }

  if (featuredVariant === 'wide') {
    return (
      <button className={clsx(styles.featuredCard, styles.featuredWide, styles[`surface-${surfaceVariant}`])} type="button">
        {project.imageSrc && (
          <div className={clsx(styles.featuredMedia, styles.featuredMediaWide)}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
          </div>
        )}
        <div className={styles.featuredSide}>
          <span className={styles.inDevelopment}>In Development</span>
          <h3>{project.title}</h3>
          <p className={styles.meta}>{project.meta}</p>
          <p>{project.summary}</p>
          <p className={styles.featuredDetail}>{project.detail}</p>
          <div className={styles.signalRow}>
            {project.signals.map((signal) => (
              <span key={signal} className={styles.signalChip}>{signal}</span>
            ))}
          </div>
          <span className={styles.openLink}>
            {FEATURED_VARIANT_OPEN_LABELS[featuredVariant]} <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    );
  }

  if (featuredVariant === 'imageLeft1') {
    if (!isDesktop) {
      return (
        <button
          className={clsx(
            styles.legacyCard,
            styles[`legacy-${legacyVariant}`],
            styles[`surface-${surfaceVariant}`],
            styles.featuredMobileLegacy,
          )}
          type="button"
        >
          {project.imageSrc && (
            <div className={styles.legacyMedia}>
              <img
                src={project.imageSrc}
                alt={project.imageAlt ?? `${project.title} screenshot`}
                className={styles.legacyMediaAsset}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <h4>{project.title}</h4>
          <p className={styles.meta}>{project.meta}</p>
          <p>{legacyVariant === 'signals' ? project.detail : project.summary}</p>
          {legacyVariant === 'signals' && (
            <div className={styles.signalRow}>
              {project.signals.map((signal) => (
                <span key={signal} className={styles.signalChip}>{signal}</span>
              ))}
            </div>
          )}
          <span className={styles.openLink}>
            {FEATURED_VARIANT_OPEN_LABELS[featuredVariant]} <ArrowUpRight size={14} />
          </span>
        </button>
      );
    }

    return (
      <button className={clsx(styles.featuredCard, styles.featuredImageLeft1, styles[`surface-${surfaceVariant}`])} type="button">
        {project.imageSrc && (
          <div className={clsx(styles.featuredMedia, styles.featuredMediaImageLeft1)}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
          </div>
        )}
        <div className={styles.featuredSide}>
          <span className={styles.inDevelopment}>In Development</span>
          <h3>{project.title}</h3>
          <p className={styles.meta}>{project.meta}</p>
          <p>{project.summary}</p>
          <p className={styles.featuredDetail}>{project.detail}</p>
          <div className={styles.signalRow}>
            {project.signals.map((signal) => (
              <span key={signal} className={styles.signalChip}>{signal}</span>
            ))}
          </div>
          <span className={styles.openLink}>
            {FEATURED_VARIANT_OPEN_LABELS[featuredVariant]} <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    );
  }

  if (featuredVariant === 'hybrid') {
    return (
      <button className={clsx(styles.featuredCard, styles.featuredHybrid, styles[`surface-${surfaceVariant}`])} type="button">
        {project.imageSrc && (
          <div className={clsx(styles.featuredMedia, styles.featuredMediaHybrid)}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
          </div>
        )}
        <div className={styles.hybridLead}>
          <span className={styles.inDevelopment}>In Development</span>
          <p className={styles.meta}>{project.meta}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <div className={styles.hybridBottom}>
          <p className={styles.featuredDetail}>{project.detail}</p>
          <div className={styles.signalRow}>
            {project.signals.map((signal) => (
              <span key={signal} className={styles.signalChip}>{signal}</span>
            ))}
          </div>
          <span className={styles.openLink}>
            {FEATURED_VARIANT_OPEN_LABELS[featuredVariant]} <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    );
  }

  if (featuredVariant === 'lab') {
    return (
      <button className={clsx(styles.featuredCard, styles.featuredLab, styles[`surface-${surfaceVariant}`])} type="button">
        {project.imageSrc && (
          <div className={styles.featuredMedia}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
          </div>
        )}
        <div className={styles.labTopRow}>
          <span className={styles.inDevelopment}>In Development</span>
          <p className={styles.meta}>{project.meta}</p>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className={styles.signalRow}>
          {project.signals.map((signal) => (
            <span key={signal} className={styles.signalChip}>{signal}</span>
          ))}
        </div>
        <p className={styles.featuredDetail}>{project.detail}</p>
        <span className={styles.openLink}>
          {FEATURED_VARIANT_OPEN_LABELS[featuredVariant]} <ArrowUpRight size={14} />
        </span>
      </button>
    );
  }

  return (
    <button className={clsx(styles.featuredCard, styles[`surface-${surfaceVariant}`])} type="button">
      {project.imageSrc && (
        <div className={styles.featuredMedia}>
          <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
        </div>
      )}
      <span className={styles.inDevelopment}>In Development</span>
      <h3>{project.title}</h3>
      <p className={styles.meta}>{project.meta}</p>
      <p>{project.summary}</p>
      <span className={styles.openLink}>
        {FEATURED_VARIANT_OPEN_LABELS[featuredVariant]} <ArrowUpRight size={14} />
      </span>
    </button>
  );
}

export default function InteractiveWork() {
  const { ref: glassRef, inView: isGlassActive } = useInView({ threshold: 0.16, rootMargin: '12% 0px -12% 0px' });
  const { variantState } = useVariantPanel();
  const sectionCopy = INTERACTIVE_SECTION_COPY[variantState.interactiveIntro];

  return (
    <section id="interactive" ref={glassRef} className={clsx(styles.section, isGlassActive && styles.glassActive)}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{sectionCopy.eyebrow}</p>
          <h2>{sectionCopy.heading}</h2>
          <p>{sectionCopy.intro}</p>
        </header>

        <ProjectDetailDialog
          title={FEATURED_INTERACTIVE_PROJECT.title}
          meta={FEATURED_INTERACTIVE_PROJECT.meta}
          imageSrc={FEATURED_INTERACTIVE_PROJECT.imageSrc}
          imageAlt={FEATURED_INTERACTIVE_PROJECT.imageAlt ?? `${FEATURED_INTERACTIVE_PROJECT.title} screenshot`}
          videoUrl={FEATURED_INTERACTIVE_PROJECT.videoUrl}
          dialogClassName={styles[`dialog-${variantState.interactiveSurface}`]}
          mediaClassName={styles[`dialogMedia-${variantState.interactiveSurface}`]}
          closeClassName={styles.closeBtn}
          mainContent={(
            <>
              <p className={styles.dialogBody}>{FEATURED_INTERACTIVE_PROJECT.summary}</p>
              <p className={styles.dialogDetail}>{FEATURED_INTERACTIVE_PROJECT.detail}</p>
            </>
          )}
          asideContent={<InteractiveDialogAside project={FEATURED_INTERACTIVE_PROJECT} />}
        >
          <FeaturedInteractiveCard
            project={FEATURED_INTERACTIVE_PROJECT}
            featuredVariant={variantState.interactiveFeatured}
            legacyVariant={variantState.interactiveLegacy}
            surfaceVariant={variantState.interactiveSurface}
          />
        </ProjectDetailDialog>

        <div className={styles.legacyIntro}>
          <h3>{sectionCopy.legacyHeading}</h3>
          <p>{sectionCopy.legacyIntro}</p>
        </div>

        <div className={clsx(styles.legacyGrid, styles[`legacyLayout-${variantState.interactiveLegacy}`])}>
          {LEGACY_GAMES.map((game, index) => (
            <LegacyCard
              key={game.id}
              game={game}
              index={index}
              layoutVariant={variantState.interactiveLegacy}
              surfaceVariant={variantState.interactiveSurface}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
