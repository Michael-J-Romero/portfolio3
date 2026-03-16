import { Send } from 'lucide-react';
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
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className={styles.eyebrow}>Contact</p>
          <h2 className={styles.heading}>Let&apos;s work together</h2>
          <p className={styles.body}>
            {/* TODO: Update with your contact details */}
            Have a project in mind or just want to say hello? I&apos;d love to
            hear from you.
          </p>
        </motion.div>

        <motion.form
          className={styles.form}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.field}>
            <label htmlFor="contact-name" className={styles.label}>
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              className={styles.input}
              placeholder="Your name"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-email" className={styles.label}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              className={styles.input}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-message" className={styles.label}>
              Message
            </label>
            <textarea
              id="contact-message"
              className={styles.textarea}
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Send message
            <Send size={16} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
