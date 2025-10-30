import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { profile } from '../data/profile';

const Projects = () => {
  return (
    <section id="projects" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900">Projetos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {profile.projects.map((p) => (
          <Card
            key={p.name}
            title={p.name}
            footer={
              <div className="flex flex-wrap gap-2">
                {p.techs.map((t) => (
                  <Badge key={t} tone="beige">{t}</Badge>
                ))}
              </div>
            }
          >
            <p>{p.description}</p>
            {p.link ? (
              <a className="mt-3 inline-block text-sm font-medium text-beige-700 hover:underline" href={p.link} target="_blank" rel="noreferrer">
                Ver mais
              </a>
            ) : null}
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Projects;


