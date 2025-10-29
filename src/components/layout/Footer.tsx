export default function Footer() {
  return (
    <footer className="border-t border-beige-200/60 bg-beige-50 py-10 dark:border-stone-800/60 dark:bg-stone-950" role="contentinfo">
      <div className="container-page text-sm text-stone-600 dark:text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Caio Kormives. Todos os direitos reservados.</p>
        <p>
          Feito com <span aria-hidden="true">❤</span> usando React + Tailwind.
        </p>
      </div>
    </footer>
  );
}


