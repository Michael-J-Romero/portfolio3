import { ArrowUpRight, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import styles from './SelectedWork.module.scss';

interface Item {
  id: string;
  title: string;
  meta: string;
  summary: string;
}

const ITEMS: Item[] = [
  {
    id: 'buffalo-soldiers',
    title: 'Buffalo Soldiers',
    meta: 'Centralized Chapter Hub - Concept / Prototype',
    summary:
      'A web concept designed as a centralized hub structure for chapters, balancing organizational clarity with a stronger sense of identity and navigation.',
  },
  {
    id: 'inland-empire-institute',
    title: 'Inland Empire Institute',
    meta: 'Education / Certification - Concept / Prototype',
    summary:
      'A site concept for technology certification programs, focused on communicating pathways, legitimacy, and program value in a clear and structured way.',
  },
  {
    id: '8gb',
    title: '8gb',
    meta: 'Retro E-Commerce - Concept / Prototype',
    summary:
      'A retro-styled e-commerce concept with a stronger visual personality, designed to merge playful aesthetic choices with a usable storefront structure.',
  },
];

function WorkCard({ item, index }: { item: Item; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button
          ref={ref}
          className={styles.card}
          type="button"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
        >
          <h3>{item.title}</h3>
          <p className={styles.meta}>{item.meta}</p>
          <p>{item.summary}</p>
          <span className={styles.openLink}>
            Open Project <ArrowUpRight size={14} />
          </span>
        </motion.button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialog}>
          <div className={styles.dialogHeader}>
            <Dialog.Title>{item.title}</Dialog.Title>
            <Dialog.Close className={styles.closeBtn} aria-label="Close">
              <X size={18} />
            </Dialog.Close>
          </div>
          <Dialog.Description className={styles.dialogMeta}>{item.meta}</Dialog.Description>
          <p className={styles.dialogBody}>{item.summary}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function SelectedWork() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Selected Client & Concept Work</p>
          <h2>Selected Client & Concept Work</h2>
          <p>
            Additional projects exploring branding, layout systems, and functional front-end concepts across different audiences and styles.
          </p>
        </header>

        <div className={styles.grid}>
          {ITEMS.map((item, index) => (
            <WorkCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <p className={styles.note}>
          These projects represent selected concept and client-facing work. Additional samples are available upon request.
        </p>
      </div>
    </section>
  );
}
