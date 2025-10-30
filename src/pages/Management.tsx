import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { clearAuthenticated } from '../auth/storage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { experiencesApi } from '../lib/experiences';
import type { CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest } from '../types/experience';

const Management = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<ExperienceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateExperienceRequest>({ company: '', role: '', period: '', bullets: [] });

  const logout = () => {
    clearAuthenticated();
    navigate('/login', { replace: true });
  }

  const loadExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await experiencesApi.list();
      console.log(data);
      const arr = Array.isArray(data) ? data : [];
      setExperiences(arr.map((e) => ({ ...e, bullets: e.bullets ?? [] })));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar experiências');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadExperiences(); }, []);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ company: '', role: '', period: '', bullets: [] });
  }

  const setFormFromModel = (model: ExperienceResponse) => {
    setEditingId(model.id);
    setForm({
      company: model.company,
      role: model.role,
      period: model.period,
      bullets: model.bullets ?? [],
    });
  }

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload: CreateExperienceRequest | UpdateExperienceRequest = {
        company: form.company.trim(),
        role: form.role.trim(),
        period: form.period.trim(),
        bullets: (form.bullets ?? []).map(b => b.trim()).filter(Boolean),
      };
      if (isEditing && editingId) {
        await experiencesApi.update(editingId, payload);
      } else {
        await experiencesApi.create(payload);
      }
      await loadExperiences();
      resetForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Confirma excluir este item?')) return;
    setLoading(true);
    setError(null);
    try {
      await experiencesApi.delete(id);
      await loadExperiences();
      if (editingId === id) resetForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao excluir');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Management</h1>
          <Button onClick={logout} variant="ghost">Sair</Button>
        </div>

        <Card title="Experiências">
          {error && <p className="text-sm text-red-600 mb-2" role="alert">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold mb-2">{isEditing ? 'Editar experiência' : 'Nova experiência'}</h2>
              <div className="flex flex-col gap-3">
                <label className="text-sm" htmlFor="company">Empresa</label>
                <input id="company" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />

                <label className="text-sm" htmlFor="role">Cargo</label>
                <input id="role" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />

                <label className="text-sm" htmlFor="period">Período</label>
                <input id="period" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />

                <label className="text-sm" htmlFor="bullets">Pontos (um por linha)</label>
                <textarea id="bullets" rows={6} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.bullets.join('\n')} onChange={(e) => setForm({ ...form, bullets: e.target.value.split('\n') })} />

                <div className="flex gap-2">
                  <Button onClick={onSubmit} disabled={loading}>{isEditing ? 'Salvar' : 'Adicionar'}</Button>
                  {isEditing && <Button onClick={resetForm} variant="ghost">Cancelar</Button>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Lista</h2>
              {loading ? (
                <p className="text-sm">Carregando...</p>
              ) : (
                <ul className="space-y-2">
                  {(experiences??[]).map((e) => (
                    <li key={e.id} className="rounded border p-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{e.company} — {e.role}</p>
                        <p className="text-xs text-stone-600 dark:text-stone-400">{e.period}</p>
                        {(e.bullets?.length ?? 0) > 0 && (
                          <ul className="list-disc ml-5 mt-1 text-sm">
                            {(e.bullets ?? []).map((b, idx) => (<li key={idx}>{b}</li>))}
                          </ul>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setFormFromModel(e)} variant="ghost">Editar</Button>
                        <Button onClick={() => { void onDelete(e.id); }} variant="ghost">Excluir</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Management;
