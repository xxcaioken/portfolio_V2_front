import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { profile } from '../data/profile';
import { useI18n } from '../i18n';
import { useInView } from '../lib/useInView';

const Contact = () => {
  const { t } = useI18n();
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      id="contact"
      className="section transition-[opacity,transform] duration-500 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <SectionHeading title={t('nav.contact')} />
      <div className="flex flex-col gap-4 text-stone-700 dark:text-stone-300">
        <p>
          Email:{' '}
          <a className="text-beige-700 hover:underline dark:text-beige-400" href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p>
          LinkedIn:{' '}
          <a className="text-beige-700 hover:underline dark:text-beige-400" href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin}</a>
        </p>
        <div className="pt-2 flex gap-3">
          <a href={`mailto:${profile.email}`}>
            <Button>Falar por Email</Button>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost">LinkedIn →</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
