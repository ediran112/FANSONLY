
import { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import VideoPlayer from '@/components/VideoPlayer';
import { getMovieById } from '@/lib/mockData';
import { isAuthenticated } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const movie = id ? getMovieById(parseInt(id)) : undefined;

  if (isAuth === false) {
    return <Navigate to="/" />;
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Filme não encontrado</h1>
        <Button onClick={() => navigate('/dashboard')}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-16">
        {/* Back button */}
        <div className="container mx-auto px-4 md:px-6 py-4">
          <Button 
            variant="ghost" 
            className="flex items-center text-white hover:text-netflix-red"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>

        {/* Video player */}
        <div className="container mx-auto px-4 md:px-6 mb-6">
          <VideoPlayer 
            videoUrl={movie.videoUrl} 
            posterUrl={movie.imageUrl} 
          />
        </div>
        
        {/* Movie details */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex items-center text-sm md:text-base mb-4">
                <span className="text-green-500 mr-2">{movie.rating.toFixed(1)}</span>
                <span className="mr-2">•</span>
                <span className="mr-2">{movie.year}</span>
                <span className="mr-2">•</span>
                <span>{movie.duration}</span>
              </div>
              
              <p className="text-lg mb-6">{movie.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Gêneros</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((genre, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full bg-netflix-dark text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="rounded-md overflow-hidden">
                <img 
                  src={movie.imageUrl} 
                  alt={movie.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
