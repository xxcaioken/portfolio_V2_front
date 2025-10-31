import { useEffect, useMemo, useState, useCallback, type Dispatch, type SetStateAction, type ReactElement } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

type AsyncFn<TArgs extends unknown[] = [], TReturn = unknown> = (...args: TArgs) => Promise<TReturn>;

type CrudCardProps<TItem, TForm> = {
  title: string;
  fetchList: AsyncFn<[], TItem[]>;
  createItem: AsyncFn<[TForm]>;
  updateItem: AsyncFn<[string, TForm]>;
  deleteItem: AsyncFn<[string]>;
  initialForm: TForm;
  getId: (item: TItem) => string;
  setFormFromItem: (item: TItem) => TForm;
  renderItem: (item: TItem, helpers: { onEdit: () => void; onDelete: () => void }) => ReactElement;
  renderForm: (form: TForm, setForm: Dispatch<SetStateAction<TForm>>, isEditing: boolean) => ReactElement;
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
}: CrudCardProps<TItem, TForm>) {
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TForm>(initialForm);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchList();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar');
    } finally {
      setLoading(false);
    }
  }, [fetchList]);

  useEffect(() => { void load(); }, [load]);

  function resetForm() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function onSubmit() {
    setLoading(true);
    setError(null);
    try {
      if (isEditing && editingId) {
        await updateItem(editingId, form);
      } else {
        await createItem(form);
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
        <div>
          <h2 className="font-semibold mb-2">{isEditing ? 'Editar' : 'Novo'}</h2>
          <div className="flex flex-col gap-3">
            {renderForm(form, setForm, isEditing)}
            <div className="flex gap-2">
              <Button onClick={onSubmit} disabled={loading}>{isEditing ? 'Salvar' : 'Adicionar'}</Button>
              {isEditing && <Button onClick={resetForm} variant="ghost">Cancelar</Button>}
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Lista</h2>
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


