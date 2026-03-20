import { ArrowUpRight, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
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
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={clsx(styles.dialog, styles[`dialog-${surfaceVariant}`])}>
          <div className={styles.dialogHeader}>
            <Dialog.Title>{game.title}</Dialog.Title>
            <Dialog.Close className={styles.closeBtn} aria-label="Close">
              <X size={18} />
            </Dialog.Close>
          </div>
          <Dialog.Description className={styles.dialogMeta}>{game.meta}</Dialog.Description>
          {game.imageSrc && (
            <div className={styles.dialogMedia}>
              <img src={game.imageSrc} alt={game.imageAlt ?? `${game.title} screenshot`} className={styles.dialogMediaAsset} decoding="async" />
            </div>
          )}
          <p className={styles.dialogBody}>{game.summary}</p>
          <p className={styles.dialogDetail}>{game.detail}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function FeaturedInteractiveCard({
  project,
  featuredVariant,
  surfaceVariant,
}: {
  project: InteractiveProject;
  featuredVariant: InteractiveFeaturedVariantId;
  surfaceVariant: InteractiveSurfaceVariantId;
}) {
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

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <FeaturedInteractiveCard
              project={FEATURED_INTERACTIVE_PROJECT}
              featuredVariant={variantState.interactiveFeatured}
              surfaceVariant={variantState.interactiveSurface}
            />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={clsx(styles.dialog, styles[`dialog-${variantState.interactiveSurface}`])}>
              <div className={styles.dialogHeader}>
                <Dialog.Title>{FEATURED_INTERACTIVE_PROJECT.title}</Dialog.Title>
                <Dialog.Close className={styles.closeBtn} aria-label="Close">
                  <X size={18} />
                </Dialog.Close>
              </div>
              <Dialog.Description className={styles.dialogMeta}>
                {FEATURED_INTERACTIVE_PROJECT.meta}
              </Dialog.Description>
              {FEATURED_INTERACTIVE_PROJECT.imageSrc && (
                <div className={styles.dialogMedia}>
                  <img
                    src={FEATURED_INTERACTIVE_PROJECT.imageSrc}
                    alt={FEATURED_INTERACTIVE_PROJECT.imageAlt ?? `${FEATURED_INTERACTIVE_PROJECT.title} screenshot`}
                    className={styles.dialogMediaAsset}
                    decoding="async"
                  />
                </div>
              )}
              <p className={styles.dialogBody}>
                {FEATURED_INTERACTIVE_PROJECT.summary}
              </p>
              <p className={styles.dialogDetail}>{FEATURED_INTERACTIVE_PROJECT.detail}</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

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
