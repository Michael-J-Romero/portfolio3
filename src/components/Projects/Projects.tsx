import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import styles from './Projects.module.scss';

interface Project {
  id: string;
  title: string;
  meta: string;
  summary: string;
  overview: string[];
  contributions: string[];
  tech: string[];
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'artist-foundation-website',
    title: 'Artist Foundation Website',
    meta: 'Live Site - React - Sanity CMS - Front-End Development',
    summary:
      'Developed the front end for a live website for an artist foundation, working closely with the designer and helping shape the final user experience while building a CMS-driven site the client can update independently.',
    overview: [
      'This project focused on translating a refined visual direction into production-quality front-end implementation.',
      'The build emphasized maintainable CMS modeling, responsive behavior, and content editing flexibility for non-technical stakeholders.',
    ],
    contributions: [
      'Front-end architecture and component implementation in React',
      'Design collaboration and visual fidelity refinement',
      'Sanity CMS integration for structured client-managed content',
      'Responsive and cross-device quality pass',
    ],
    tech: ['React', 'TypeScript', 'Sanity CMS', 'SCSS'],
    liveUrl: '#',
  },
  {
    id: 'artist-foundation-concept',
    title: 'Artist Foundation Design Concept',
    meta: 'Concept - UI Design - Front-End Concept Development',
    summary:
      'A design-led concept for a separate artist foundation, focused on strong visual hierarchy, editorial presentation, and a more distinctive overall visual identity.',
    overview: [
      'The concept explored a bolder editorial system while maintaining clear navigation and content rhythm.',
      'Special attention was placed on spacing, type hierarchy, and image treatment to establish identity.',
    ],
    contributions: [
      'Layout and design system direction',
      'Front-end concept implementation and interaction exploration',
      'Visual hierarchy and readability tuning',
    ],
    tech: ['React', 'TypeScript', 'SCSS', 'Motion'],
  },
  {
    id: 'code-teaching-program-site',
    title: 'Code Teaching / Program Website',
    meta: 'Single-Page Site - Education - Design + Development',
    summary:
      'A business site for my coding instruction work, designed to communicate programs, teaching experience, photos from years of instruction, and the story behind a summer tech program for kids.',
    overview: [
      'This site balanced practical program information with storytelling around teaching experience and outcomes.',
      'Content structure was designed to support trust-building while keeping the page clear and highly scannable.',
    ],
    contributions: [
      'Content architecture and UX flow planning',
      'UI design and front-end development',
      'Performance and responsive optimization',
    ],
    tech: ['React', 'TypeScript', 'SCSS'],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button
          ref={ref}
          className={styles.card}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
          type="button"
        >
          <div className={styles.cardImage}>
            <span>Preview</span>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.meta}>{project.meta}</p>
            <p className={styles.cardDesc}>{project.summary}</p>
            <div className={styles.cardTags}>
              {project.tech.map((tag) => (
                <span key={tag} className={clsx(styles.tag)}>
                  {tag}
                </span>
              ))}
            </div>
            <span className={styles.openLink}>
              Open Project <ArrowUpRight size={14} />
            </span>
          </div>
        </motion.button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialog}>
          <div className={styles.dialogHeader}>
            <Dialog.Title className={styles.dialogTitle}>
              {project.title}
            </Dialog.Title>
            <Dialog.Close className={styles.closeBtn} aria-label="Close">
              <X size={18} />
            </Dialog.Close>
          </div>

          <div className={styles.dialogBody}>
            <Dialog.Description className={styles.dialogDesc}>
              {project.meta}
            </Dialog.Description>

            {project.overview.map((paragraph) => (
              <p key={paragraph} className={styles.overviewParagraph}>
                {paragraph}
              </p>
            ))}

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
                <span key={tag} className={styles.tag}>
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
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Projects() {
  return (
    <section id="featured-work" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Featured Web Projects</p>
          <h2 className={styles.heading}>Featured Web Projects</h2>
          <p className={styles.intro}>
            A curated selection of recent work focused on front-end development, design execution, and interactive presentation.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
