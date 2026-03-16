import { ArrowDown, Github, Linkedin } from 'lucide-react';
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

export default function Hero() {
  return (
    <section id="hero" className={styles.section}>
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p className={styles.eyebrow} variants={item}>
          <span>{'<'}</span> Hello, world! <span>{'>'}</span>
        </motion.p>

        <motion.h1 className={styles.title} variants={item}>
          Your Name<span>.</span>
        </motion.h1>

        <motion.p className={styles.subtitle} variants={item}>
          Full-stack developer &amp; designer crafting thoughtful digital
          experiences.
        </motion.p>

        <motion.div className={styles.actions} variants={item}>
          <a href="#projects" className={styles.btnPrimary}>
            View my work
            <ArrowDown size={16} />
          </a>
          <a href="#contact" className={styles.btnSecondary}>
            Get in touch
          </a>
        </motion.div>

        <motion.div className={styles.actions} variants={item} style={{ marginTop: '2rem', gap: '1rem' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <Github size={20} color="var(--color-text-muted, #888)" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={20} color="var(--color-text-muted, #888)" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
