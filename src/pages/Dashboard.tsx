
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import MovieCarousel from '@/components/Movies/MovieCarousel';
import { categories, movies } from '@/lib/mockData';
import { isAuthenticated } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const featuredMovie = movies[0]; // Matrix as featured movie

  if (isAuth === false) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />

      {/* Hero section */}
      <div className="relative h-[80vh] w-full bg-netflix-black">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredMovie.imageUrl})` }}
        >
          <div className="absolute inset-0 movie-backdrop" />
        </div>
        
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-20 pt-32">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{featuredMovie.title}</h1>
            <div className="flex items-center text-sm md:text-base mb-4">
              <span className="text-green-500 mr-2">{featuredMovie.rating.toFixed(1)}</span>
              <span className="mr-2">{featuredMovie.year}</span>
              <span>{featuredMovie.duration}</span>
            </div>
            <p className="text-lg md:text-xl max-w-xl mb-6 line-clamp-3 md:line-clamp-none">
              {featuredMovie.description}
            </p>
            <div className="flex space-x-3">
              <Button 
                className="bg-netflix-red hover:bg-red-700 text-white flex items-center gap-2"
                onClick={() => navigate(`/movie/${featuredMovie.id}`)}
              >
                <Play className="h-5 w-5" /> Assistir
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                Mais Informações
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie sections */}
      <div className="relative z-10 -mt-16 pb-10">
        {categories.map(category => (
          <MovieCarousel key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
