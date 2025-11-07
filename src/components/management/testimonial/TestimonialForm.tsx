import type { CreateTestimonialRequest } from '../../../types/testimonial';

type Props = {
  form: CreateTestimonialRequest;
  setForm: (f: CreateTestimonialRequest) => void;
  isEditing: boolean;
  lang?: string;
  createdAt?: string | null;
};

const TestimonialForm = ({ form, setForm, isEditing, createdAt }: Props) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded border px-3 py-2 bg-white dark:bg-stone-900/70"
          placeholder="Nome da pessoa"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Destaque</label>
        <textarea
          value={form.highlight}
          onChange={(e) => setForm({ ...form, highlight: e.target.value })}
          className="w-full rounded border px-3 py-2 bg-white dark:bg-stone-900/70 min-h-[120px]"
          placeholder="Texto do destaque/feedback"
        />
      </div>
      {isEditing && createdAt ? (
        <p className="text-xs text-stone-500">Criado em: {new Date(createdAt).toLocaleDateString()}</p>
      ) : null}
    </div>
  );
};

export default TestimonialForm;


