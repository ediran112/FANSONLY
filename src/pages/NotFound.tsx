
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Layout/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/80">
            Voltar para o início
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
