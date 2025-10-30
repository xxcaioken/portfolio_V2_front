import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { profile } from '../data/profile';

const Hero = () => {
  return (
    <section id="home" className="section">
      <div className="flex flex-col items-start gap-6">
        <Badge tone="sand">{profile.location}</Badge>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-stone-700">{profile.title}</p>
        </div>
        <p className="max-w-3xl text-stone-700">
          {profile.summary}
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`}>
            <Button>Contato por Email</Button>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost">LinkedIn</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;


