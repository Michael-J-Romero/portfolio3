import { ArrowDownRight } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type Variants } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useVariantPanel } from '../../variants';
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
  const { variantState, resolvedContent } = useVariantPanel();
  const heroContent = resolvedContent.hero;
  const sectionRef = useRef<HTMLElement | null>(null);
  const visualWrapRef = useRef<HTMLDivElement | null>(null);
  const fade2BaseTopRef = useRef<number | null>(null);
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

  const applyFade2ClampedTop = () => {
    if (!isExtremeParallaxFade2Layout || !sectionRef.current || !visualWrapRef.current) return;

    const baseTop = fade2BaseTopRef.current;
    if (baseTop === null) return;

    const section = sectionRef.current;
    const visualWrap = visualWrapRef.current;
    const visualHeight = visualWrap.offsetHeight;
    const sectionRect = section.getBoundingClientRect();
    const desiredTop = baseTop + fade2ParallaxY.get();
    const maxTopWithinSection = sectionRect.bottom - visualHeight;
    const clampedTop = Math.min(desiredTop, maxTopWithinSection);

    visualWrap.style.top = `${clampedTop}px`;
  };

  useEffect(() => {
    if (!isExtremeParallaxFade2Layout || !sectionRef.current || !visualWrapRef.current) return;

    const visualWrap = visualWrapRef.current;
    const parsedBaseTop = Number.parseFloat(window.getComputedStyle(visualWrap).top || '0');
    fade2BaseTopRef.current = Number.isNaN(parsedBaseTop) ? 0 : parsedBaseTop;

    applyFade2ClampedTop();
    window.addEventListener('resize', applyFade2ClampedTop);

    return () => {
      window.removeEventListener('resize', applyFade2ClampedTop);
      fade2BaseTopRef.current = null;
      visualWrap.style.top = '';
    };
  }, [isExtremeParallaxFade2Layout, fade2ParallaxY]);

  useMotionValueEvent(fade2ParallaxY, 'change', () => {
    applyFade2ClampedTop();
  });

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
    <section id={heroContent.sectionId} ref={sectionRef} className={styles.section}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={`${styles.inner} ${layoutClass}`}>
        <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
          <motion.p className={styles.eyebrow} variants={item}>
            {heroContent.eyebrow}
          </motion.p>

          <motion.h1 className={styles.title} variants={item}>
            {heroContent.headline}
          </motion.h1>

          <motion.p className={styles.subtitle} variants={item}>
            {heroContent.supportCopy}
          </motion.p>

          <motion.div className={styles.actions} variants={item}>
            {heroContent.actions.map((action: { id: string; href: string; label: string }, index: number) => {
              if (index === 0) {
                return (
                  <a key={action.id} href={action.href} className={styles.btnPrimary}>
                    {action.label}
                    <ArrowDownRight size={16} />
                  </a>
                );
              }

              if (index === 1) {
                return (
                  <a key={action.id} href={action.href} className={styles.btnSecondary}>
                    {action.label}
                  </a>
                );
              }

              return (
                <a key={action.id} href={action.href} className={styles.textLink}>
                  {action.label}
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          ref={visualWrapRef}
          className={`${styles.visualWrap} ${visualClass}`.trim()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
          style={isExtremeParallaxFade2Layout ? { opacity: fade2Opacity } : undefined}
        >
          <HeroAnimation
            size={animationSize}
            orbitSpeed={1}
            spinSpeed={2.7}
            plainCircles={false}
            scrollRotation={scrollSceneRotation}
            counterScrollRotation={counterScrollSceneRotation}
            reactLogoAlt={heroContent.animation.reactLogoAlt}
          />
        </motion.div>
      </div>
    </section>
  );
}
