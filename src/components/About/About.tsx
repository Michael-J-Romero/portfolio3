import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import styles from './About.module.scss';

const STATS = [
  { value: '3+', label: 'Years experience' },
  { value: '20+', label: 'Projects shipped' },
  { value: '10+', label: 'Happy clients' },
] as const;

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className={styles.eyebrow}>About me</p>
          <h2 className={styles.heading}>Who I am</h2>
          <p className={styles.body}>
            {/* TODO: Replace with your bio */}
            Hi, I&apos;m a developer based in [City]. I love building clean,
            performant web experiences. When I&apos;m not coding, you can find
            me [hobby / interest].
          </p>

          <div className={styles.stats}>
            {STATS.map(({ value, label }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.image}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          {/* TODO: Replace with <img> */}
          Photo placeholder
        </motion.div>
      </div>
    </section>
  );
}
