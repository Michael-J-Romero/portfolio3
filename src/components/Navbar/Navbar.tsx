import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'Work', href: '#featured-work' },
  { label: 'About', href: '#about' },
  { label: 'Interactive', href: '#interactive' },
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
          Michael<span>.</span>
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
          Email
        </a>

        <button className={styles.menuBtn} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>
    </motion.nav>
  );
}
