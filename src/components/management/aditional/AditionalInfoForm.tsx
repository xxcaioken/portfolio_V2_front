import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { CreateAditionalInfoRequest, UpdateAditionalInfoRequest } from '../../../types/aditionalInfo';

type FormData = CreateAditionalInfoRequest | UpdateAditionalInfoRequest;

type Props = {
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>;
  isEditing: boolean;
};

const AditionalInfoForm = ({ form: f, setForm: setF }: Props): ReactElement => (
  <>
    <label className="text-sm" htmlFor="aditionalInfo">Informação</label>
    <input id="aditionalInfo" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.aditionalInfo} onChange={(e) => setF({ ...f, aditionalInfo: e.target.value })} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="startDate">Início</label>
        <input id="startDate" type="date" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.startDate} onChange={(e) => setF({ ...f, startDate: e.target.value })} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="endDate">Fim</label>
        <input id="endDate" type="date" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.endDate ?? ''} onChange={(e) => setF({ ...f, endDate: e.target.value || null })} />
        <label className="mt-1 inline-flex items-center gap-2 text-xs">
          <input type="checkbox" checked={!f.endDate} onChange={(e) => setF({ ...f, endDate: e.target.checked ? null : f.startDate })} />
          Atual
        </label>
      </div>
    </div>

    <label className="text-sm" htmlFor="level">Nível</label>
    <input id="level" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.level} onChange={(e) => setF({ ...f, level: e.target.value })} />

    <label className="text-sm" htmlFor="bulletsAI">Pontos (um por linha)</label>
    <textarea id="bulletsAI" rows={6} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={(f.bullets ?? []).join('\n')} onChange={(e) => setF({ ...f, bullets: e.target.value.split('\n') })} />
  </>
);

export default AditionalInfoForm;


