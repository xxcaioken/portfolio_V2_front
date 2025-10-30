import { clearAuthenticated, getAuthHeader } from '../auth/storage';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...(init.headers || {}),
    },
    ...init,
  });

  if (res.status === 401) {
    clearAuthenticated();
    throw new Error('Não autorizado');
  }

  if (!res.ok) {
    const bodyUnknown = await res.json().catch(() => ({}));
    let message = `Erro HTTP ${res.status}`;
    if (typeof bodyUnknown === 'object' && bodyUnknown !== null) {
      const b = bodyUnknown as { error?: string; message?: string };
      message = b.error || b.message || message;
    }
    throw new Error(message);
  }

  // Trata respostas sem corpo
  const contentType = res.headers.get('content-type') || '';
  if (res.status === 204 || !contentType.includes('application/json')) {
    return undefined as unknown as T;
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { method: 'GET', ...init }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined, ...init }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined, ...init }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined, ...init }),
  delete: <T>(path: string, init?: RequestInit) => request<T>(path, { method: 'DELETE', ...init }),
};


