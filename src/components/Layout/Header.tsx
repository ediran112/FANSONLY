
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { logout, getUser } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, LogOut, User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const user = getUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <div onClick={() => navigate('/dashboard')} className="cursor-pointer">
          <h1 className="text-primary font-bold text-2xl">FANSONLY</h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button
            variant="link"
            className="text-white hover:text-primary"
            onClick={() => navigate('/dashboard')}
          >
            Início
          </Button>
          <Button
            variant="link"
            className="text-white hover:text-primary"
            onClick={() => {}}
          >
            Criadores
          </Button>
          <Button
            variant="link"
            className="text-white hover:text-primary"
            onClick={() => {}}
          >
            Categorias
          </Button>
          <Button
            variant="link"
            className="text-white hover:text-primary"
            onClick={() => {}}
          >
            Favoritos
          </Button>
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-primary" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full h-8 w-8 p-0"
              >
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt={user?.displayName} />
                  <AvatarFallback>{user?.displayName.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-secondary border-border">
              <div className="flex items-center justify-start space-x-2 p-2">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt={user?.displayName} />
                  <AvatarFallback>{user?.displayName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    @{user?.username}
                  </p>
                </div>
              </div>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                <User className="mr-2 h-4 w-4" /> 
                Meu Perfil
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> 
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
