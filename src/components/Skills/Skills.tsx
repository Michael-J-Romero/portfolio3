import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import styles from './Skills.module.scss';

const SKILL_GROUPS = [
  {
    title: 'Front-End',
    skills: ['React', 'TypeScript', 'Responsive UI', 'Component systems', 'CMS integration', 'Motion and interaction'],
  },
  {
    title: 'Design & UX',
    skills: ['Layout systems', 'Visual hierarchy', 'Design implementation', 'Collaborative design refinement', 'Interaction-focused UI thinking'],
  },
  {
    title: 'Interactive Systems',
    skills: ['Gameplay logic', 'Animation systems', 'Custom mechanics', 'Performance-minded problem solving', 'Prototyping'],
  },
  {
    title: 'Professional Strengths',
    skills: ['Client collaboration', 'Communication', 'Teaching and mentorship', 'Translating complexity into clarity'],
  },
] as const;

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Capabilities</p>
          <h2 className={styles.heading}>Capabilities</h2>
          <p className={styles.supportingLine}>
            Selected projects shown here represent a focused sample of my work. Additional experience details and samples are available upon request.
          </p>
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
