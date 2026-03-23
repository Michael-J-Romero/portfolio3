import { Gamepad2, GraduationCap, Monitor } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import clsx from 'clsx';
import allContent from '../../content/allContent';
import { useVariantPanel } from '../../variants';
import type { AboutCardsVariantId } from '../../variants';
import styles from './About.module.scss';

const ABOUT_BEACON_ICONS = {
  'web-applications': Monitor,
  'game-development': Gamepad2,
  'teaching-education': GraduationCap,
} as const;

function AboutAreaLayouts({ layout }: { layout: AboutCardsVariantId }) {
  const focusAreas = allContent.about.focusAreas;

  if (layout === 'split') {
    return (
      <div className={styles.splitLayout}>
        {focusAreas.map((item) => (
          <article key={item.id} className={styles.splitCard}>
            <div className={styles.splitLabelBlock}>
              <p className={styles.cardLabel}>{item.label}</p>
              <h3>{item.title}</h3>
            </div>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    );
  }

  if (layout === 'rail') {
    return (
      <div className={styles.railLayout}>
        {focusAreas.map((item) => (
          <article key={item.id} className={styles.railItem}>
            <span className={styles.railAccent} aria-hidden="true" />
            <div className={styles.railCard}>
              <p className={styles.cardLabel}>{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (layout === 'panel') {
    return (
      <div className={styles.panelLayout}>
        {focusAreas.map((item) => (
          <article key={item.id} className={styles.panelItem}>
            <div className={styles.panelLead}>
              <p className={styles.cardLabel}>{item.label}</p>
              <h3>{item.title}</h3>
            </div>
            <p className={styles.panelBody}>{item.body}</p>
          </article>
        ))}
      </div>
    );
  }

  if (layout === 'beacon') {
    return (
      <div className={styles.beaconLayout}>
        {focusAreas.map((item) => (
          <article key={item.id} className={styles.beaconCard}>
            <div className={styles.beaconHeader}>
              <span className={styles.beaconIcon} aria-hidden="true">
                {(() => {
                  const Icon = ABOUT_BEACON_ICONS[item.id];
                  return <Icon size={16} strokeWidth={2} />;
                })()}
              </span>
              <p className={styles.cardLabel}>{item.label}</p>
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className={clsx(styles.cards, styles[`cards-${layout}`])}>
      {focusAreas.map((item, index) => (
        <article
          key={item.id}
          className={clsx(
            styles.card,
            layout === 'featured' && index === 0 && styles.cardFeatured,
            layout === 'editorial' && styles.cardEditorial,
          )}
        >
          <p className={styles.cardLabel}>{item.label}</p>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { ref: glassRef, inView: isGlassActive } = useInView({ threshold: 0.18, rootMargin: '12% 0px -12% 0px' });
  const { variantState } = useVariantPanel();
  const aboutContent = allContent.about;

  return (
    <section id={aboutContent.sectionId} ref={glassRef} className={clsx(styles.section, styles[`tone-${variantState.aboutTone}`], isGlassActive && styles.glassActive)}>
      <div className={styles.inner} ref={ref}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className={styles.eyebrow}>{aboutContent.eyebrow}</p>
          <h2 className={styles.heading}>{aboutContent.heading}</h2>
          <p className={styles.body}>
            {aboutContent.paragraphs[0]}
          </p>
          {aboutContent.paragraphs[1] && <p className={styles.bodySecondary}>{aboutContent.paragraphs[1]}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}>
          <AboutAreaLayouts layout={variantState.aboutCards} />
        </motion.div>
      </div>
    </section>
  );
}
