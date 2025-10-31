import type { ReactElement } from 'react';
import type { KeyTaskResponse } from '../../../types/keytask';
import { findTechKey } from '../../../icons/tech.data';
import { TechIcon } from '../../../icons/TechIcon';

type Props = { item: KeyTaskResponse };

const KeyTaskItem = ({ item: e }: Props): ReactElement => {
  return (
    <div>
      <p className="font-medium">{e.keyTask}</p>
      <p className="text-sm text-stone-700 dark:text-stone-300">{e.description}</p>
      {(e.technologies?.length ?? 0) > 0 && (
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {e.technologies.map((t, idx) => {
            const k = t.technologyBadge ? findTechKey(t.technologyBadge) : null;
            return (
              <span key={idx} className="inline-flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400">
                {k ? <TechIcon name={k} className="text-stone-700 dark:text-stone-300" /> : null}
                {t.technology}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KeyTaskItem;


