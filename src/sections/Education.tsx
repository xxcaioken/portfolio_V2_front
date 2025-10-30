import Card from '../components/ui/Card';
import { profile } from '../data/profile';

const Education = () => {
  return (
    <section id="education" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900 dark:text-stone-100">Educação, Certificações e Idiomas</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card title="Educação">
          <ul className="list-disc pl-5 space-y-1">
            {profile.education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Card>
        <Card title="Certificações">
          <ul className="list-disc pl-5 space-y-1">
            {profile.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Card>
        <Card title="Idiomas" className="sm:col-span-2">
          <ul className="list-disc pl-5 space-y-1">
            {profile.languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

export default Education;


