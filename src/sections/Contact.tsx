import Button from '../components/ui/Button';
import { profile } from '../data/profile';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2 className="mb-6 text-2xl font-bold text-stone-900">Contato</h2>
      <div className="flex flex-col gap-3 text-stone-700">
        <p>
          Email: <a className="text-beige-700 hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p>
          LinkedIn: <a className="text-beige-700 hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin}</a>
        </p>
        <div className="pt-2 flex gap-3">
          <a href={`mailto:${profile.email}`}>
            <Button>Falar por Email</Button>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Button variant="ghost">LinkedIn</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;


