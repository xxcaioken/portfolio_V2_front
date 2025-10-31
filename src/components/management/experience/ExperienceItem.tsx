import type { ReactElement } from 'react';
import type { ExperienceResponse } from '../../../types/experience';
import { formatRange } from '../../../lib/date';

type Props = { item: ExperienceResponse };

const ExperienceItem = ({ item: e }: Props): ReactElement => (
  <div>
    <p className="font-medium">{e.company} — {e.role}</p>
    <p className="text-xs text-stone-600 dark:text-stone-400">{formatRange(e.startDate, e.endDate)}</p>
    {(e.bullets?.length ?? 0) > 0 && (
      <ul className="list-disc ml-5 mt-1 text-sm">
        {(e.bullets ?? []).map((b, idx) => (<li key={idx}>{b}</li>))}
      </ul>
    )}
  </div>
);

export default ExperienceItem;


