
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, hasConfirmedAdultContent, confirmAdultContent } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show age confirmation dialog if user hasn't confirmed yet
    if (!hasConfirmedAdultContent()) {
      setShowAgeDialog(true);
    }
  }, []);

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

  const handleConfirmAge = () => {
    confirmAdultContent();
    setShowAgeDialog(false);
  };

  const handleDeclineAge = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1595064085577-7c2cabf8b256?auto=format&fit=crop&q=80&w=1920&h=1080')`,
        }}
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />
      
      <div className="w-full max-w-md z-20">
        <div className="text-center mb-8">
          <h1 className="text-primary font-bold text-5xl mb-2">FANSONLY</h1>
          <p className="text-white text-xl">Conteúdo exclusivo para assinantes</p>
        </div>
        
        <Card className="bg-black/80 border-gray-800 glass-card">
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
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/80 text-white" 
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
              © 2025 FansOnly
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Age Verification Dialog */}
      <Dialog open={showAgeDialog} onOpenChange={setShowAgeDialog}>
        <DialogContent className="bg-background border-muted">
          <DialogHeader>
            <DialogTitle>Verificação de Idade</DialogTitle>
            <DialogDescription>
              Este site contém conteúdo adulto destinado apenas para pessoas maiores de 18 anos.
              Ao continuar, você confirma que tem pelo menos 18 anos de idade e concorda em
              visualizar conteúdo adulto.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeclineAge}>
              Sair
            </Button>
            <Button className="bg-primary hover:bg-primary/80" onClick={handleConfirmAge}>
              Confirmo que tenho 18+ anos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
