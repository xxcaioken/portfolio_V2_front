import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { CreateRecommendationLetterRequest, UpdateRecommendationLetterRequest } from '../../../types/recommendationLetter';
import Button from '../../ui/Button';
import { recommendationLettersApi } from '../../../lib/recommendationLetters';
import { resolveApiUrl } from '../../../lib/api';

type FormData = CreateRecommendationLetterRequest | UpdateRecommendationLetterRequest;

type Props = {
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>;
  isEditing: boolean;
};

const RecommendationLetterForm = ({ form: f, setForm: setF }: Props): ReactElement => {
  const uploadPt = async (file: File) => {
    const url = await recommendationLettersApi.uploadImage(file);
    setF(prev => ({ ...prev, imageUrlPt: url }));
  };
  const uploadEn = async (file: File) => {
    const url = await recommendationLettersApi.uploadImage(file);
    setF(prev => ({ ...prev, imageUrlEn: url }));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="pt">Imagem PT</label>
          <input id="pt" type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadPt(file); }} />
          {f.imageUrlPt ? <img src={resolveApiUrl(f.imageUrlPt)} alt="Carta PT" className="h-40 object-cover rounded border" /> : null}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="en">Imagem EN</label>
          <input id="en" type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadEn(file); }} />
          {f.imageUrlEn ? <img src={resolveApiUrl(f.imageUrlEn)} alt="Carta EN" className="h-40 object-cover rounded border" /> : null}
        </div>
      </div>
      <div className="text-xs text-stone-500">Formatos aceitos: JPG, PNG, WEBP, GIF. Máx 2MB.</div>
      <div className="flex gap-2 mt-2">
        <Button onClick={() => setF(prev => ({ ...prev, imageUrlPt: '', imageUrlEn: '' }))} variant="ghost">Limpar</Button>
      </div>
    </>
  );
};

export default RecommendationLetterForm;


