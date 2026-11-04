import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Projects } from './components/Projects';
import { Impact } from './components/Impact';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { useLang } from './i18n/lang';
import { useReveal } from './motion/useReveal';
import { useSpotlight } from './motion/useSpotlight';

export default function App() {
  const { lang } = useLang();
  useReveal(lang);
  useSpotlight();
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <Hero />
      <main>
        <Work />
        <Projects />
        <Impact />
        <About />
      </main>
      <Footer />
    </>
  );
}
