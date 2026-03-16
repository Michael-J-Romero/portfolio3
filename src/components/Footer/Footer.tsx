import styles from './Footer.module.scss';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>Michael Romero</p>

        <div className={styles.links}>
          <a href="mailto:your-email@example.com" className={styles.link}>Email</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
        </div>
      </div>

      <div className={styles.footline}>
        <p>Built with React, TypeScript, and custom motion. © {year}</p>
      </div>
    </footer>
  );
}
