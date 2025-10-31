import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
import { clearAuthenticated } from '../auth/storage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CrudCard } from '../components/management/CrudCard';
import { experiencesApi } from '../lib/experiences';
import { habilitiesApi } from '../lib/habilities';
import type { CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest } from '../types/experience';
import type { CreateHabilityRequest, HabilityResponse, UpdateHabilityRequest } from '../types/hability';
import ExperienceForm from '../components/management/experience/ExperienceForm';
import ExperienceItem from '../components/management/experience/ExperienceItem';
import HabilityForm from '../components/management/hability/HabilityForm';
import HabilityItem from '../components/management/hability/HabilityItem';

const Management = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState<'experience' | 'hability'>('experience');
  const logout = () => {
    clearAuthenticated();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Management</h1>
          <Button onClick={logout} variant="ghost">Sair</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <nav className="flex md:flex-col gap-2" aria-label="Seleção de seção">
              <button type="button" className={`rounded border px-3 py-2 text-sm ${section === 'experience' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-white dark:bg-stone-900/70'}`} onClick={() => setSection('experience')}>
                Experiências
              </button>
              <button type="button" className={`rounded border px-3 py-2 text-sm ${section === 'hability' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-white dark:bg-stone-900/70'}`} onClick={() => setSection('hability')}>
                Habilidades
              </button>
            </nav>
          </aside>
          <section className="md:col-span-3">
            {(() => {
              switch (section) {
                case 'experience':
                  return (
                    <CrudCard<ExperienceResponse, CreateExperienceRequest | UpdateExperienceRequest>
                title="Experiências"
                fetchList={async () => {
                  const data = await experiencesApi.list();
                  return (Array.isArray(data) ? data : []).map(e => ({ ...e, bullets: e.bullets ?? [] }));
                }}
                createItem={(body) => experiencesApi.create(body)}
                updateItem={(id, body) => experiencesApi.update(id, body)}
                deleteItem={(id) => experiencesApi.delete(id)}
                initialForm={{ company: '', role: '', startDate: '', endDate: null, bullets: [] }}
                getId={(it) => it.id}
                setFormFromItem={(it) => ({ company: it.company, role: it.role, startDate: it.startDate, endDate: it.endDate ?? null, bullets: it.bullets ?? [] })}
                renderForm={(f, setF) => (<ExperienceForm form={f} setForm={setF} isEditing={false} />)}
                renderItem={(e) => (<ExperienceItem item={e} />)}
              />
                  );
                case 'hability':
                  return (
                    <CrudCard<HabilityResponse, CreateHabilityRequest | UpdateHabilityRequest>
                      title="Habilidades"
                      fetchList={async () => {
                        const data = await habilitiesApi.list();
                        return (Array.isArray(data) ? data : []).map(e => ({ ...e, bullets: e.bullets ?? [] }));
                      }}
                      createItem={(body) => habilitiesApi.create(body)}
                      updateItem={(id, body) => habilitiesApi.update(id, body)}
                      deleteItem={(id) => habilitiesApi.delete(id)}
                      initialForm={{ hability: '', badge: '', bullets: [] }}
                      getId={(it) => it.id}
                      setFormFromItem={(it) => ({ hability: it.hability, badge: it.badge, bullets: it.bullets ?? [] })}
                      renderForm={(f, setF) => (<HabilityForm form={f} setForm={setF} isEditing={false} />)}
                      renderItem={(e) => (<HabilityItem item={e} />)}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Management;
