import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { CreateHabilityRequest, UpdateHabilityRequest, HabilityBullet } from '../../../types/hability';
import { TECH_KEYS, findTechKey } from '../../../icons/tech.data';
import { TechIcon } from '../../../icons/TechIcon';

type HabilityFormData = CreateHabilityRequest | UpdateHabilityRequest;

type Props = {
  form: HabilityFormData;
  setForm: Dispatch<SetStateAction<HabilityFormData>>;
  isEditing: boolean;
  lang?: 'pt' | 'en';
};

const HabilityForm = ({ form: f, setForm: setF, lang }: Props): ReactElement => {
  const addBullet = () => setF({ ...f, bullets: [...(f.bullets ?? []), { text: '', badge: '' }] });
  const updateBullet = (idx: number, changes: Partial<HabilityBullet>) => {
    const next = (f.bullets ?? []).map((b, i) => (i === idx ? { ...b, ...changes } : b));
    setF({ ...f, bullets: next });
  };
  const removeBullet = (idx: number) => {
    const next = (f.bullets ?? []).filter((_, i) => i !== idx);
    setF({ ...f, bullets: next });
  };

  return (
    <>
      <label className="text-sm" htmlFor="hability">Habilidade</label>
      <input id="hability" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.hability} onChange={(e) => setF({ ...f, hability: e.target.value })} />
      <div className="flex items-center justify-between mt-2">
        <h3 className="text-sm font-semibold">Bullets</h3>
        <button type="button" className="text-sm underline" onClick={addBullet}>Adicionar bullet</button>
      </div>
      <div className="space-y-3">
        {(f.bullets ?? []).map((b, idx) => (
          <div key={idx} className="rounded border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">Bullet #{idx + 1}</span>
              <button type="button" className="text-xs underline" onClick={() => removeBullet(idx)}>Remover</button>
            </div>
            <input id={`hb-text-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={b.text} onChange={(e) => updateBullet(idx, { text: e.target.value })} />
            <label className="flex text-sm" htmlFor={`hb-badge-${idx}`}>Badge (tecnologia)</label>
            <div className="flex items-center gap-2">
              <input list={`tech-badges`} id={`hb-badge-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={b.badge ?? ''} onChange={(e) => updateBullet(idx, { badge: e.target.value })} disabled={lang === 'en'} />
              {(() => { const key = b.badge ? findTechKey(b.badge) : null; return key ? <TechIcon name={key} className="text-stone-700 dark:text-stone-300" /> : null; })()}
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

export default HabilityForm;


