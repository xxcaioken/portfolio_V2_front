import Card from '../components/ui/Card';
import { profile } from '../data/profile';

export default function Skills() {
  const s = profile.skills;
  return (
    <section id="skills" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900">Habilidades</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card title="Linguagens & Paradigmas">{s.languages}</Card>
        <Card title="Front-End">{s.frontend}</Card>
        <Card title="Back-End">{s.backend}</Card>
        <Card title="Bancos de Dados">{s.databases}</Card>
        <Card title="Ferramentas & Plataformas" className="sm:col-span-2">{s.tools}</Card>
      </div>
    </section>
  );
}


