import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Projects } from './components/Projects';
import { Impact } from './components/Impact';
import { About } from './components/About';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
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
