export const toMonthYear = (iso: string): string => {
  if (!iso) return '';
  const [y, m] = iso.split('-');
  return `${m}/${y}`;
};

export const formatRange = (start?: string | null, end?: string | null): string | null => {
  if (start && end)
    return `${toMonthYear(start)} – ${end ? toMonthYear(end) : 'Atual'}`;
  return null;
};


