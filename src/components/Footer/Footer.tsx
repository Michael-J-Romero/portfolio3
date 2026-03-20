import { useVariantPanel } from '../../variants';
import { CONTACT_COPY } from '../../variants/closing/closingContent';
import styles from './Footer.module.scss';

const year = new Date().getFullYear();

export default function Footer() {
  const { variantState } = useVariantPanel();
  const contactCopy = CONTACT_COPY[variantState.contactIntro];

  return (
    <footer className={styles.footer} data-tone={variantState.contactFooter}>
      <div className={styles.inner}>
        <p className={styles.copy}>Michael Romero</p>

        <div className={styles.links}>
          <a href="mailto:your-email@example.com" className={styles.link}>Email</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
        </div>
      </div>

      <div className={styles.footline}>
        <p>{contactCopy.footerLine} © {year}</p>
      </div>
    </footer>
  );
}
