
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import VideoCarousel from '@/components/Videos/VideoCarousel';
import { categories, videos } from '@/lib/mockData';
import { isAuthenticated, getUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const trendingCategory = categories.find(c => c.name === "Trending Content");
  const recentCategory = categories.find(c => c.name === "Recently Added");
  const exclusiveCategory = categories.find(c => c.name === "Exclusive Content");
  const favoritesCategory = categories.find(c => c.name === "Favorites");

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
        {trendingCategory && <VideoCarousel key={trendingCategory.id} category={trendingCategory} />}
        {recentCategory && <VideoCarousel key={recentCategory.id} category={recentCategory} />}
        {exclusiveCategory && <VideoCarousel key={exclusiveCategory.id} category={exclusiveCategory} />}
        {favoritesCategory && <VideoCarousel key={favoritesCategory.id} category={favoritesCategory} />}
      </div>
    </div>
  );
};

export default Dashboard;
