const PREFIX = 'ptf_';
const TTL_MS = 5 * 60 * 1000; // 5 minutos

type Entry<T> = { data: T; ts: number };

function storageKey(k: string) { return PREFIX + k; }

export function get<T>(k: string): T | null {
  try {
    const raw = localStorage.getItem(storageKey(k));
    if (!raw) return null;
    return (JSON.parse(raw) as Entry<T>).data;
  } catch { return null; }
}

export function isStale(k: string): boolean {
  try {
    const raw = localStorage.getItem(storageKey(k));
    if (!raw) return true;
    return Date.now() - (JSON.parse(raw) as Entry<unknown>).ts > TTL_MS;
  } catch { return true; }
}

export function set<T>(k: string, data: T): void {
  try {
    const entry: Entry<T> = { data, ts: Date.now() };
    localStorage.setItem(storageKey(k), JSON.stringify(entry));
  } catch { /* storage cheio ou indisponível */ }
}

export function bust(k: string): void {
  try { localStorage.removeItem(storageKey(k)); } catch {}
}

export function bustAll(): void {
  try {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  } catch {}
}
