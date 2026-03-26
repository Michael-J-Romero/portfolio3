import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import clsx from '../../utils/clsx';
import { useVariantPanel } from '../../variants';
import styles from './Contact.module.scss';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: glassRef, inView: isGlassActive } = useInView({ threshold: 0.18, rootMargin: '12% 0px -12% 0px' });
  const { variantState, resolvedContent } = useVariantPanel();
  const contactContent = resolvedContent.closing.contact;

  return (
    <section id={contactContent.sectionId} ref={glassRef} className={clsx(styles.section, styles[`surface-${variantState.contactSurface}`], isGlassActive && styles.glassActive)}>
      <div className={styles.inner} ref={ref}>
        <motion.div
          className={clsx(styles.content, styles[`layout-${variantState.contactLayout}`])}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.messageBlock}>
            <p className={styles.eyebrow}>{contactContent.eyebrow}</p>
            <h2 className={styles.heading}>{contactContent.heading}</h2>
            <p className={styles.body}>
              {contactContent.body}
            </p>
          </div>

          <div className={styles.actionBlock}>
            <div className={styles.actions}>
              <a href={contactContent.actions[0]?.href ?? '#'} className={styles.primaryCta}>
                {contactContent.actions[0]?.label}
              </a>
              <a href={contactContent.actions[1]?.href ?? '#'} className={styles.secondaryCta}>
                {contactContent.actions[1]?.label}
              </a>
            </div>

            <p className={styles.smallPrint}>
              {contactContent.availability}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
