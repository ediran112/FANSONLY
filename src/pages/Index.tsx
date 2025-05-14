
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, hasConfirmedAdultContent, confirmAdultContent } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Footer from '@/components/Layout/Footer';

const TypingEffect = ({ text, repeat = false }: { text: string; repeat?: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const index = useRef(0);
  
  useEffect(() => {
    if (!isTyping) {
      if (repeat) {
        // Wait for a while before restarting
        const timeout = setTimeout(() => {
          setIsTyping(true);
          index.current = 0;
          setDisplayText('');
        }, 10000); // Wait 10 seconds before restarting
        
        return () => clearTimeout(timeout);
      }
      return;
    }
    
    const typingInterval = setInterval(() => {
      if (index.current < text.length) {
        setDisplayText(prev => prev + text.charAt(index.current));
        index.current += 1;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 150); // Speed of typing
    
    return () => clearInterval(typingInterval);
  }, [text, isTyping, repeat]);
  
  return <span>{displayText}</span>;
};

const LoadingDots = ({ color = "primary" }: { color?: string }) => {
  return (
    <div className="flex space-x-1 items-center justify-center">
      <div className={`w-2 h-2 rounded-full animate-bounce bg-${color}`} style={{ animationDelay: '0ms' }}></div>
      <div className={`w-2 h-2 rounded-full animate-bounce bg-${color}`} style={{ animationDelay: '300ms' }}></div>
      <div className={`w-2 h-2 rounded-full animate-bounce bg-${color}`} style={{ animationDelay: '600ms' }}></div>
      <div className={`w-2 h-2 rounded-full animate-bounce bg-${color}`} style={{ animationDelay: '900ms' }}></div>
    </div>
  );
};

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
    
    // Simulate loading for 4 seconds before navigation
    setTimeout(() => {
      if (login(username, password)) {
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        // Error toast is shown by the auth service
        setIsLoading(false);
      }
    }, 4000);
  };

  const handleConfirmAge = () => {
    confirmAdultContent();
    setShowAgeDialog(false);
  };

  const handleDeclineAge = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 z-0 bg-black" />
      
      <div className="absolute inset-0 bg-black z-10" />
      
      <div className="w-full max-w-md z-20 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-primary font-bold text-5xl mb-2">
            <TypingEffect text="FANSONLY" repeat={true} />
          </h1>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/80 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">Entrando</span>
                    <LoadingDots />
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <p className="text-gray-400 text-sm">
              © 2025 FANSONLY
            </p>
          </CardFooter>
        </Card>
      </div>

      <Footer />

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
