import { useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { aboutApi } from '../../../lib/about';
import type { SocialLink, UpdateAboutRequest } from '../../../types/about';
import { TECH_KEYS } from '../../../icons/tech.data';
import type { AboutResponse } from '../../../types/about';
import { resolveApiUrl } from '../../../lib/api';

const empty: UpdateAboutRequest = {
  name: '', title: '', summary: '', location: '', phone: '', email: '', linkedin: '', github: '', avatarUrl: '', footerNote: '', socials: [],
};

const AboutSection = (): ReactElement => {
  const [form, setForm] = useState<UpdateAboutRequest>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const data = await aboutApi.get();
        setForm({ ...empty, ...data });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar');
      } finally { setLoading(false); }
    };
    void load();
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target; setForm(prev => ({ ...prev, [id]: value }));
  };

  const addSocial = () => setForm(prev => ({ ...prev, socials: [...(prev.socials ?? []), { label: '', url: '', iconKey: '' }] }));
  const updateSocial = (idx: number, changes: Partial<SocialLink>) => setForm(prev => ({ ...prev, socials: prev.socials.map((s, i) => i === idx ? { ...s, ...changes } : s) }));
  const removeSocial = (idx: number) => setForm(prev => ({ ...prev, socials: prev.socials.filter((_, i) => i !== idx) }));

  const uploadAvatar = async (file: File) => {
    const data: AboutResponse = await aboutApi.uploadAvatar(file);
    setForm(prev => ({ ...prev, ...data }));
  };

  const onSubmit = async () => {
    setLoading(true); setError(null);
    try { await aboutApi.update(form); } catch (e) { setError(e instanceof Error ? e.message : 'Erro ao salvar'); } finally { setLoading(false); }
  };

  return (
    <Card title="Sobre mim">
      {error && <p className="text-sm text-red-600 mb-2" role="alert">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <label className="text-sm" htmlFor="name">Nome</label>
          <input id="name" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.name} onChange={onChange} />
          <label className="text-sm" htmlFor="title">Título</label>
          <input id="title" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.title} onChange={onChange} />
          <label className="text-sm" htmlFor="summary">Resumo</label>
          <textarea id="summary" rows={5} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.summary} onChange={onChange} />
          <label className="text-sm" htmlFor="location">Localização</label>
          <input id="location" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.location} onChange={onChange} />
          <label className="text-sm" htmlFor="phone">Telefone</label>
          <input id="phone" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.phone} onChange={onChange} />
          <label className="text-sm" htmlFor="email">Email</label>
          <input id="email" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.email} onChange={onChange} />
          <label className="text-sm" htmlFor="linkedin">LinkedIn</label>
          <input id="linkedin" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.linkedin} onChange={onChange} />
          <label className="text-sm" htmlFor="github">GitHub</label>
          <input id="github" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.github ?? ''} onChange={onChange} />
          <label className="text-sm" htmlFor="footerNote">Rodapé</label>
          <input id="footerNote" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={form.footerNote ?? ''} onChange={onChange} />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm">Avatar</label>
          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadAvatar(f); }} />
          {form.avatarUrl ? <img src={resolveApiUrl(form.avatarUrl)} alt="Avatar" className="h-24 w-24 rounded-full object-cover" /> : null}
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-sm font-semibold">Links sociais</h3>
            <button type="button" className="text-sm underline" onClick={addSocial}>Adicionar</button>
          </div>
          <div className="space-y-3">
            {(form.socials ?? []).map((s, idx) => (
              <div key={idx} className="rounded border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">Link #{idx + 1}</span>
                  <button type="button" className="text-xs underline" onClick={() => removeSocial(idx)}>Remover</button>
                </div>
                <label className="text-sm" htmlFor={`sl-label-${idx}`}>Rótulo</label>
                <input id={`sl-label-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={s.label} onChange={(e) => updateSocial(idx, { label: e.target.value })} />
                <label className="text-sm" htmlFor={`sl-url-${idx}`}>URL</label>
                <input id={`sl-url-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={s.url} onChange={(e) => updateSocial(idx, { url: e.target.value })} />
                <label className="text-sm" htmlFor={`sl-icon-${idx}`}>Ícone</label>
                <input list="tech-badges" id={`sl-icon-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={s.iconKey ?? ''} onChange={(e) => updateSocial(idx, { iconKey: e.target.value })} />
              </div>
            ))}
          </div>
          <datalist id="tech-badges">
            {TECH_KEYS.map(k => (<option key={k} value={k} />))}
          </datalist>
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={onSubmit} disabled={loading}>Salvar</Button>
      </div>
    </Card>
  );
};

export default AboutSection;


