
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth';

const NotFound = () => {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-primary text-6xl md:text-8xl font-bold mb-4">404</h1>
      <p className="text-white text-xl md:text-2xl mb-8 text-center">Oops! Não conseguimos encontrar essa página.</p>
      <Button 
        className="bg-primary hover:bg-primary/80 text-white"
        onClick={() => navigate(isAuth ? '/dashboard' : '/')}
      >
        Voltar para {isAuth ? 'o Dashboard' : 'o Login'}
      </Button>
    </div>
  );
};

export default NotFound;
