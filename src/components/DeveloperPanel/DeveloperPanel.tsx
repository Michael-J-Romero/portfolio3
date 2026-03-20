import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { DEV_PANEL_SHORTCUT_LABEL, VARIANT_CONTROLS, useVariantPanel } from '../../variants';
import type { VariantState } from '../../variants';
import type { DeveloperPanelTabId } from '../../variants/config/types';
import styles from './DeveloperPanel.module.scss';

const PANEL_TABS: Array<{ id: DeveloperPanelTabId; label: string }> = [
  { id: 'background', label: 'Background' },
  { id: 'optimization', label: 'Optimize' },
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'dialogs', label: 'Dialogs' },
  { id: 'interactive', label: 'Interactive' },
  { id: 'skills', label: 'Skills' },
  { id: 'closing', label: 'Closing' },
];

const PANEL_SECTION_LABELS: Record<DeveloperPanelTabId, string> = {
  background: 'Page Background',
  optimization: 'Optimizations',
  hero: 'Hero',
  about: 'About',
  projects: 'Featured Web Projects',
  dialogs: 'Project Dialogs',
  interactive: 'Games & Interactive Work',
  skills: 'Capabilities',
  closing: 'Contact & Footer',
};

export default function DeveloperPanel() {
  const {
    variantState,
    updateVariant,
    resetVariants,
    isPanelOpen,
    setIsPanelOpen,
  } = useVariantPanel();
  const [activeTab, setActiveTab] = useState<DeveloperPanelTabId>('background');

  const visibleControls = useMemo(
    () => VARIANT_CONTROLS.filter((control) => control.category === activeTab),
    [activeTab],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        setIsPanelOpen(!isPanelOpen);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPanelOpen, setIsPanelOpen]);

  if (!isPanelOpen) {
    return null;
  }

  return (
    <aside className={styles.panel} aria-label="Developer prototype panel">
      <div className={styles.panelInner}>
        <div className={styles.header}>
          <div>
            <p className={styles.kicker}>Prototype tools</p>
            <h2>Developer Panel</h2>
          </div>
          <button type="button" className={styles.iconButton} onClick={() => setIsPanelOpen(false)} aria-label="Close developer panel">
            <X size={16} />
          </button>
        </div>

        <p className={styles.helperText}>
          Toggle with {DEV_PANEL_SHORTCUT_LABEL}. Variants persist in local storage so prototype choices survive reloads.
        </p>

        <div className={styles.tabs} role="tablist" aria-label="Developer panel categories">
          {PANEL_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.scroller}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <SlidersHorizontal size={16} />
              <h3>{PANEL_SECTION_LABELS[activeTab]}</h3>
            </div>

            {visibleControls.map((control) => (
              <div key={control.id} className={styles.controlGroup}>
                <div className={styles.controlLabelRow}>
                  <label htmlFor={String(control.id)}>{control.label}</label>
                  <span>{control.description}</span>
                </div>
                <select
                  id={String(control.id)}
                  className={styles.select}
                  value={variantState[control.id]}
                  onChange={(event) =>
                    updateVariant(control.id, event.target.value as VariantState[typeof control.id])
                  }
                >
                  {control.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </section>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.resetButton} onClick={resetVariants}>
            Reset Variants
          </button>
        </div>
      </div>
    </aside>
  );
}
