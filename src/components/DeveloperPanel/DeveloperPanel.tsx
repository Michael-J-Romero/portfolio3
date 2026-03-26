import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import allSettings from '../../content/allSettings';
import { stringifyAllSettings, stringifyResolvedAllContent } from '../../content/resolvedContent';
import { DEV_PANEL_SHORTCUT_LABEL, VARIANT_CONTROLS, useVariantPanel } from '../../variants';
import type { VariantState } from '../../variants';
import type { DeveloperPanelTabId } from '../../variants/config/types';
import styles from './DeveloperPanel.module.scss';

const DEFAULT_PANEL_TABS: Array<{ id: DeveloperPanelTabId; label: string }> = [
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

const DEFAULT_PANEL_SECTION_LABELS: Record<DeveloperPanelTabId, string> = {
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
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const panelSettings = allSettings.developerPanel ?? {};
  const panelTabs = (panelSettings.tabs as Array<{ id: DeveloperPanelTabId; label: string }> | undefined)
    ?? DEFAULT_PANEL_TABS;
  const panelSectionLabels = (panelSettings.sectionLabels as Record<DeveloperPanelTabId, string> | undefined)
    ?? DEFAULT_PANEL_SECTION_LABELS;
  const shortcutLabel = panelSettings.shortcutLabel ?? DEV_PANEL_SHORTCUT_LABEL;

  const visibleControls = useMemo(
    () => VARIANT_CONTROLS.filter((control) => control.category === activeTab),
    [activeTab],
  );

  useEffect(() => {
    if (!exportStatus) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setExportStatus(null);
    }, 2400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [exportStatus]);

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

  const copyResolvedCopyJson = async () => {
    const resolvedCopy = stringifyResolvedAllContent(variantState);

    try {
      await navigator.clipboard.writeText(resolvedCopy);
      setExportStatus('Live site copy JSON copied to clipboard.');
    } catch {
      const blob = new Blob([resolvedCopy], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'allContent.json';
      link.click();
      window.URL.revokeObjectURL(url);
      setExportStatus('Clipboard was unavailable, so the live site copy JSON was downloaded instead.');
    }
  };

  const copySettingsJson = async () => {
    const settingsJson = stringifyAllSettings(variantState);

    try {
      await navigator.clipboard.writeText(settingsJson);
      setExportStatus('Live settings JSON copied to clipboard.');
    } catch {
      const blob = new Blob([settingsJson], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'allSettings.json';
      link.click();
      window.URL.revokeObjectURL(url);
      setExportStatus('Clipboard was unavailable, so the live settings JSON was downloaded instead.');
    }
  };

  return (
    <aside className={styles.panel} aria-label={panelSettings.ariaLabel ?? 'Developer prototype panel'}>
      <div className={styles.panelInner}>
        <div className={styles.header}>
          <div>
            <p className={styles.kicker}>{panelSettings.kicker ?? 'Prototype tools'}</p>
            <h2>{panelSettings.title ?? 'Developer Panel'}</h2>
          </div>
          <button type="button" className={styles.iconButton} onClick={() => setIsPanelOpen(false)} aria-label={panelSettings.closeAriaLabel ?? 'Close developer panel'}>
            <X size={16} />
          </button>
        </div>

        <p className={styles.helperText}>
          {panelSettings.helperText ?? `Toggle with ${shortcutLabel}. Variants persist in local storage so prototype choices survive reloads.`}
        </p>

        <div className={styles.tabs} role="tablist" aria-label={panelSettings.tabsAriaLabel ?? 'Developer panel categories'}>
          {panelTabs.map((tab) => (
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
              <h3>{panelSectionLabels[activeTab]}</h3>
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
          <button type="button" className={styles.exportButton} onClick={copyResolvedCopyJson}>
            Copy Live Content JSON
          </button>
          <button type="button" className={styles.exportButton} onClick={copySettingsJson}>
            Copy Live Settings JSON
          </button>
          {exportStatus ? <p className={styles.exportStatus}>{exportStatus}</p> : null}
          <button type="button" className={styles.resetButton} onClick={resetVariants}>
            {panelSettings.resetButtonLabel ?? 'Reset Variants'}
          </button>
        </div>
      </div>
    </aside>
  );
}
