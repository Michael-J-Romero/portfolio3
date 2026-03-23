import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import allContent from '../../content/allContent';
import ProjectDetailDialog from '../ProjectDetailDialog/ProjectDetailDialog';
import { useVariantPanel } from '../../variants';
import type {
  ProjectsCardVariantId,
  ProjectsLayoutVariantId,
  ProjectsSurfaceVariantId,
} from '../../variants';
import styles from './Projects.module.scss';

type ProjectItem = (typeof allContent.projects.items)[number];

function ProjectCard({
  project,
  index,
  cardVariant,
  layoutVariant,
  surfaceVariant,
}: {
  project: ProjectItem;
  index: number;
  cardVariant: ProjectsCardVariantId;
  layoutVariant: ProjectsLayoutVariantId;
  surfaceVariant: ProjectsSurfaceVariantId;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const cardCopy = project.card;
  const dialogCopy = project.dialog;

  return (
    <ProjectDetailDialog
      title={project.title}
      meta={project.meta}
      imageSrc={project.imageSrc}
      imageAlt={project.imageAlt}
      mediaLabel={dialogCopy.mediaLabel}
      mediaClassName={styles[`modal-${surfaceVariant}`]}
      closeClassName={styles.closeBtn}
      mainClassName={styles.modalContent}
      asideClassName={styles.modalAside}
      mainContent={(
        <>
          {dialogCopy.overview.map((paragraph) => (
            <p key={paragraph} className={styles.overviewParagraph}>
              {paragraph}
            </p>
          ))}
        </>
      )}
      asideContent={(
        <>
          <p className={styles.modalHighlight}>{dialogCopy.outcome}</p>

          <div className={styles.modalBlock}>
            <h4>{allContent.projects.ui.contributionsHeading}</h4>
            <ul>
              {dialogCopy.contributions.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>

          <div className={styles.cardTags}>
            {dialogCopy.tech.map((tag) => (
              <span key={tag} className={clsx(styles.tag)}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.dialogLinks}>
            {dialogCopy.liveSite && (
              <a
                href={dialogCopy.liveSite.href}
                className={styles.dialogLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} />
                {dialogCopy.liveSite.label}
              </a>
            )}
          </div>
        </>
      )}
    >
      <motion.button
          ref={ref}
          className={clsx(
            styles.card,
            styles[`card-${cardVariant}`],
            styles[`surface-${surfaceVariant}`],
            layoutVariant === 'featured' && index === 0 && styles.cardPrimary,
            layoutVariant === 'imageLeft1' && index === 0 && styles.cardImageLeft1,
            layoutVariant === 'editorial' && styles.cardEditorial,
            layoutVariant === 'showcase' && index > 0 && styles.cardShowcaseSupport,
            layoutVariant === 'staggered' && index === 1 && styles.cardStaggerTall,
            layoutVariant === 'staggered' && index === 2 && styles.cardStaggerLift,
          )}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
          type="button"
        >
          <div className={clsx(styles.cardImage, styles[`imageTone${(index % 3) + 1}`])}>
            <img src={project.imageSrc} alt={project.imageAlt} className={styles.cardImageAsset} loading="lazy" decoding="async" />
            <div className={styles.imageMeta}>
              <span className={styles.imageKicker}>{cardCopy.previewLabel}</span>
              <span className={styles.imageContext}>{cardCopy.previewContext}</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            {cardCopy.meta && <p className={styles.meta}>{cardCopy.meta}</p>}
            {cardCopy.summary && <p className={styles.cardDesc}>{cardCopy.summary}</p>}
            {cardCopy.outcomeNote && <p className={styles.outcomeNote}>{cardCopy.outcomeNote}</p>}
            {cardCopy.signalChips && (
              <div className={styles.signalRow}>
                {cardCopy.signalChips.map((signal) => (
                  <span key={signal} className={styles.signalChip}>{signal}</span>
                ))}
              </div>
            )}
            {cardCopy.tech && (
              <div className={styles.cardTags}>
                {cardCopy.tech.map((tag) => (
                  <span key={tag} className={clsx(styles.tag)}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <span className={styles.openLink}>
              {cardCopy.openLabel} <ArrowUpRight size={14} />
            </span>
          </div>
        </motion.button>
    </ProjectDetailDialog>
  );
}

export default function Projects() {
  const { ref: glassRef, inView: isGlassActive } = useInView({ threshold: 0.16, rootMargin: '12% 0px -12% 0px' });
  const { variantState } = useVariantPanel();
  const projectsContent = allContent.projects;

  return (
    <section id={projectsContent.sectionId} ref={glassRef} className={clsx(styles.section, isGlassActive && styles.glassActive)}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{projectsContent.eyebrow}</p>
          <h2 className={styles.heading}>{projectsContent.heading}</h2>
          <p className={styles.intro}>{projectsContent.intro}</p>
        </div>

        <div className={clsx(styles.grid, styles[`layout-${variantState.projectsLayout}`])}>
          {projectsContent.items.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              cardVariant={variantState.projectsCard}
              layoutVariant={variantState.projectsLayout}
              surfaceVariant={variantState.projectsSurface}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
