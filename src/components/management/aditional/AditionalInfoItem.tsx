import type { ReactElement } from 'react';
import type { AditionalInfoResponse } from '../../../types/aditionalInfo';
import { formatRange } from '../../../lib/date';

type Props = { item: AditionalInfoResponse };

const AditionalInfoItem = ({ item: e }: Props): ReactElement => (
  <div>
    <p className="font-medium">{e.aditionalInfo}</p>
    <p className="text-xs text-stone-600 dark:text-stone-400">{formatRange(e.startDate, e.endDate)} · Nível: {e.level}</p>
    {(e.bullets?.length ?? 0) > 0 && (
      <ul className="list-disc ml-5 mt-1 text-sm">
        {(e.bullets ?? []).map((b, idx) => (<li key={idx}>{b}</li>))}
      </ul>
    )}
  </div>
);

export default AditionalInfoItem;


