import allContent from '../../content/allContent';
import { useVariantPanel } from '../../variants';
import styles from './Footer.module.scss';

export default function Footer() {
  const { variantState } = useVariantPanel();
  const footerContent = allContent.closing.footer;
  const hasFootline = Boolean(footerContent.footline?.trim());

  return (
    <footer className={styles.footer} data-tone={variantState.contactFooter}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <p className={styles.name}>{footerContent.name}</p>
          <p className={styles.roles}>{footerContent.roles}</p>
          <p className={styles.copy}>{footerContent.description}</p>
          <a href={footerContent.email.href} className={styles.emailLink}>{footerContent.email.label}</a>
        </div>

        <div className={styles.links}>
          {footerContent.links.map((link) => (
            <a key={`${link.label}-${link.href}`} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={styles.link}>{link.label}</a>
          ))}
        </div>
      </div>

      {hasFootline ? (
        <div className={styles.footline}>
          <p>{footerContent.footline}</p>
        </div>
      ) : null}
    </footer>
  );
}
