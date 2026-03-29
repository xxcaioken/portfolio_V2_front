type Props = { title: string; subtitle?: string };

const SectionHeading = ({ title, subtitle }: Props) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{title}</h2>
    <span className="mt-1.5 block h-0.5 w-10 rounded-full bg-beige-500 dark:bg-beige-400" />
    {subtitle ? <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{subtitle}</p> : null}
  </div>
);

export default SectionHeading;
