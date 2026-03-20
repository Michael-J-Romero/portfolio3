import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import ProjectDetailDialog from '../ProjectDetailDialog/ProjectDetailDialog';
import { useVariantPanel } from '../../variants';
import {
  FEATURED_WEB_PROJECTS,
  PROJECTS_SECTION_COPY,
  PROJECT_CARD_OPEN_LABELS,
  type FeaturedProject,
} from '../../variants/projects/projectContent';
import type {
  ProjectsCardVariantId,
  ProjectsLayoutVariantId,
  ProjectsSurfaceVariantId,
} from '../../variants';
import styles from './Projects.module.scss';

function ProjectCard({
  project,
  index,
  cardVariant,
  layoutVariant,
  surfaceVariant,
}: {
  project: FeaturedProject;
  index: number;
  cardVariant: ProjectsCardVariantId;
  layoutVariant: ProjectsLayoutVariantId;
  surfaceVariant: ProjectsSurfaceVariantId;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const cardSummary =
    cardVariant === 'compact' || cardVariant === 'minimal'
      ? project.compactSummary
      : cardVariant === 'outcomes'
        ? project.outcome
        : cardVariant === 'signals'
          ? project.previewContext
        : project.summary;
  const showTags = cardVariant !== 'compact' && cardVariant !== 'minimal';
  const showMeta = cardVariant !== 'minimal';
  const showDesc = true;

  return (
    <ProjectDetailDialog
      title={project.title}
      meta={project.meta}
      imageSrc={project.imageSrc}
      imageAlt={project.imageAlt}
      mediaLabel={project.previewLabel}
      mediaClassName={styles[`modal-${surfaceVariant}`]}
      closeClassName={styles.closeBtn}
      mainClassName={styles.modalContent}
      asideClassName={styles.modalAside}
      mainContent={(
        <>
          {project.overview.map((paragraph) => (
            <p key={paragraph} className={styles.overviewParagraph}>
              {paragraph}
            </p>
          ))}
        </>
      )}
      asideContent={(
        <>
          <p className={styles.modalHighlight}>{project.outcome}</p>

          <div className={styles.modalBlock}>
            <h4>Contributions</h4>
            <ul>
              {project.contributions.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>

          <div className={styles.cardTags}>
            {project.tech.map((tag) => (
              <span key={tag} className={clsx(styles.tag)}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.dialogLinks}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className={styles.dialogLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} />
                Live site
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
              <span className={styles.imageKicker}>{project.previewLabel}</span>
              <span className={styles.imageContext}>{project.previewContext}</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            {showMeta && <p className={styles.meta}>{project.meta}</p>}
            {showDesc && <p className={styles.cardDesc}>{cardSummary}</p>}
            {cardVariant === 'outcomes' && <p className={styles.outcomeNote}>Why it matters: {project.outcome}</p>}
            {cardVariant === 'signals' && (
              <div className={styles.signalRow}>
                <span className={styles.signalChip}>{project.previewLabel}</span>
                <span className={styles.signalChip}>Proof focus</span>
              </div>
            )}
            {showTags && (
              <div className={styles.cardTags}>
                {project.tech.map((tag) => (
                  <span key={tag} className={clsx(styles.tag)}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <span className={styles.openLink}>
              {PROJECT_CARD_OPEN_LABELS[cardVariant]} <ArrowUpRight size={14} />
            </span>
          </div>
        </motion.button>
    </ProjectDetailDialog>
  );
}

export default function Projects() {
  const { ref: glassRef, inView: isGlassActive } = useInView({ threshold: 0.16, rootMargin: '12% 0px -12% 0px' });
  const { variantState } = useVariantPanel();
  const sectionCopy = PROJECTS_SECTION_COPY[variantState.projectsIntro];

  return (
    <section id="featured-work" ref={glassRef} className={clsx(styles.section, isGlassActive && styles.glassActive)}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{sectionCopy.eyebrow}</p>
          <h2 className={styles.heading}>{sectionCopy.heading}</h2>
          <p className={styles.intro}>{sectionCopy.intro}</p>
        </div>

        <div className={clsx(styles.grid, styles[`layout-${variantState.projectsLayout}`])}>
          {FEATURED_WEB_PROJECTS.map((project, i) => (
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
