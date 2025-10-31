export const toMonthYear = (iso: string): string => {
  if (!iso) return '';
  const [y, m] = iso.split('-');
  return `${m}/${y}`;
};

export const formatRange = (start: string, end?: string | null): string => {
  if (!start) return '';
  return `${toMonthYear(start)} – ${end ? toMonthYear(end) : 'Atual'}`;
};


