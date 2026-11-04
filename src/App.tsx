import { Hero } from './components/Hero';
import { TopBar } from './components/TopBar';
import { CasePage } from './components/CasePage';
import { useEffect } from 'react';
import { useHashRoute } from './routing/useHashRoute';
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
  const { hash, caseId } = useHashRoute();
  useReveal(`${lang}${caseId ?? ''}`);
  useSpotlight();

  // A case opens at its top; a section anchor scrolls once the home page has rendered.
  useEffect(() => {
    if (caseId) {
      scrollTo(0, 0);
      return;
    }
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }, [hash, caseId]);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <TopBar key={caseId ?? 'home'} />
      {caseId ? (
        <CasePage id={caseId} />
      ) : (
        <>
          <Hero />
          <main>
            <Work />
            <Projects />
            <Impact />
            <About />
          </main>
        </>
      )}
      <Footer />
    </>
  );
}
