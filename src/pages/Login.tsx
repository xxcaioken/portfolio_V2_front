import type { FormEvent } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthenticated } from '../auth/storage';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { api } from '../lib/api';
import type { AuthResponse, LoginRequest } from '../types/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  type LocationState = { from?: { pathname?: string } };
  const location = useLocation() as ReturnType<typeof useLocation> & { state?: LocationState };
  const from = location.state?.from?.pathname || '/management';

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError('Informe usuário e senha.');
      return;
    }
    setLoading(true);
    try {
      const body: LoginRequest = { username, password };
      const data = await api.post<AuthResponse>('/auth/login', body);
      if (!data?.token || !data?.expiresAt) throw new Error('Resposta inesperada do servidor');

      setAuthenticated({ token: data.token, expiresAt: data.expiresAt, username });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Card title="Acesso de Management">
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <label className="text-sm" htmlFor="username">Usuário</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="rounded-md border border-beige-200/70 bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-beige-300 dark:border-stone-800/70 dark:bg-stone-900/70"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-required
            />

            <label className="text-sm" htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="rounded-md border border-beige-200/70 bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-beige-300 dark:border-stone-800/70 dark:bg-stone-900/70"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required
            />

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
            )}

            <Button type="submit" className="mt-1" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
