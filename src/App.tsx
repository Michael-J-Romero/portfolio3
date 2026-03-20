import styles from './components/AppShell/AppShell.module.scss';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar/Navbar';
import DeveloperPanel from './components/DeveloperPanel/DeveloperPanel';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import InteractiveWork from './components/InteractiveWork/InteractiveWork';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <div id="bg-glow-primary" aria-hidden="true" />
      <div id="bg-glow-secondary" aria-hidden="true" />
      <div id="bg-grid-layer" aria-hidden="true" />
      <div className={styles.appShell}>
      <Navbar />
      <DeveloperPanel />
      <main>
        <Hero />
        <About />
        <Projects />
        <InteractiveWork />
        <Skills />
        <Contact />
      </main>
      <Footer />
      </div>
    </>
  );
}
