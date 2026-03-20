import styles from '../../components/Hero/Hero.module.scss';
import { HERO_STACK_PREVIEWS } from './heroContent';
import type { HeroVisualVariantId } from '../config/types';

function StackedVisual() {
  return (
    <div className={styles.visualCluster}>
      {HERO_STACK_PREVIEWS.map((preview) => (
        <article key={preview.title} className={styles.clusterCard} data-tone={preview.tone}>
          <div className={styles.cardTopRow}>
            <p>{preview.label}</p>
            <span>{preview.detail}</span>
          </div>

          <div className={styles.mediaMockup} aria-hidden="true">
            <div className={styles.mockupChrome}>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.mockupStrip} />
              <div className={styles.mockupBlock} />
              <div className={styles.mockupGrid}>
                <span />
                <span />
              </div>
            </div>
          </div>

          <h3>{preview.title}</h3>
        </article>
      ))}
    </div>
  );
}

function DominantVisual() {
  return (
    <div className={styles.dominantVisual}>
      <article className={styles.dominantFrame}>
        <div className={styles.cardTopRow}>
          <p>Featured Web Work</p>
          <span>Recommended</span>
        </div>
        <div className={styles.mediaMockup} aria-hidden="true">
          <div className={styles.mockupChrome}>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.dominantMockupBody}>
            <div className={styles.dominantHeroBlock} />
            <div className={styles.dominantColumns}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
        <h3>Artist Foundation Website</h3>
      </article>

      <article className={styles.accentCard}>
        <p>Interactive Accent</p>
        <div className={styles.accentMedia} aria-hidden="true" />
        <h3>Rhythm Drumming VR</h3>
      </article>
    </div>
  );
}

function CollageVisual() {
  return (
    <div className={styles.collageFrame}>
      <div className={styles.cardTopRow}>
        <p>Project Range</p>
        <span>Unified collage</span>
      </div>
      <div className={styles.collageGrid} aria-hidden="true">
        <div className={styles.collagePrimary} />
        <div className={styles.collageSecondary} />
        <div className={styles.collageSecondary} />
      </div>
      <div className={styles.collageLabels}>
        <h3>Web, concept, and interactive work in one frame.</h3>
      </div>
    </div>
  );
}

function MinimalVisual() {
  return (
    <div className={styles.minimalVisual}>
      <article className={styles.minimalPanel}>
        <div className={styles.minimalGlow} aria-hidden="true" />
        <div className={styles.cardTopRow}>
          <p>Abstract direction</p>
          <span>Editorial</span>
        </div>
        <div className={styles.minimalCanvas} aria-hidden="true">
          <div className={styles.minimalOrbit} />
          <div className={styles.minimalLine} />
          <div className={styles.minimalTagRow}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <h3>Reduced visual noise with only subtle project cues.</h3>
      </article>
    </div>
  );
}

export function HeroVisualVariants({ visualVariant }: { visualVariant: HeroVisualVariantId }) {
  if (visualVariant === 'dominant') {
    return <DominantVisual />;
  }

  if (visualVariant === 'collage') {
    return <CollageVisual />;
  }

  if (visualVariant === 'minimal') {
    return <MinimalVisual />;
  }

  return <StackedVisual />;
}
