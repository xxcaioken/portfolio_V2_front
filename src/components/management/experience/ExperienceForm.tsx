import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { CreateExperienceRequest, UpdateExperienceRequest } from '../../../types/experience';

type ExperienceFormData = CreateExperienceRequest | UpdateExperienceRequest;

type Props = {
  form: ExperienceFormData;
  setForm: Dispatch<SetStateAction<ExperienceFormData>>;
  isEditing: boolean;
  lang?: 'pt' | 'en';
};

const ExperienceForm = ({ form: f, setForm: setF, lang }: Props): ReactElement => {
  const addBullet = () => setF({ ...f, bullets: [...(f.bullets ?? []), ''] });
  const updateBullet = (idx: number, text: string) => {
    const next = (f.bullets ?? []).map((b, i) => (i === idx ? text : b));
    setF({ ...f, bullets: next });
  };
  const removeBullet = (idx: number) => {
    const next = (f.bullets ?? []).filter((_, i) => i !== idx);
    setF({ ...f, bullets: next });
  };

  return (
    <>
      <label className="text-sm" htmlFor="company">Empresa</label>
      <input id="company" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} />
      <label className="text-sm" htmlFor="role">Cargo</label>
      <input id="role" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="startDate">Início</label>
          <input id="startDate" type="date" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.startDate} onChange={(e) => setF({ ...f, startDate: e.target.value })} disabled={lang === 'en'} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="endDate">Fim</label>
          <input id="endDate" type="date" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.endDate ?? ''} onChange={(e) => setF({ ...f, endDate: e.target.value || null })} disabled={lang === 'en'} />
          <label className="mt-1 inline-flex items-center gap-2 text-xs">
            <input type="checkbox" checked={!f.endDate} onChange={(e) => setF({ ...f, endDate: e.target.checked ? null : f.startDate })} disabled={lang === 'en'} />
            Atual
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <h3 className="text-sm font-semibold">Pontos</h3>
        <button type="button" className="text-sm underline" onClick={addBullet}>Adicionar ponto</button>
      </div>
      <div className="space-y-3">
        {(f.bullets ?? []).map((text, idx) => (
          <div key={idx} className="rounded border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">Ponto #{idx + 1}</span>
              <button type="button" className="text-xs underline" onClick={() => removeBullet(idx)}>Remover</button>
            </div>
            <input id={`exp-bullet-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={text} onChange={(e) => updateBullet(idx, e.target.value)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ExperienceForm;


