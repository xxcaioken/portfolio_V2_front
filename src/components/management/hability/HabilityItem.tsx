import type { ReactElement } from 'react';
import type { HabilityResponse } from '../../../types/hability';
import { findTechKey } from '../../../icons/tech.data';
import { TechIcon } from '../../../icons/TechIcon';

type Props = { item: HabilityResponse };

const HabilityItem = ({ item: e }: Props): ReactElement => (
  <div>
    <p className="font-medium">{e.hability}</p>
    {(e.bullets?.length ?? 0) > 0 && (
      <ul className="list-disc ml-5 mt-1 text-sm">
        {e.bullets.map((b, idx) => {
          const key = b.badge ? findTechKey(b.badge) : null;
          return (
            <li key={idx} className="flex items-center gap-2">
              {key ? <TechIcon name={key} className="text-stone-700 dark:text-stone-300" /> : null}
              <span className="font-medium">{b.text}</span>
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

export default HabilityItem;


