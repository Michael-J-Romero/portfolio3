import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import styles from './Skills.module.scss';

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'SCSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'REST', 'GraphQL'],
  },
  {
    title: 'Tooling',
    skills: ['Vite', 'Git', 'Docker', 'CI/CD', 'Figma'],
  },
] as const;

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Expertise</p>
          <h2 className={styles.heading}>Skills &amp; tools</h2>
        </div>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              className={styles.skillGroup}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <p className={styles.groupTitle}>{group.title}</p>
              <div className={styles.skills}>
                {group.skills.map((skill) => (
                  <span key={skill} className={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
