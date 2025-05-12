
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (login(username, password)) {
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } else {
      // Error toast is shown by the auth service
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb5-71dcbcd9c1db/BR-pt-20231030-popsignuptwoweeks-perspective_alpha_website_medium.jpg')`,
        }}
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />
      
      <div className="w-full max-w-md z-20">
        <div className="text-center mb-8">
          <h1 className="text-netflix-red font-bold text-5xl mb-2">NETFLIX</h1>
          <p className="text-white text-xl">Entre para assistir</p>
        </div>
        
        <Card className="bg-black/80 border-gray-800">
          <CardHeader>
            <h2 className="text-xl font-bold text-center text-white">Entrar</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-netflix-red hover:bg-red-700 text-white" 
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              <p>Para demonstração use:</p>
              <p>Usuário: <strong>edi</strong> / Senha: <strong>12345</strong></p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <p className="text-gray-400 text-sm">
              © 2025 Netflix Clone
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
