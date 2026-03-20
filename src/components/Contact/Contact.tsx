import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { useVariantPanel } from '../../variants';
import { CONTACT_COPY } from '../../variants/closing/closingContent';
import styles from './Contact.module.scss';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: glassRef, inView: isGlassActive } = useInView({ threshold: 0.18, rootMargin: '12% 0px -12% 0px' });
  const { variantState } = useVariantPanel();
  const contactCopy = CONTACT_COPY[variantState.contactIntro];

  return (
    <section id="contact" ref={glassRef} className={clsx(styles.section, styles[`surface-${variantState.contactSurface}`], isGlassActive && styles.glassActive)}>
      <div className={styles.inner} ref={ref}>
        <motion.div
          className={clsx(styles.content, styles[`layout-${variantState.contactLayout}`])}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.messageBlock}>
            <p className={styles.eyebrow}>{contactCopy.eyebrow}</p>
            <h2 className={styles.heading}>{contactCopy.heading}</h2>
            <p className={styles.body}>
              {contactCopy.body}
            </p>
          </div>

          <div className={styles.actionBlock}>
            <div className={styles.actions}>
              <a href="mailto:your-email@example.com" className={styles.primaryCta}>
                {contactCopy.primaryLabel}
              </a>
              <a href="#" className={styles.secondaryCta}>
                {contactCopy.secondaryLabel}
              </a>
            </div>

            <p className={styles.smallPrint}>
              {contactCopy.availability}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
