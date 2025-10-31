import Button from '../components/ui/Button';
import { clearAuthenticated } from '../auth/storage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CrudCard } from '../components/management/CrudCard';
import { experiencesApi } from '../lib/experiences';
import { habilitiesApi } from '../lib/habilities';
import { aditionalInfosApi } from '../lib/aditionalInfos';
import { keyTasksApi } from '../lib/keytasks';
import type { CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest } from '../types/experience';
import type { CreateHabilityRequest, HabilityResponse, UpdateHabilityRequest } from '../types/hability';
import type { AditionalInfoResponse, CreateAditionalInfoRequest, UpdateAditionalInfoRequest } from '../types/aditionalInfo';
import type { KeyTaskResponse, CreateKeyTaskRequest, UpdateKeyTaskRequest } from '../types/keytask';
import ExperienceForm from '../components/management/experience/ExperienceForm';
import ExperienceItem from '../components/management/experience/ExperienceItem';
import HabilityForm from '../components/management/hability/HabilityForm';
import HabilityItem from '../components/management/hability/HabilityItem';
import AditionalInfoForm from '../components/management/aditional/AditionalInfoForm';
import AditionalInfoItem from '../components/management/aditional/AditionalInfoItem';
import KeyTaskForm from '../components/management/keytask/KeyTaskForm';
import KeyTaskItem from '../components/management/keytask/KeyTaskItem';
import AboutSection from '../components/management/about/AboutSection';
import { FiArrowLeft } from 'react-icons/fi';
import { useI18n } from '../i18n';

const Management = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [section, setSection] = useState<'experience' | 'hability' | 'aditional' | 'keytask' | 'about'>('about');
  const logout = () => {
    clearAuthenticated();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen px-6 py-8">      
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span>
            <Button className="cursor-pointer " onClick={() => navigate('/')} variant="ghost" aria-label={t('common.back')}><FiArrowLeft /></Button>
          </span>
          <h1 className="text-2xl font-bold">{t('mgmt.title')}</h1>
          <div className="flex items-center gap-2">
            <Button onClick={logout} variant="ghost">{t('auth.logout')}</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <section className="md:col-span-3">
            {(() => {
              switch (section) {
                case 'about':
                  return <AboutSection />;
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
                      initialForm={{ hability: '', bullets: [] }}
                      getId={(it) => it.id}
                      setFormFromItem={(it) => ({ hability: it.hability, bullets: it.bullets ?? [] })}
                      renderForm={(f, setF) => (<HabilityForm form={f} setForm={setF} isEditing={false} />)}
                      renderItem={(e) => (<HabilityItem item={e} />)}
                    />
                  );
                case 'aditional':
                  return (
                    <CrudCard<AditionalInfoResponse, CreateAditionalInfoRequest | UpdateAditionalInfoRequest>
                      title="Informações Adicionais"
                      fetchList={async () => {
                        const data = await aditionalInfosApi.list();
                        return (Array.isArray(data) ? data : []).map(e => ({ ...e, bullets: e.bullets ?? [] }));
                      }}
                      createItem={(body) => aditionalInfosApi.create(body)}
                      updateItem={(id, body) => aditionalInfosApi.update(id, body)}
                      deleteItem={(id) => aditionalInfosApi.delete(id)}
                      initialForm={{ aditionalInfo: '', bullets: [] }}
                      getId={(it) => it.id}
                      setFormFromItem={(it) => ({ aditionalInfo: it.aditionalInfo, bullets: it.bullets ?? [] })}
                      renderForm={(f, setF) => (<AditionalInfoForm form={f} setForm={setF} isEditing={false} />)}
                      renderItem={(e) => (<AditionalInfoItem item={e} />)}
                    />
                  );
                case 'keytask':
                  return (
                    <CrudCard<KeyTaskResponse, CreateKeyTaskRequest | UpdateKeyTaskRequest>
                      title="Key Tasks"
                      fetchList={async () => {
                        const data = await keyTasksApi.list();
                        return Array.isArray(data) ? data : [];
                      }}
                      createItem={(body) => keyTasksApi.create(body)}
                      updateItem={(id, body) => keyTasksApi.update(id, body)}
                      deleteItem={(id) => keyTasksApi.delete(id)}
                      initialForm={{ keyTask: '', description: '', technologies: [] }}
                      getId={(it) => it.id}
                      setFormFromItem={(it) => ({ keyTask: it.keyTask, description: it.description, technologies: it.technologies ?? [] })}
                      renderForm={(f, setF) => (<KeyTaskForm form={f} setForm={setF} isEditing={false} />)}
                      renderItem={(e) => (<KeyTaskItem item={e} />)}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </section>
          <aside className="md:col-span-1">
            <nav className="flex md:flex-col gap-2" aria-label="Seleção de seção">
              <button type="button" className={`rounded border px-3 py-2 text-sm ${section === 'about' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-white dark:bg-stone-900/70'}`} onClick={() => setSection('about')}>
                {t('about.me') || 'Sobre mim'}
              </button>
              <button type="button" className={`rounded border px-3 py-2 text-sm ${section === 'experience' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-white dark:bg-stone-900/70'}`} onClick={() => setSection('experience')}>
                {t('nav.experience')}
              </button>
              <button type="button" className={`rounded border px-3 py-2 text-sm ${section === 'hability' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-white dark:bg-stone-900/70'}`} onClick={() => setSection('hability')}>
                {t('nav.skills')}
              </button>
              <button type="button" className={`rounded border px-3 py-2 text-sm ${section === 'aditional' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-white dark:bg-stone-900/70'}`} onClick={() => setSection('aditional')}>
                {t('nav.aditional') || 'Info Adicionais'}
              </button>
              <button type="button" className={`rounded border px-3 py-2 text-sm ${section === 'keytask' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-white dark:bg-stone-900/70'}`} onClick={() => setSection('keytask')}>
                {t('nav.projects')}
              </button>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Management;
