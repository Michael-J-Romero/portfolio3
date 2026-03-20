import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { useVariantPanel } from '../../variants';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'Work', href: '#featured-work' },
  { label: 'About', href: '#about' },
  { label: 'Interactive', href: '#interactive' },
  { label: 'Contact', href: '#contact' },
] as const;

const OBSERVED_SECTIONS = NAV_LINKS.map((item) => item.href.replace('#', ''));

export default function Navbar() {
  const { variantState } = useVariantPanel();
  const [isCompact, setIsCompact] = useState(false);
  const [activeSection, setActiveSection] = useState('featured-work');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snapshotImage, setSnapshotImage] = useState<string | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateCompactState = () => {
      rafId = 0;
      const nextIsCompact = window.scrollY > 18;
      setIsCompact((current) => (current === nextIsCompact ? current : nextIsCompact));
    };

    const onScroll = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(updateCompactState);
    };

    updateCompactState();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
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

  useEffect(() => {
    if (
      variantState.optimizationGlassBehavior !== 'idle-snapshot'
      || variantState.optimizationGlassLevel === 'off'
    ) {
      setSnapshotImage(null);
      return;
    }

    let captureTimer = 0;
    let isCancelled = false;
    let isCapturing = false;

    const captureSnapshot = async () => {
      const target = innerRef.current;
      const capture = window.html2canvas;

      if (!target || !capture || isCapturing) {
        return;
      }

      isCapturing = true;

      try {
        const rect = target.getBoundingClientRect();
        const canvas = await capture(document.body, {
          backgroundColor: null,
          logging: false,
          useCORS: true,
          scale: Math.min(window.devicePixelRatio, 1),
          x: rect.left,
          y: window.scrollY + rect.top,
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height),
          scrollX: 0,
          scrollY: window.scrollY,
          windowWidth: document.documentElement.clientWidth,
          windowHeight: window.innerHeight,
          ignoreElements: (element) => element instanceof HTMLElement && Boolean(element.closest('[data-navbar-chrome="true"]')),
        });

        if (!isCancelled) {
          setSnapshotImage(canvas.toDataURL('image/webp', 0.84));
        }
      } catch {
        if (!isCancelled) {
          setSnapshotImage(null);
        }
      } finally {
        isCapturing = false;
      }
    };

    const scheduleCapture = (delay: number) => {
      if (captureTimer !== 0) {
        window.clearTimeout(captureTimer);
      }

      captureTimer = window.setTimeout(() => {
        captureTimer = 0;
        void captureSnapshot();
      }, delay);
    };

    scheduleCapture(260);

    const onScroll = () => {
      scheduleCapture(220);
    };

    const onResize = () => {
      scheduleCapture(320);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      isCancelled = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (captureTimer !== 0) {
        window.clearTimeout(captureTimer);
      }
    };
  }, [variantState.optimizationGlassBehavior, variantState.optimizationGlassLevel]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const navInnerStyle = snapshotImage
    ? ({ '--glass-navbar-snapshot-image': `url("${snapshotImage}")` } as CSSProperties)
    : undefined;

  const shouldRenderGlassLayers = variantState.optimizationGlassLevel !== 'off';
  const shouldRenderSnapshot = shouldRenderGlassLayers && variantState.optimizationGlassBehavior === 'idle-snapshot';

  return (
    <motion.nav 
      data-navbar-chrome="true" 
      className={clsx(
        styles.nav, 
        isCompact && styles.navCompact,
        styles[`style-${variantState.navbarStyle}`]
      )} 
      initial={{ y: -80, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div ref={innerRef} className={styles.inner} style={navInnerStyle}>
        {shouldRenderSnapshot && <span className={styles.snapshotOverlay} aria-hidden="true" />}
        {shouldRenderGlassLayers && <span className={styles.realGlassLayer} aria-hidden="true" />}
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
