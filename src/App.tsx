import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { CaseStudies } from './components/CaseStudies';
import { OpenSource } from './components/OpenSource';
import { Products } from './components/Products';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();
  return (
    <>
      <Hero />
      <main>
        <Metrics />
        <CaseStudies />
        <OpenSource />
        <Products />
        <About />
      </main>
      <Footer />
    </>
  );
}
