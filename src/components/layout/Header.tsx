import ThemeToggle from '../ui/ThemeToggle';
import { useAbout } from '../../lib/useAbout';

const Header = () => {
  const { about } = useAbout();
  return (
    <header className="sticky top-0 z-40 border-b border-beige-200/60 bg-beige-50/70 backdrop-blur dark:border-stone-800/60 dark:bg-stone-950/60">
      <nav className="container-page flex h-14 items-center justify-between" role="navigation" aria-label="Navegação principal">
        <a href="#home" className="font-semibold tracking-wide text-stone-900 dark:text-stone-100">{about?.name || '—'}</a>
        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex items-center gap-4 text-sm">
            <li><a className="hover:underline" href="#skills">Habilidades</a></li>
            <li><a className="hover:underline" href="#experience">Experiência</a></li>
            <li><a className="hover:underline" href="#projects">Projetos</a></li>
            <li><a className="hover:underline" href="#contact">Contato</a></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;


