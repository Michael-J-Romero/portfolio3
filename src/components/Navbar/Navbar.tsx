import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'Work', href: '#featured-work' },
  { label: 'About', href: '#about' },
  { label: 'Interactive', href: '#interactive' },
  { label: 'Contact', href: '#contact' },
] as const;

const OBSERVED_SECTIONS = NAV_LINKS.map((item) => item.href.replace('#', ''));

export default function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [activeSection, setActiveSection] = useState('featured-work');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = OBSERVED_SECTIONS
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: '-35% 0px -45% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEscape);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <motion.nav className={clsx(styles.nav, isCompact && styles.navCompact)} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          Michael<span>.</span>
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={clsx(styles.link, activeSection === href.replace('#', '') && styles.linkActive)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.cta}>
          Email
        </a>

        <button className={styles.menuBtn} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-nav" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <button className={styles.mobileBackdrop} type="button" onClick={closeMobileMenu} aria-label="Close navigation menu" />
          <motion.div id="mobile-nav" className={styles.mobilePanel} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={clsx(styles.mobileLink, activeSection === href.replace('#', '') && styles.mobileLinkActive)} onClick={closeMobileMenu}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className={styles.mobileCta} onClick={closeMobileMenu}>
              Email
            </a>
          </motion.div>
        </>
      )}
    </motion.nav>
  );
}
