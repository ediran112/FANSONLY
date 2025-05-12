
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUser } from '../../lib/auth';
import { Button } from '@/components/ui/button';
import { LogOut, Search } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-netflix-black shadow-lg' : 'bg-gradient-to-b from-netflix-black/80 to-transparent'}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/dashboard" className="text-netflix-red font-bold text-2xl md:text-3xl mr-8">
            NETFLIX
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-white hover:text-gray-300">Início</Link>
            <Link to="/dashboard" className="text-white hover:text-gray-300">Séries</Link>
            <Link to="/dashboard" className="text-white hover:text-gray-300">Filmes</Link>
            <Link to="/dashboard" className="text-white hover:text-gray-300">Minha Lista</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white p-0">
            <Search className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center">
            <span className="hidden md:block text-white mr-2">
              {user?.displayName}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-netflix-red"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
