import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import RecommendationLetters from './sections/RecommendationLetter';
import Testimonials from './sections/Testimonials';

const App = () => {
  return (
    <div className="min-h-screen">
      <a
        href="#conteudo-principal"
        className="fixed left-2 top-2 z-50 -translate-y-16 rounded bg-beige-700 px-3 py-2 text-sm font-medium text-white shadow transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-beige-400 dark:bg-beige-600 dark:focus:ring-beige-500"
      >
        Pular para conteúdo
      </a>
      <Header />
      <main id="conteudo-principal" role="main">
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Testimonials />
        <RecommendationLetters />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
