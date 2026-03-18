import { ArrowDownRight } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import styles from './Hero.module.scss';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const HERO_PREVIEWS = [
  {
    label: 'Live Site Mockup',
    title: 'Artist Foundation Website',
    detail: 'React + Sanity CMS',
    tone: 'primary',
  },
  {
    label: 'Design Concept Crop',
    title: 'Editorial Layout Direction',
    detail: 'UI Concept + Front-End',
    tone: 'secondary',
  },
  {
    label: 'Game Still',
    title: 'Rhythm Drumming VR',
    detail: 'Web VR Prototype',
    tone: 'tertiary',
  },
] as const;

export default function Hero() {
  return (
    <section id="hero" className={styles.section}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.inner}>
        <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
          <motion.p className={styles.eyebrow} variants={item}>
            Front-End Developer / Interactive Developer
          </motion.p>

          <motion.h1 className={styles.title} variants={item}>
            I build polished web experiences with a foundation in interactive systems and game development.
          </motion.h1>

          <motion.p className={styles.subtitle} variants={item}>
            I'm a Los Angeles-based developer with roots in game development, years of coding instruction, and a current focus on modern front-end work using React. My work blends design sensitivity, custom logic, and interaction-driven thinking.
          </motion.p>

          <motion.div className={styles.actions} variants={item}>
            <a href="#featured-work" className={styles.btnPrimary}>
              View Projects
              <ArrowDownRight size={16} />
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              Get in Touch
            </a>
            <a href="#contact" className={styles.textLink}>
              Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visualCluster}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
        >
          {HERO_PREVIEWS.map((preview) => (
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
        </motion.div>
      </div>
    </section>
  );
}
