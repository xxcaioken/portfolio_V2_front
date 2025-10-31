import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAbout } from '../lib/useAbout';

const Hero = () => {
  const { about } = useAbout();
  return (
    <section id="home" className="section">
      <div className="flex flex-col items-start gap-6">
        <Badge tone="sand">{about?.location || '—'}</Badge>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            {about?.name || '—'}
          </h1>
          <p className="mt-2 text-lg text-stone-700">{about?.title || ''}</p>
        </div>
        <p className="max-w-3xl text-stone-700">
          {about?.summary || ''}
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${about?.email || ''}`}>
            <Button>Contato por Email</Button>
          </a>
          {about?.linkedin ? (
            <a href={about.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost">LinkedIn</Button>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Hero;


