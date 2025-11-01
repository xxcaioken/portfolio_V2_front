import { useEffect, useMemo, useState, useCallback, type Dispatch, type SetStateAction, type ReactElement } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

type AsyncFn<TArgs extends unknown[] = [], TReturn = unknown> = (...args: TArgs) => Promise<TReturn>;

type CrudCardProps<TItem, TForm> = {
  title: string;
  fetchList: AsyncFn<[('pt' | 'en')?], TItem[]>;
  createItem: AsyncFn<[TForm, ('pt' | 'en')?]>;
  updateItem: AsyncFn<[string, TForm, ('pt' | 'en')?]>;
  deleteItem: AsyncFn<[string]>;
  initialForm: TForm;
  getId: (item: TItem) => string;
  setFormFromItem: (item: TItem) => TForm;
  renderItem: (item: TItem, helpers: { onEdit: () => void; onDelete: () => void }) => ReactElement;
  renderForm: (form: TForm, setForm: Dispatch<SetStateAction<TForm>>, isEditing: boolean, lang: 'pt' | 'en') => ReactElement;
  enableLangSelect?: boolean;
};

export function CrudCard<TItem, TForm>({
  title,
  fetchList,
  createItem,
  updateItem,
  deleteItem,
  initialForm,
  getId,
  setFormFromItem,
  renderItem,
  renderForm,
  enableLangSelect = true,
}: CrudCardProps<TItem, TForm>) {
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TForm>(initialForm);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchList(lang);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar');
    } finally {
      setLoading(false);
    }
  }, [fetchList, lang]);

  useEffect(() => { void load(); }, [load]);

  // When language or items change while editing, refresh the form with localized data
  useEffect(() => {
    if (!editingId) return;
    const it = items.find(i => getId(i) === editingId);
    if (it) setForm(setFormFromItem(it));
  }, [editingId, items, lang, setFormFromItem, getId]);

  function resetForm() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function onSubmit() {
    setLoading(true);
    setError(null);
    try {
      if (isEditing && editingId) {
        await updateItem(editingId, form, lang);
      } else {
        await createItem(form, lang);
      }
      await load();
      resetForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Confirma excluir este item?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteItem(id);
      await load();
      if (editingId === id) resetForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao excluir');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title={title}>
      {error && <p className="text-sm text-red-600 mb-2" role="alert">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-beige-50 rounded-md p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">{isEditing ? 'Editar' : 'Novo'}</h2>
            {enableLangSelect && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500">Lang</span>
                <button type="button" className={`rounded px-2 py-1 ${lang === 'pt' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-transparent'}`} onClick={() => setLang('pt')}>PT</button>
                <button type="button" className={`rounded px-2 py-1 ${lang === 'en' ? 'bg-beige-200/60 dark:bg-stone-800/60' : 'bg-transparent'}`} onClick={() => setLang('en')}>EN</button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {renderForm(form, setForm, isEditing, lang)}
            <div className="flex gap-2">
              <Button onClick={onSubmit} disabled={loading || (!isEditing && lang === 'en')}>{isEditing ? 'Salvar' : 'Adicionar'}</Button>
              {isEditing && <Button onClick={resetForm} variant="ghost">Cancelar</Button>}
            </div>
            {!isEditing && lang === 'en' ? (
              <p className="text-xs text-stone-500">Criação apenas no idioma base (PT). Para adicionar versão EN, selecione um item da lista e edite com EN.</p>
            ) : null}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Lista</h2>
            {enableLangSelect && (
              <div className="text-xs text-stone-500">{lang.toUpperCase()}</div>
            )}
          </div>
          {loading ? (
            <p className="text-sm">Carregando...</p>
          ) : (
            <ul className="space-y-2">
              {items.map((it) => {
                const id = getId(it);
                return (
                  <li key={id} className="rounded border p-3 flex items-start justify-between gap-3">
                    <div>{renderItem(it, { onEdit: () => { setEditingId(id); setForm(setFormFromItem(it)); }, onDelete: () => { void onDelete(id); } })}</div>
                    <div className="flex gap-2">
                      <Button onClick={() => { setEditingId(id); setForm(setFormFromItem(it)); }} variant="ghost">Editar</Button>
                      <Button onClick={() => { void onDelete(id); }} variant="ghost">Excluir</Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}

export default CrudCard;


