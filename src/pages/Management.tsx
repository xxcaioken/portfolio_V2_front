import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { clearAuthenticated } from '../auth/storage';
import { useNavigate } from 'react-router-dom';

export default function Management() {
  const navigate = useNavigate();

  function logout() {
    clearAuthenticated();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Management</h1>
          <Button onClick={logout} variant="ghost">Sair</Button>
        </div>
        <Card title="Status">
          <p>Área de administração básica. Integração com API .NET poderá ser adicionada aqui.</p>
        </Card>
      </div>
    </div>
  );
}
