import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import styles from './Contact.module.scss';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className={styles.eyebrow}>Contact</p>
          <h2 className={styles.heading}>Let&apos;s build something thoughtful, polished, and interactive.</h2>
          <p className={styles.body}>
            I&apos;m interested in front-end, UI, and interactive development work where design quality, usability, and implementation all matter.
          </p>

          <div className={styles.actions}>
            <a href="mailto:your-email@example.com" className={styles.primaryCta}>
              Email Me
            </a>
            <a href="#" className={styles.secondaryCta}>
              View Resume
            </a>
          </div>

          <p className={styles.smallPrint}>
            Available for front-end, interactive, and creative development opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
