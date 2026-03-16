import { ArrowUpRight, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import styles from './InteractiveWork.module.scss';

interface Game {
  id: string;
  title: string;
  meta: string;
  summary: string;
}

const LEGACY_GAMES: Game[] = [
  {
    id: 'blood-red',
    title: 'Blood Red',
    meta: 'Action Game - Legacy Project',
    summary:
      'A zombie survival shooter built from scratch, where I explored hit reactions, dynamic animation combinations, and instant bullet collision detection along a traced line.',
  },
  {
    id: 'toxic-tides',
    title: 'Toxic Tides',
    meta: 'Action Game - Legacy Project',
    summary:
      'An underwater multidirectional shooter focused on wave survival, enemy variety, and performance optimization for large numbers of active enemies on screen.',
  },
  {
    id: 'droid-team',
    title: 'Droid Team',
    meta: 'Puzzle Game - Legacy Project',
    summary:
      'A puzzle game built around custom character physics, stacking mechanics, and level design that forced cooperative problem-solving without allowing players to bypass the intended challenge.',
  },
];

function LegacyCard({ game, index }: { game: Game; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button
          ref={ref}
          className={styles.legacyCard}
          type="button"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
        >
          <h4>{game.title}</h4>
          <p className={styles.meta}>{game.meta}</p>
          <p>{game.summary}</p>
          <span className={styles.openLink}>
            Open Project <ArrowUpRight size={14} />
          </span>
        </motion.button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialog}>
          <div className={styles.dialogHeader}>
            <Dialog.Title>{game.title}</Dialog.Title>
            <Dialog.Close className={styles.closeBtn} aria-label="Close">
              <X size={18} />
            </Dialog.Close>
          </div>
          <Dialog.Description className={styles.dialogMeta}>{game.meta}</Dialog.Description>
          <p className={styles.dialogBody}>{game.summary}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function InteractiveWork() {
  return (
    <section id="interactive" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Games & Interactive Work</p>
          <h2>Games & Interactive Work</h2>
          <p>
            A selection of projects that reflect my roots in game development and my continued interest in systems, motion, and interaction design.
          </p>
        </header>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className={styles.featuredCard} type="button">
              <span className={styles.inDevelopment}>In Development</span>
              <h3>Rhythm Drumming VR Game</h3>
              <p className={styles.meta}>In Development - Web VR - Gameplay Systems</p>
              <p>
                A rhythm-based drumming game in development for the web, combining timing-focused gameplay and performance-driven interaction in a more immersive format.
              </p>
              <span className={styles.openLink}>
                Open Project <ArrowUpRight size={14} />
              </span>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={styles.dialog}>
              <div className={styles.dialogHeader}>
                <Dialog.Title>Rhythm Drumming VR Game</Dialog.Title>
                <Dialog.Close className={styles.closeBtn} aria-label="Close">
                  <X size={18} />
                </Dialog.Close>
              </div>
              <Dialog.Description className={styles.dialogMeta}>
                In Development - Web VR - Gameplay Systems
              </Dialog.Description>
              <p className={styles.dialogBody}>
                A rhythm-based drumming game in development for the web, combining timing-focused gameplay and performance-driven interaction in a more immersive format.
              </p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className={styles.legacyIntro}>
          <h3>Legacy Game Projects</h3>
          <p>
            Before moving into professional web work, I spent years building games from scratch - handling gameplay logic, custom physics, and much of the art and animation myself.
          </p>
        </div>

        <div className={styles.legacyGrid}>
          {LEGACY_GAMES.map((game, index) => (
            <LegacyCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
