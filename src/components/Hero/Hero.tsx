import { ArrowDownRight } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { useVariantPanel } from '../../variants';
import { HERO_HEADLINES, HERO_SUPPORT_COPY } from '../../variants/hero/heroContent';
import { HeroVisualVariants } from '../../variants/hero/HeroVisualVariants';
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

export default function Hero() {
  const { variantState } = useVariantPanel();

  return (
    <section id="hero" className={styles.section}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.inner}>
        <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
          <motion.p className={styles.eyebrow} variants={item}>
            Front-End Developer / Interactive Developer
          </motion.p>

          <motion.h1 className={styles.title} variants={item}>
            {HERO_HEADLINES[variantState.heroHeadline]}
          </motion.h1>

          <motion.p className={styles.subtitle} variants={item}>
            {HERO_SUPPORT_COPY[variantState.heroSupport]}
          </motion.p>

          <motion.div className={styles.actions} variants={item}>
            <a href="#featured-work" className={styles.btnPrimary}>
              View Projects
              <ArrowDownRight size={16} />
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              Get in Touch
            </a>
            {variantState.heroResume === 'hero-link' && (
              <a href="#contact" className={styles.textLink}>
                Resume
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visualWrap}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
        >
          <HeroVisualVariants visualVariant={variantState.heroVisual} />
        </motion.div>
      </div>
    </section>
  );
}
