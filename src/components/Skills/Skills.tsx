import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { useVariantPanel } from '../../variants';
import type { ResolvedContent } from '../../content/resolvedContent';
import styles from './Skills.module.scss';

type WebProject = ResolvedContent['projects']['items'][number];

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: glassRef, inView: isGlassActive } = useInView({ threshold: 0.18, rootMargin: '12% 0px -12% 0px' });
  const { variantState, resolvedContent } = useVariantPanel();
  const skillsContent = resolvedContent.skills;
  const projectsContent = resolvedContent.projects;
  const educationProject = projectsContent.items.find((project: WebProject) => project.id === 'yourtechclass');
  const educationHref = educationProject?.dialog?.liveSite?.href;

  return (
    <section id={skillsContent.sectionId} ref={glassRef} className={clsx(styles.section, isGlassActive && styles.glassActive)}>
      <div className={styles.inner} ref={ref}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{skillsContent.eyebrow}</p>
          <h2 className={styles.heading}>{skillsContent.heading}</h2>
          <p className={styles.supportingLine}>{skillsContent.intro}</p>
        </div>

        <div className={clsx(styles.grid, styles[`layout-${variantState.skillsLayout}`])}>
          {skillsContent.groups.map((group: { title: string; label: string; summary: string; skills: string[] }, i: number) => (
            <motion.div
              key={group.title}
              className={clsx(
                styles.skillGroup,
                variantState.skillsLayout === 'featured' && i === 0 && styles.skillGroupFeatured,
                variantState.skillsLayout === 'editorial' && styles.skillGroupEditorial,
                variantState.skillsLayout === 'bands' && styles.skillGroupBand,
              )}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <p className={styles.groupLabel}>{group.label}</p>
              <p className={styles.groupTitle}>{group.title}</p>
              <p className={styles.groupSummary}>{group.summary}</p>
              <div className={clsx(styles.skills, styles[`skills-${variantState.skillsChip}`])}>
                {group.skills.map((skill: string) => (
                  <span key={skill} className={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {educationHref && (
          <div className={styles.educationMini}>
            <p className={styles.educationKicker}>Education experience</p>
            <div className={styles.educationRow}>
              <p className={styles.educationLead}>4+ years teaching</p>
              <p className={styles.educationDetail}>
                charter classes, workshops and youth programs,
                {' '}
                <a
                  href={educationHref}
                  className={styles.educationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  full story on yourtechclass
                  <ExternalLink size={14} />
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
