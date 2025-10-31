import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { CreateHabilityRequest, UpdateHabilityRequest } from '../../../types/hability';

type HabilityFormData = CreateHabilityRequest | UpdateHabilityRequest;

type Props = {
  form: HabilityFormData;
  setForm: Dispatch<SetStateAction<HabilityFormData>>;
  isEditing: boolean;
};

const HabilityForm = ({ form: f, setForm: setF }: Props): ReactElement => (
  <>
    <label className="text-sm" htmlFor="hability">Habilidade</label>
    <input id="hability" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.hability} onChange={(e) => setF({ ...f, hability: e.target.value })} />
    <label className="text-sm" htmlFor="badge">Badge</label>
    <input id="badge" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.badge} onChange={(e) => setF({ ...f, badge: e.target.value })} />
    <label className="text-sm" htmlFor="bulletsH">Pontos (um por linha)</label>
    <textarea id="bulletsH" rows={6} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={(f.bullets ?? []).join('\n')} onChange={(e) => setF({ ...f, bullets: e.target.value.split('\n') })} />
  </>
);

export default HabilityForm;


