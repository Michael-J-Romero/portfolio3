import { Github, Linkedin, Twitter } from 'lucide-react';
import styles from './Footer.module.scss';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          &copy; {year} Your Name. All rights reserved.
        </p>

        <div className={styles.links}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="Twitter / X"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
