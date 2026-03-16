import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navbar() {
  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          MR<span>.</span>
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.link}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.cta}>
          Hire me
        </a>

        <button className={styles.menuBtn} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>
    </motion.nav>
  );
}
