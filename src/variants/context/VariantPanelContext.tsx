import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_VARIANT_STATE, VARIANT_STORAGE_KEY } from '../config/defaultVariantState';
import type { VariantState } from '../config/types';

interface VariantPanelContextValue {
  variantState: VariantState;
  updateVariant: <K extends keyof VariantState>(key: K, value: VariantState[K]) => void;
  resetVariants: () => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (value: boolean) => void;
}

const VariantPanelContext = createContext<VariantPanelContextValue | null>(null);

function readStoredVariantState(): VariantState {
  if (typeof window === 'undefined') {
    return DEFAULT_VARIANT_STATE;
  }

  const stored = window.localStorage.getItem(VARIANT_STORAGE_KEY);
  if (!stored) {
    return DEFAULT_VARIANT_STATE;
  }

  try {
    return {
      ...DEFAULT_VARIANT_STATE,
      ...(JSON.parse(stored) as Partial<VariantState>),
    };
  } catch {
    return DEFAULT_VARIANT_STATE;
  }
}

export function VariantPanelProvider({ children }: { children: ReactNode }) {
  const [variantState, setVariantState] = useState<VariantState>(() => readStoredVariantState());
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(VARIANT_STORAGE_KEY, JSON.stringify(variantState));
  }, [variantState]);

  useEffect(() => {
    document.documentElement.dataset.backgroundStyle = variantState.backgroundStyle;
    document.documentElement.dataset.backgroundGrid = variantState.backgroundGrid;
    document.documentElement.dataset.backgroundContrast = variantState.backgroundContrast;
    document.documentElement.dataset.backgroundParallax = variantState.backgroundParallax;
    document.documentElement.dataset.optimizationSurface = variantState.optimizationSurface;
    document.documentElement.dataset.optimizationAtmosphere = variantState.optimizationAtmosphere;
    document.documentElement.dataset.optimizationGlassLevel = variantState.optimizationGlassLevel;
    document.documentElement.dataset.optimizationGlassScope = variantState.optimizationGlassScope;
    document.documentElement.dataset.optimizationGlassBehavior = variantState.optimizationGlassBehavior;
    document.documentElement.dataset.optimizationGlassTransition = variantState.optimizationGlassTransition;
    document.documentElement.dataset.optimizationGlassPause = variantState.optimizationGlassPause;

    return () => {
      delete document.documentElement.dataset.backgroundStyle;
      delete document.documentElement.dataset.backgroundGrid;
      delete document.documentElement.dataset.backgroundContrast;
      delete document.documentElement.dataset.backgroundParallax;
      delete document.documentElement.dataset.optimizationSurface;
      delete document.documentElement.dataset.optimizationAtmosphere;
      delete document.documentElement.dataset.optimizationGlassLevel;
      delete document.documentElement.dataset.optimizationGlassScope;
      delete document.documentElement.dataset.optimizationGlassBehavior;
      delete document.documentElement.dataset.optimizationGlassTransition;
      delete document.documentElement.dataset.optimizationGlassPause;
    };
  }, [
    variantState.backgroundParallax,
    variantState.backgroundContrast,
    variantState.backgroundGrid,
    variantState.backgroundStyle,
    variantState.optimizationAtmosphere,
    variantState.optimizationGlassBehavior,
    variantState.optimizationGlassLevel,
    variantState.optimizationGlassPause,
    variantState.optimizationGlassScope,
    variantState.optimizationGlassTransition,
    variantState.optimizationSurface,
  ]);

  useEffect(() => {
    document.documentElement.dataset.scrollState = 'idle';

    if (
      variantState.optimizationGlassBehavior !== 'idle-snapshot'
      && variantState.optimizationGlassBehavior !== 'idle-fade'
    ) {
      return () => {
        delete document.documentElement.dataset.scrollState;
      };
    }

    let idleTimer = 0;
    const glassPauseByVariant: Record<VariantState['optimizationGlassPause'], number> = {
      short: 220,
      balanced: 320,
      long: 460,
      linger: 680,
    };
    const glassPause = glassPauseByVariant[variantState.optimizationGlassPause];

    const setMoving = () => {
      document.documentElement.dataset.scrollState = 'moving';

      if (idleTimer !== 0) {
        window.clearTimeout(idleTimer);
      }

      idleTimer = window.setTimeout(setIdle, glassPause);
    };

    const setIdle = () => {
      idleTimer = 0;
      document.documentElement.dataset.scrollState = 'idle';
    };

    const onScroll = () => {
      setMoving();
    };

    const onWheel = () => {
      setMoving();
    };

    const onTouchStart = () => {
      setMoving();
    };

    const onTouchMove = () => {
      setMoving();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Spacebar'].includes(event.key)) {
        setMoving();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      if (idleTimer !== 0) {
        window.clearTimeout(idleTimer);
      }
      delete document.documentElement.dataset.scrollState;
    };
  }, [variantState.optimizationGlassBehavior, variantState.optimizationGlassPause]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || variantState.backgroundParallax === 'none') {
      const glowPrimary = document.getElementById('bg-glow-primary') as HTMLElement | null;
      const glowSecondary = document.getElementById('bg-glow-secondary') as HTMLElement | null;
      const gridLayer = document.getElementById('bg-grid-layer') as HTMLElement | null;
      if (glowPrimary) glowPrimary.style.transform = '';
      if (glowSecondary) glowSecondary.style.transform = '';
      if (gridLayer) gridLayer.style.transform = '';
      return;
    }

    let rafId = 0;

    const updateParallax = () => {
      rafId = 0;
      const scrollY = Math.min(window.scrollY, 1800);
      const primaryFactor = variantState.backgroundParallax === 'soft' ? -0.018 : -0.04;
      const secondaryFactor = variantState.backgroundParallax === 'soft' ? -0.032 : -0.07;
      const gridXFactor = variantState.backgroundParallax === 'soft' ? 0.004 : 0.009;
      const gridYFactor = variantState.backgroundParallax === 'soft' ? -0.012 : -0.026;

      const glowPrimary = document.getElementById('bg-glow-primary') as HTMLElement | null;
      const glowSecondary = document.getElementById('bg-glow-secondary') as HTMLElement | null;
      const gridLayer = document.getElementById('bg-grid-layer') as HTMLElement | null;
      if (glowPrimary) glowPrimary.style.transform = `translateY(${scrollY * primaryFactor}px)`;
      if (glowSecondary) glowSecondary.style.transform = `translateY(${scrollY * secondaryFactor}px)`;
      if (gridLayer) gridLayer.style.transform = `translate(${scrollY * gridXFactor}px, ${scrollY * gridYFactor}px)`;
    };

    const onScroll = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      const glowPrimary = document.getElementById('bg-glow-primary') as HTMLElement | null;
      const glowSecondary = document.getElementById('bg-glow-secondary') as HTMLElement | null;
      const gridLayer = document.getElementById('bg-grid-layer') as HTMLElement | null;
      if (glowPrimary) glowPrimary.style.transform = '';
      if (glowSecondary) glowSecondary.style.transform = '';
      if (gridLayer) gridLayer.style.transform = '';
    };
  }, [variantState.backgroundParallax]);

  const value = useMemo<VariantPanelContextValue>(
    () => ({
      variantState,
      updateVariant: (key, value) => {
        setVariantState((current) => ({
          ...current,
          [key]: value,
        }));
      },
      resetVariants: () => {
        setVariantState(DEFAULT_VARIANT_STATE);
      },
      isPanelOpen,
      setIsPanelOpen,
    }),
    [variantState, isPanelOpen],
  );

  return <VariantPanelContext.Provider value={value}>{children}</VariantPanelContext.Provider>;
}

export function useVariantPanel() {
  const context = useContext(VariantPanelContext);

  if (!context) {
    throw new Error('useVariantPanel must be used within VariantPanelProvider');
  }

  return context;
}
