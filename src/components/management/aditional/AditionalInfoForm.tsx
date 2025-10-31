import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { AditionalInfoBullet, CreateAditionalInfoRequest, UpdateAditionalInfoRequest } from '../../../types/aditionalInfo';

type FormData = CreateAditionalInfoRequest | UpdateAditionalInfoRequest;

type Props = {
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>;
  isEditing: boolean;
  lang?: 'pt' | 'en';
};

const AditionalInfoForm = ({ form: f, setForm: setF, lang }: Props): ReactElement => {
  const addBullet = () => setF({ ...f, bullets: [...(f.bullets ?? []), { text: '', level: '', startDate: '', endDate: '' }] });
  const updateBullet = (idx: number, changes: Partial<AditionalInfoBullet>) => {
    const next = (f.bullets ?? []).map((b, i) => (i === idx ? { ...b, ...changes } : b));
    setF({ ...f, bullets: next });
  };
  const removeBullet = (idx: number) => {
    const next = (f.bullets ?? []).filter((_, i) => i !== idx);
    setF({ ...f, bullets: next });
  };

  return (
    <>
      <label className="text-sm" htmlFor="aditionalInfo">Informação</label>
      <input id="aditionalInfo" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.aditionalInfo} onChange={(e) => setF({ ...f, aditionalInfo: e.target.value })} />

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
            <input id={`text-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={b.text} onChange={(e) => updateBullet(idx, { text: e.target.value })} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor={`start-${idx}`}>Início</label>
                <input id={`start-${idx}`} type="date" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={b.startDate ?? ''} onChange={(e) => updateBullet(idx, { startDate: e.target.value || null })} disabled={lang === 'en'} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor={`end-${idx}`}>Fim</label>
                <input id={`end-${idx}`} type="date" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={b.endDate ?? ''} onChange={(e) => updateBullet(idx, { endDate: e.target.value || null })} disabled={lang === 'en'} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor={`level-${idx}`}>Nível</label>
                <input id={`level-${idx}`} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={b.level ?? ''} onChange={(e) => updateBullet(idx, { level: e.target.value })} disabled={lang === 'en'} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AditionalInfoForm;


