import { ArrowUpRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { forwardRef, useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import type { ResolvedContent } from '../../content/resolvedContent';
import ProjectDetailDialog from '../ProjectDetailDialog/ProjectDetailDialog';
import { useVariantPanel } from '../../variants';
import type {
  InteractiveFeaturedVariantId,
  InteractiveLegacyVariantId,
  InteractiveSurfaceVariantId,
} from '../../variants';
import styles from './InteractiveWork.module.scss';

type FeaturedInteractiveProject = ResolvedContent['interactive']['featured'];
type LegacyInteractiveProject = ResolvedContent['interactive']['legacy'][number];

type InteractiveUiCopy = ResolvedContent['interactive']['ui'];
type FeaturedInteractiveCardProps = {
  project: FeaturedInteractiveProject;
  featuredVariant: InteractiveFeaturedVariantId;
  legacyVariant: InteractiveLegacyVariantId;
  surfaceVariant: InteractiveSurfaceVariantId;
} & ComponentPropsWithoutRef<'button'>;

function resolveCardOpenLabel(label?: string) {
  if (!label) {
    return 'Learn more';
  }

  return label.trim().toLowerCase() === 'open project' ? 'Learn more' : label;
}

function InteractiveDialogAside({
  project,
  ui,
}: {
  project: FeaturedInteractiveProject | LegacyInteractiveProject;
  ui: InteractiveUiCopy;
}) {
  const dialogCopy = project.dialog;

  return (
    <div className={styles.dialogAside}>
      <div className={styles.dialogAsideBlock}>
        <p className={styles.dialogAsideLabel}>{ui.projectSignalsLabel}</p>
        <div className={styles.signalRow}>
          {dialogCopy.signals.map((signal: string) => (
            <span key={signal} className={styles.signalChip}>{signal}</span>
          ))}
        </div>
      </div>
      {'videoUrl' in dialogCopy && dialogCopy.videoUrl ? (
        <div className={styles.dialogAsideBlock}>
          <p className={styles.dialogAsideLabel}>{ui.mediaLabel}</p>
          <p className={styles.dialogAsideText}>{ui.embeddedVideoNote}</p>
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
  interactiveUi,
}: {
  game: LegacyInteractiveProject;
  index: number;
  layoutVariant: InteractiveLegacyVariantId;
  surfaceVariant: InteractiveSurfaceVariantId;
  interactiveUi: InteractiveUiCopy;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const cardCopy = game.card;
  const dialogCopy = game.dialog;
 
  return (
    <ProjectDetailDialog
      title={(
        <>
          <span>{game.title}</span>
          <span className={styles.flashWarningTitle}>! flash game - no longer supported by browsers</span>
        </>
      )}
      meta={game.meta}
      imageSrc={game.imageSrc}
      imageAlt={game.imageAlt ?? `${game.title} screenshot`}
      videoUrl={dialogCopy.videoUrl}
      dialogClassName={styles[`dialog-${surfaceVariant}`]}
      mediaClassName={styles[`dialogMedia-${surfaceVariant}`]}
      mainContent={(
        <>
          <p className={styles.dialogBody}>{dialogCopy.summary}</p>
          <p className={styles.dialogDetail}>{dialogCopy.detail}</p>
        </>
      )}
      asideContent={<InteractiveDialogAside project={game} ui={interactiveUi} />}
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
            {dialogCopy.videoUrl && (
              <div className={styles.videoPlayOverlay} aria-hidden="true">
                <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
              </div>
            )}
          </div>
        )}
        <h4>{game.title}</h4>
        <p className={styles.meta}>{game.meta}</p>
        <p>{cardCopy.summary}</p>
        {cardCopy.signals && (
          <div className={styles.signalRow}>
            {cardCopy.signals.map((signal: string) => (
              <span key={signal} className={styles.signalChip}>{signal}</span>
            ))}
          </div>
        )}
        <span className={styles.openLink}>
          {resolveCardOpenLabel(cardCopy.openLabel)} <ArrowUpRight size={14} />
        </span>
      </motion.button>
    </ProjectDetailDialog>
  );
}

const FeaturedInteractiveCard = forwardRef<HTMLButtonElement, FeaturedInteractiveCardProps>(function FeaturedInteractiveCard({
  project,
  featuredVariant,
  legacyVariant,
  surfaceVariant,
  className,
  ...buttonProps
}, ref) {
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

  const cardCopy = project.card;
  const summaryText = cardCopy.summary ?? project.dialog.summary ?? cardCopy.detail;
  const detailText = cardCopy.detail ?? project.dialog.detail;
  const signals = cardCopy.signals ?? project.dialog.signals;

  if (featuredVariant === 'split') {
    return (
      <button
        ref={ref}
        className={clsx(styles.featuredCard, styles.featuredSplit, styles[`surface-${surfaceVariant}`], className)}
        {...buttonProps}
        type="button"
      >
        {project.imageSrc && (
          <div className={styles.featuredMedia}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
            {project.dialog.videoUrl && (
              <div className={styles.videoPlayOverlay} aria-hidden="true">
                <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
              </div>
            )}
          </div>
        )}
        <div className={styles.featuredLead}>
          <span className={styles.inDevelopment}>{cardCopy.statusLabel}</span>
          <h3>{project.title}</h3>
          <p className={styles.meta}>{project.meta}</p>
        </div>
        <div className={styles.featuredBody}>
          {summaryText && <p>{summaryText}</p>}
          {detailText && <p className={styles.featuredDetail}>{detailText}</p>}
          <span className={styles.openLink}>
            {resolveCardOpenLabel(cardCopy.openLabel)} <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    ); 
  }

  if (featuredVariant === 'wide') {
    return (
      <button
        ref={ref}
        className={clsx(styles.featuredCard, styles.featuredWide, styles[`surface-${surfaceVariant}`], className)}
        {...buttonProps}
        type="button"
      >
        {project.imageSrc && (
          <div className={clsx(styles.featuredMedia, styles.featuredMediaWide)}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
            {project.dialog.videoUrl && (
              <div className={styles.videoPlayOverlay} aria-hidden="true">
                <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
              </div>
            )}
          </div>
        )}
        <div className={styles.featuredSide}>
          <span className={styles.inDevelopment}>{cardCopy.statusLabel}</span>
          <h3>{project.title}</h3>
          <p className={styles.meta}>{project.meta}</p>
          {summaryText && <p>{summaryText}</p>}
          {detailText && <p className={styles.featuredDetail}>{detailText}</p>}
          <div className={styles.signalRow}>
            {signals.map((signal: string) => (
              <span key={signal} className={styles.signalChip}>{signal}</span>
            ))}
          </div>
          <span className={styles.openLink}>
            {resolveCardOpenLabel(cardCopy.openLabel)} <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    );
  }

  if (featuredVariant === 'imageLeft1') {
    if (!isDesktop) {
      return (
        <button
          ref={ref}
          className={clsx(
            styles.legacyCard,
            styles[`legacy-${legacyVariant}`],
            styles[`surface-${surfaceVariant}`],
            styles.featuredMobileLegacy,
            className,
          )}
          {...buttonProps}
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
              {project.dialog.videoUrl && (
                <div className={styles.videoPlayOverlay} aria-hidden="true">
                  <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
                </div>
              )}
            </div>
          )}
          <h4>{project.title}</h4>
          <p className={styles.meta}>{project.meta}</p>
          <p>{legacyVariant === 'signals' ? detailText : summaryText}</p>
          {signals && (
            <div className={styles.signalRow}>
              {signals.map((signal: string) => (
                <span key={signal} className={styles.signalChip}>{signal}</span>
              ))}
            </div>
          )}
          <span className={styles.openLink}>
            {resolveCardOpenLabel(cardCopy.openLabel)} <ArrowUpRight size={14} />
          </span>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={clsx(styles.featuredCard, styles.featuredImageLeft1, styles[`surface-${surfaceVariant}`], className)}
        {...buttonProps}
        type="button"
      >
        {project.imageSrc && (
          <div className={clsx(styles.featuredMedia, styles.featuredMediaImageLeft1)}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
            {project.dialog.videoUrl && (
              <div className={styles.videoPlayOverlay} aria-hidden="true">
                <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
              </div>
            )}
          </div>
        )}
        <div className={styles.featuredSide}>
          <span className={styles.inDevelopment}>{cardCopy.statusLabel}</span>
          <h3>{project.title}</h3>
          <p className={styles.meta}>{project.meta}</p>
          {summaryText && <p>{summaryText}</p>}
          {detailText && <p className={styles.featuredDetail}>{detailText}</p>}
          <div className={styles.signalRow}>
            {signals.map((signal: string) => (
              <span key={signal} className={styles.signalChip}>{signal}</span>
            ))}
          </div>
          <span className={styles.openLink}>
            {resolveCardOpenLabel(cardCopy.openLabel)} <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    );
  }

  if (featuredVariant === 'hybrid') {
    return (
      <button
        ref={ref}
        className={clsx(styles.featuredCard, styles.featuredHybrid, styles[`surface-${surfaceVariant}`], className)}
        {...buttonProps}
        type="button"
      >
        {project.imageSrc && (
          <div className={clsx(styles.featuredMedia, styles.featuredMediaHybrid)}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
            {project.dialog.videoUrl && (
              <div className={styles.videoPlayOverlay} aria-hidden="true">
                <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
              </div>
            )}
          </div>
        )}
        <div className={styles.hybridLead}>
          <span className={styles.inDevelopment}>{cardCopy.statusLabel}</span>
          <p className={styles.meta}>{project.meta}</p>
          <h3>{project.title}</h3>
          {summaryText && <p>{summaryText}</p>}
        </div>
        <div className={styles.hybridBottom}>
          {detailText && <p className={styles.featuredDetail}>{detailText}</p>}
          <div className={styles.signalRow}>
            {signals.map((signal: string) => (
              <span key={signal} className={styles.signalChip}>{signal}</span>
            ))}
          </div>
          <span className={styles.openLink}>
            {resolveCardOpenLabel(cardCopy.openLabel)} <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
    );
  }

  if (featuredVariant === 'lab') {
    return (
      <button
        ref={ref}
        className={clsx(styles.featuredCard, styles.featuredLab, styles[`surface-${surfaceVariant}`], className)}
        {...buttonProps}
        type="button"
      >
        {project.imageSrc && (
          <div className={styles.featuredMedia}>
            <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
            {project.dialog.videoUrl && (
              <div className={styles.videoPlayOverlay} aria-hidden="true">
                <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
              </div>
            )}
          </div>
        )}
        <div className={styles.labTopRow}>
          <span className={styles.inDevelopment}>{cardCopy.statusLabel}</span>
          <p className={styles.meta}>{project.meta}</p>
        </div>
        <h3>{project.title}</h3>
        {summaryText && <p>{summaryText}</p>}
        <div className={styles.signalRow}>
          {signals.map((signal: string) => (
            <span key={signal} className={styles.signalChip}>{signal}</span>
          ))}
        </div>
        {detailText && <p className={styles.featuredDetail}>{detailText}</p>}
        <span className={styles.openLink}>
          {resolveCardOpenLabel(cardCopy.openLabel)} <ArrowUpRight size={14} />
        </span>
      </button>
    );
  }

  return (
    <button
      ref={ref}
      className={clsx(styles.featuredCard, styles[`surface-${surfaceVariant}`], className)}
      {...buttonProps}
      type="button"
    >
      {project.imageSrc && (
        <div className={styles.featuredMedia}>
          <img src={project.imageSrc} alt={project.imageAlt ?? `${project.title} screenshot`} className={styles.featuredMediaAsset} loading="lazy" decoding="async" />
          {project.dialog.videoUrl && (
            <div className={styles.videoPlayOverlay} aria-hidden="true">
              <span className={styles.videoPlayBtn}><Play size={20} fill="currentColor" /></span>
            </div>
          )}
        </div>
      )}
      <span className={styles.inDevelopment}>{cardCopy.statusLabel}</span>
      <h3>{project.title}</h3>
      <p className={styles.meta}>{project.meta}</p>
      {summaryText && <p>{summaryText}</p>}
      <span className={styles.openLink}>
        {resolveCardOpenLabel(cardCopy.openLabel)} <ArrowUpRight size={14} />
      </span>
    </button>
  );
});

export default function InteractiveWork() {
  const { ref: glassRef, inView: isGlassActive } = useInView({ threshold: 0.16, rootMargin: '12% 0px -12% 0px' });
  const { variantState, resolvedContent } = useVariantPanel();
  const interactiveContent = resolvedContent.interactive;
  const featuredProject = interactiveContent.featured;

  return (
    <section id={interactiveContent.sectionId} ref={glassRef} className={clsx(styles.section, isGlassActive && styles.glassActive)}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{interactiveContent.eyebrow}</p>
          <h2>{interactiveContent.heading}</h2>
          <p>{interactiveContent.intro}</p>
        </header>

        <ProjectDetailDialog
          title={featuredProject.title}
          meta={featuredProject.meta}
          imageSrc={featuredProject.imageSrc}
          imageAlt={featuredProject.imageAlt ?? `${featuredProject.title} screenshot`}
          videoUrl={featuredProject.dialog.videoUrl}
          dialogClassName={styles[`dialog-${variantState.interactiveSurface}`]}
          mediaClassName={styles[`dialogMedia-${variantState.interactiveSurface}`]}
          mainContent={(
            <>
              {featuredProject.dialog.summary && <p className={styles.dialogBody}>{featuredProject.dialog.summary}</p>}
              <p className={styles.dialogDetail}>{featuredProject.dialog.detail}</p>
            </>
          )}
          asideContent={<InteractiveDialogAside project={featuredProject} ui={interactiveContent.ui} />}
        >
          <FeaturedInteractiveCard
            project={featuredProject}
            featuredVariant={variantState.interactiveFeatured}
            legacyVariant={variantState.interactiveLegacy}
            surfaceVariant={variantState.interactiveSurface}
          />
        </ProjectDetailDialog>

        <div className={styles.legacyIntro}>
          <h3>{interactiveContent.legacyHeading}</h3>
          <p>{interactiveContent.legacyIntro}</p>
        </div>

        <div className={clsx(styles.legacyGrid, styles[`legacyLayout-${variantState.interactiveLegacy}`])}>
          {interactiveContent.legacy.map((game: LegacyInteractiveProject, index: number) => (
            <LegacyCard
              key={game.id}
              game={game}
              index={index}
              layoutVariant={variantState.interactiveLegacy}
              surfaceVariant={variantState.interactiveSurface}
              interactiveUi={interactiveContent.ui}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
