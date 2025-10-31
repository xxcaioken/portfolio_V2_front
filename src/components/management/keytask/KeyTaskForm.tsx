import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { CreateKeyTaskRequest, UpdateKeyTaskRequest, KeyTaskTechnology } from '../../../types/keytask';
import { TECH_KEYS, findTechKey } from '../../../icons/tech.data';
import { TechIcon } from '../../../icons/TechIcon';

type FormData = CreateKeyTaskRequest | UpdateKeyTaskRequest;

type Props = {
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>;
  isEditing: boolean;
};

const KeyTaskForm = ({ form: f, setForm: setF }: Props): ReactElement => {
  const addTech = () => setF({ ...f, technologies: [...(f.technologies ?? []), { technology: '', technologyBadge: '' }] });
  const updateTech = (idx: number, changes: Partial<KeyTaskTechnology>) => {
    const next = (f.technologies ?? []).map((t, i) => (i === idx ? { ...t, ...changes } : t));
    setF({ ...f, technologies: next });
  };
  const removeTech = (idx: number) => {
    const next = (f.technologies ?? []).filter((_, i) => i !== idx);
    setF({ ...f, technologies: next });
  };

  return (
    <>
      <label className="text-sm" htmlFor="keytask">Tarefa/Chave</label>
      <input id="keytask" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.keyTask} onChange={(e) => setF({ ...f, keyTask: e.target.value })} />
      <label className="text-sm" htmlFor="desc">Descrição</label>
      <textarea id="desc" rows={4} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />

      <div className="flex items-center justify-between mt-2">
        <h3 className="text-sm font-semibold">Tecnologias</h3>
        <button type="button" className="text-sm underline" onClick={addTech}>Adicionar tecnologia</button>
      </div>
      <div className="space-y-3">
        {(f.technologies ?? []).map((t, idx) => (
          <div key={idx} className="rounded border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">Tech #{idx + 1}</span>
              <button type="button" className="text-xs underline" onClick={() => removeTech(idx)}>Remover</button>
            </div>
            <label className="text-sm" htmlFor={`tech-${idx}`}>Tecnologia</label>
            <input id={`tech-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={t.technology} onChange={(e) => updateTech(idx, { technology: e.target.value })} />
            <label className="flex text-sm" htmlFor={`badge-${idx}`}>Badge</label>
            <div className="flex items-center gap-2">
              <input list={`tech-badges`} id={`badge-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={t.technologyBadge ?? ''} onChange={(e) => updateTech(idx, { technologyBadge: e.target.value })} />
              {(() => { const k = t.technologyBadge ? findTechKey(t.technologyBadge) : null; return k ? <TechIcon name={k} className="text-stone-700 dark:text-stone-300" /> : null; })()}
            </div>
          </div>
        ))}
      </div>
      <datalist id="tech-badges">
        {TECH_KEYS.map(k => (<option key={k} value={k} />))}
      </datalist>
    </>
  );
};

export default KeyTaskForm;


