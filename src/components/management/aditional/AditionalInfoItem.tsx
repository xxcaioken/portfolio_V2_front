import type { ReactElement } from 'react';
import type { AditionalInfoResponse } from '../../../types/aditionalInfo';
import { formatRange } from '../../../lib/date';

type Props = { item: AditionalInfoResponse };

const AditionalInfoItem = ({ item: e }: Props): ReactElement => (
  <div>
    <p className="font-medium">{e.aditionalInfo}</p>
    {(e.bullets?.length ?? 0) > 0 && (
      <ul className="list-disc ml-5 mt-1 text-sm">
        {e.bullets.map((b, idx) => (
          <li key={idx}>
            <span className="font-medium">{b.text}</span>
            {` · ${formatRange(b.startDate ?? '', b.endDate ?? '')}`}
            {b.level ? ` · Nível: ${b.level}` : ''}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default AditionalInfoItem;


