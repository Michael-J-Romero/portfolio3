import { ArrowDownRight } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, type Variants } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useVariantPanel } from '../../variants';
import { HERO_HEADLINES, HERO_SUPPORT_COPY } from '../../variants/hero/heroContent';
// @ts-expect-error - JSX component without type definitions
import HeroAnimation from './HeroAnimation';
import styles from './Hero.module.scss';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  const { variantState } = useVariantPanel();
  const sectionRef = useRef<HTMLElement | null>(null);
  const visualWrapRef = useRef<HTMLDivElement | null>(null);
  const layoutClass = styles[`layout-${variantState.heroLayout}`] || '';
  const visualClass = styles[`visual-${variantState.heroLayout}`] || '';

  const animationSizeByLayout = {
    'balanced-split': 400,
    'balanced-overlap': 500,
    'balanced-overlap-strong': 620,
    'balanced-sticky-parallax': 460,
    'extreme-parallax': 480,
    'extreme-parallax-fade': 480,
    'extreme-parallax-fade2': 480,
    'animation-large': 460,
    'stacked-priority': 420,
    'animation-dominant': 540,
    'centered-showcase': 480,
    'header-split-actions': 400,
    'title-priority-split': 420,
    'unified-top-columns': 410,
  } as const;

  const animationSize = animationSizeByLayout[variantState.heroLayout] ?? 400;
  const isStickyParallaxLayout = variantState.heroLayout === 'balanced-sticky-parallax';
  const isExtremeParallaxLayout = variantState.heroLayout === 'extreme-parallax' || variantState.heroLayout === 'extreme-parallax-fade';
  const isExtremeParallaxFade2Layout = variantState.heroLayout === 'extreme-parallax-fade2';
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const smoothHeroProgress = useSpring(scrollYProgress, {
    stiffness: 520,
    damping: 24,
    mass: 0.20,
  });
  const fade2ParallaxY = useTransform(smoothHeroProgress, [0, 1], [0, -420]);
  const fade2Opacity = useTransform(
    smoothHeroProgress,
    [0, 0.35, 0.65],
    isExtremeParallaxFade2Layout ? [1, 0.6, 0] : [1, 1, 1],
  );
  const scrollSceneRotation = useTransform(
    smoothHeroProgress,
    [0, 1],
    isExtremeParallaxFade2Layout ? [0, 36] : [0, 0],
  );
  const counterScrollSceneRotation = useTransform(
    smoothHeroProgress,
    [0, 1],
    isExtremeParallaxFade2Layout ? [0, -36] : [0, 0],
  );

  // Minimal scroll offset for fixed/sticky parallax elements
  useEffect(() => {
    const needsParallax = isStickyParallaxLayout || isExtremeParallaxLayout;
    if (!needsParallax || !visualWrapRef.current) return;

    const visualWrap = visualWrapRef.current;
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        
        // Get current transform value
        const currentTransform = visualWrap.style.transform;
        const currentY = currentTransform ? parseFloat(currentTransform.match(/translateY\(([-\d.]+)px\)/)?.[1] || '0') : 0;
        
        if (isStickyParallaxLayout) {
          // Sticky already doesn't move, apply subtle upward parallax (negative delta)
          const newY = currentY + (delta * -0.08); // Subtle counter-scroll effect
          visualWrap.style.transform = `translateY(${newY}px)`;
        } else if (isExtremeParallaxLayout) {
          // Fixed element, apply small fraction of scroll delta in opposite direction
          const newY = currentY + (delta * -0.5); // Moves up as you scroll down = slow scroll effect
          visualWrap.style.transform = `translateY(${newY}px)`;
        }
        
        lastScrollY = currentScrollY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateParallax);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isStickyParallaxLayout, isExtremeParallaxLayout]);

  return (
    <section id="hero" ref={sectionRef} className={styles.section}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={`${styles.inner} ${layoutClass}`}>
        <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
          <motion.p className={styles.eyebrow} variants={item}>
            Front-End Developer / Interactive Developer
          </motion.p>

          <motion.h1 className={styles.title} variants={item}>
            {HERO_HEADLINES[variantState.heroHeadline]}
          </motion.h1>

          <motion.p className={styles.subtitle} variants={item}>
            {HERO_SUPPORT_COPY[variantState.heroSupport]}
          </motion.p>

          <motion.div className={styles.actions} variants={item}>
            <a href="#featured-work" className={styles.btnPrimary}>
              View Projects
              <ArrowDownRight size={16} />
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              Get in Touch
            </a>
            {variantState.heroResume === 'hero-link' && (
              <a href="#contact" className={styles.textLink}>
                Resume
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          ref={visualWrapRef}
          className={`${styles.visualWrap} ${visualClass}`.trim()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
          style={isExtremeParallaxFade2Layout ? { y: fade2ParallaxY, opacity: fade2Opacity } : undefined}
        >
          <HeroAnimation
            size={animationSize}
            speed={1}
            plainCircles={false}
            scrollRotation={scrollSceneRotation}
            counterScrollRotation={counterScrollSceneRotation}
          />
        </motion.div>
      </div>
    </section>
  );
}
