import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { CreateExperienceRequest, UpdateExperienceRequest } from '../../../types/experience';

type ExperienceFormData = CreateExperienceRequest | UpdateExperienceRequest;

type Props = {
  form: ExperienceFormData;
  setForm: Dispatch<SetStateAction<ExperienceFormData>>;
  isEditing: boolean;
};

const ExperienceForm = ({ form: f, setForm: setF }: Props): ReactElement => {
  return (
    <>
      <label className="text-sm" htmlFor="company">Empresa</label>
      <input id="company" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} />
      <label className="text-sm" htmlFor="role">Cargo</label>
      <input id="role" className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} />
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
      <label className="text-sm" htmlFor="bullets">Pontos (um por linha)</label>
      <textarea id="bullets" rows={6} className="rounded-md border px-3 py-2 text-sm dark:bg-stone-900/70" value={(f.bullets ?? []).join('\n')} onChange={(e) => setF({ ...f, bullets: e.target.value.split('\n') })} />
    </>
  );
};

export default ExperienceForm;


