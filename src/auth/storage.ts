export const AUTH_STORAGE_KEY = 'mgmt_auth';

export type AuthData = {
  token: string;
  expiresAt: string; // ISO string
  username?: string;
};

export const getAuthData = (): AuthData | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }
    
    if (typeof parsed.token !== 'string' || typeof parsed.expiresAt !== 'string') {
      return null;
    }

    return parsed as AuthData;
  } catch (error) {
    console.error('Failed to get auth data:', error);
    return null;
  }
}

export const isAuthenticated = (): boolean => {
  const data = getAuthData();
  if (!data)
    return false;
  const expiresTs = new Date(data.expiresAt).getTime();
  if (!Number.isFinite(expiresTs)) {
    return false;
  }
  if (expiresTs <= Date.now()) {
    return false;
  }
  return expiresTs > Date.now();
}

export const setAuthenticated = (data: AuthData): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to set auth data:', error);
    return;
  }
}

export const clearAuthenticated = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    return;
  }
}

export const getAuthToken = (): string | null => {
  const data = getAuthData();
  if (!data) return null;
  const expiresTs = new Date(data.expiresAt).getTime();
  if (!Number.isFinite(expiresTs) || expiresTs <= Date.now()) return null;
  return data.token;
}

export const getAuthHeader = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
