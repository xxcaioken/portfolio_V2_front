import type { ReactElement } from 'react';
import type { RecommendationLetterResponse } from '../../../types/recommendationLetter';
import { resolveApiUrl } from '../../../lib/api';

type Props = { item: RecommendationLetterResponse };

const RecommendationLetterItem = ({ item: e }: Props): ReactElement => (
  <div className="grid grid-cols-2 gap-3 items-start">
    <div>
      <p className="text-xs text-stone-500 mb-1">PT</p>
      {e.imageUrlPt ? <img src={resolveApiUrl(e.imageUrlPt)} alt="Carta PT" className="h-24 object-cover rounded border" /> : <span className="text-xs">—</span>}
    </div>
    <div>
      <p className="text-xs text-stone-500 mb-1">EN</p>
      {e.imageUrlEn ? <img src={resolveApiUrl(e.imageUrlEn)} alt="Carta EN" className="h-24 object-cover rounded border" /> : <span className="text-xs">—</span>}
    </div>
  </div>
);

export default RecommendationLetterItem;


