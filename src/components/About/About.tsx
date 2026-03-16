import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import styles from './About.module.scss';

const CAPABILITIES = [
  {
    title: 'Front-End Development',
    body: 'React, responsive UI, component architecture, polished implementation',
  },
  {
    title: 'Interactive Thinking',
    body: 'Animation, motion systems, gameplay logic, custom interaction',
  },
  {
    title: 'Design Collaboration',
    body: 'Design interpretation, visual refinement, layout judgment, UX sensitivity',
  },
  {
    title: 'Teaching Experience',
    body: 'Years of coding instruction, youth programs, communication and mentorship',
  },
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
          <p className={styles.eyebrow}>About</p>
          <h2 className={styles.heading}>A developer shaped by games, teaching, and design-driven web work.</h2>
          <p className={styles.body}>
            I started coding through game development when I was young, building projects from scratch and learning how systems, movement, physics, and player experience fit together. Later, I taught coding through youth programs and developed web projects for clients, which pushed me to think more deeply about clarity, usability, and communication. Today, I focus on front-end development and interactive experiences that feel polished, thoughtful, and alive.
          </p>
          <p className={styles.body}>
            My background gives me a mix of strengths that doesn't come from one lane alone: visual problem-solving, custom logic, interface design, and an instinct for how people move through interactive systems.
          </p>
        </motion.div>

        <motion.div className={styles.cards} initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}>
          {CAPABILITIES.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
