
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import VideoCarousel from '@/components/Videos/VideoCarousel';
import { categories, videos, creators } from '@/lib/mockData';
import { isAuthenticated, getUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const user = getUser();
  
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const featuredVideo = videos[0]; // First video as featured

  if (isAuth === false) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero section */}
      <div className="relative h-[80vh] w-full bg-background">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredVideo.thumbnailUrl})` }}
        >
          <div className="absolute inset-0 video-backdrop" />
        </div>
        
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-20 pt-32">
            {/* Creator info */}
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3 border-2 border-primary">
                <AvatarImage src={creators[featuredVideo.creatorId-1].avatarUrl} alt={creators[featuredVideo.creatorId-1].name} />
                <AvatarFallback>{creators[featuredVideo.creatorId-1].name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-gray-300">Criador em destaque</p>
                <p className="font-semibold">{creators[featuredVideo.creatorId-1].name}</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-2">{featuredVideo.title}</h1>
            <div className="flex items-center text-sm md:text-base mb-4">
              <span className="text-primary mr-2">{featuredVideo.views.toLocaleString()} visualizações</span>
              <span className="mr-2">•</span>
              <span>{featuredVideo.createdAt}</span>
              <span className="mr-2">•</span>
              <span>{featuredVideo.duration}</span>
            </div>
            <p className="text-lg md:text-xl max-w-xl mb-6 line-clamp-3 md:line-clamp-none">
              {featuredVideo.description}
            </p>
            <div className="flex space-x-3">
              <Button 
                className="bg-primary hover:bg-primary/80 text-white flex items-center gap-2"
                onClick={() => navigate(`/video/${featuredVideo.id}`)}
              >
                <Play className="h-5 w-5" /> Assistir Agora
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 flex items-center gap-2">
                <Heart className="h-5 w-5" /> Favoritar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video sections */}
      <div className="relative z-10 -mt-16 pb-10">
        {categories.map(category => (
          <VideoCarousel key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
