import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { SystemsAtlas } from './components/SystemsAtlas';
import { OpenSource } from './components/OpenSource';
import { Products } from './components/Products';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { useMotion } from './motion/useMotion';

export default function App() {
  useMotion();
  return (
    <>
      <Preloader />
      <div className="progress" aria-hidden="true" />
      <Hero />
      <main>
        <Metrics />
        <SystemsAtlas />
        <OpenSource />
        <Products />
        <About />
      </main>
      <Footer />
    </>
  );
}
