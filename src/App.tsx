import { Hero } from './components/Hero';
import { Impact } from './components/Impact';
import { SystemsAtlas } from './components/SystemsAtlas';
import { Products } from './components/Products';
import { About } from './components/About';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Impact />
        <SystemsAtlas />
        <Products />
        <About />
      </main>
      <Footer />
    </>
  );
}
