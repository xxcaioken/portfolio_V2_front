import { useAbout } from '../../lib/useAbout';

const Footer = () => {
  const { about } = useAbout();
  return (
    <footer className="border-t border-beige-200/60 bg-beige-50 py-10 dark:border-stone-800/60 dark:bg-stone-950" role="contentinfo">
      <div className="container-page text-sm text-stone-600 dark:text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} {about?.name || '—'}. Todos os direitos reservados.</p>
        <div className="flex items-center gap-3">
          {about?.footerNote ? <span>{about.footerNote}</span> : <span>Feito usando React + Tailwind.</span>}
        </div>
      </div>
    </footer>
  );
}

export default Footer;


