import type { ReactElement } from 'react';
import type { HabilityResponse } from '../../../types/hability';

type Props = { item: HabilityResponse };

const HabilityItem = ({ item: e }: Props): ReactElement => (
  <div>
    <p className="font-medium">{e.hability}</p>
    <p className="text-xs text-stone-600 dark:text-stone-400">Badge: {e.badge}</p>
    {(e.bullets?.length ?? 0) > 0 && (
      <ul className="list-disc ml-5 mt-1 text-sm">
        {(e.bullets ?? []).map((b, idx) => (<li key={idx}>{b}</li>))}
      </ul>
    )}
  </div>
);

export default HabilityItem;


