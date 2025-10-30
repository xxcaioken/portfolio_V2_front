import Card from '../components/ui/Card';
import { profile } from '../data/profile';

const Experience = () => {
  return (
    <section id="experience" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900">Experiência</h2>
      <div className="space-y-4">
        {profile.experience.map((exp) => (
          <Card
            key={`${exp.company}-${exp.period}`}
            title={
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span>{exp.role} · {exp.company}</span>
                <span className="text-xs font-normal text-stone-500">{exp.period}</span>
              </div>
            }
          >
            <ul className="list-disc pl-5 space-y-1">
              {exp.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Experience;


