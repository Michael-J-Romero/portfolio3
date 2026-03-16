import { ExternalLink, Github, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import styles from './Projects.module.scss';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description:
      'A placeholder description for project one. Replace with your actual project details.',
    tags: ['React', 'TypeScript', 'SCSS'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description:
      'A placeholder description for project two. Replace with your actual project details.',
    tags: ['Node.js', 'PostgreSQL', 'REST'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description:
      'A placeholder description for project three. Replace with your actual project details.',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
    liveUrl: '#',
    repoUrl: '#',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.article
          ref={ref}
          className={styles.card}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
          role="button"
          tabIndex={0}
        >
          <div className={styles.cardImage}>
            {/* TODO: Replace with project screenshot */}
            Image placeholder
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.description}</p>
            <div className={styles.cardTags}>
              {project.tags.map((tag) => (
                <span key={tag} className={clsx(styles.tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
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
              {project.description}
            </Dialog.Description>

            <div className={styles.cardTags}>
              {project.tags.map((tag) => (
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
                  Live demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  className={styles.dialogLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={14} />
                  Source code
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
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Work</p>
          <h2 className={styles.heading}>Selected projects</h2>
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
