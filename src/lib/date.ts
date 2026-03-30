export const toMonthYear = (iso: string): string => {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length < 2) return iso;
  const [y, m] = parts;
  return `${m}/${y}`;
};

export const formatRange = (start?: string | null, end?: string | null): string | null => {
  if (!start) return null;
  return `${toMonthYear(start)} – ${end ? toMonthYear(end) : 'Atual'}`;
};


