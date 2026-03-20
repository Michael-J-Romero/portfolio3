import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { useVariantPanel } from '../../variants';
import { ABOUT_COPY, ABOUT_FOCUS_AREAS, ABOUT_HEADING } from '../../variants/about/aboutContent';
import type { AboutCardsVariantId } from '../../variants';
import styles from './About.module.scss';

function AboutAreaLayouts({ layout }: { layout: AboutCardsVariantId }) {
  if (layout === 'split') {
    return (
      <div className={styles.splitLayout}>
        {ABOUT_FOCUS_AREAS.map((item) => (
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
        {ABOUT_FOCUS_AREAS.map((item) => (
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
        {ABOUT_FOCUS_AREAS.map((item) => (
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
        {ABOUT_FOCUS_AREAS.map((item) => (
          <article key={item.id} className={styles.beaconCard}>
            <div className={styles.beaconHeader}>
              <span className={styles.beaconDot} aria-hidden="true" />
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
      {ABOUT_FOCUS_AREAS.map((item, index) => (
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
  const aboutCopy = ABOUT_COPY[variantState.aboutCopy];

  return (
    <section id="about" ref={glassRef} className={clsx(styles.section, styles[`tone-${variantState.aboutTone}`], isGlassActive && styles.glassActive)}>
      <div className={styles.inner} ref={ref}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className={styles.eyebrow}>About</p>
          <h2 className={styles.heading}>{ABOUT_HEADING}</h2>
          <p className={styles.body}>
            {aboutCopy.primary}
          </p>
          {aboutCopy.secondary && <p className={styles.bodySecondary}>{aboutCopy.secondary}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}>
          <AboutAreaLayouts layout={variantState.aboutCards} />
        </motion.div>
      </div>
    </section>
  );
}
