
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import VideoCarousel from '@/components/Videos/VideoCarousel';
import { categories, videos } from '@/lib/mockData';
import { isAuthenticated, getUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Dashboard = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const user = getUser();
  const [currentBanner, setCurrentBanner] = useState(0);
  
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  // Featured videos for the banner carousel
  const featuredVideos = videos.slice(0, 4); // Get first 4 videos for banner

  // Auto-advance banner carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % featuredVideos.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredVideos.length]);

  if (isAuth === false) {
    return <Navigate to="/" />;
  }

  const trendingCategory = categories.find(c => c.name === "Trending Content");
  const recentCategory = categories.find(c => c.name === "Recently Added");
  const exclusiveCategory = categories.find(c => c.name === "Exclusive Content");
  const favoritesCategory = categories.find(c => c.name === "Favorites");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero section with Carousel */}
      <div className="relative w-full bg-background pt-16">
        <Carousel className="w-full">
          <CarouselContent>
            {featuredVideos.map((video, index) => (
              <CarouselItem key={video.id}>
                <div className="relative h-[80vh] w-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center animate-kenburns"
                    style={{ 
                      backgroundImage: `url(${video.thumbnailUrl})`,
                      animation: 'kenburns 30s ease infinite alternate' 
                    }}
                  >
                    <div className="absolute inset-0 video-backdrop" />
                  </div>
                  
                  <div className="relative h-full flex items-end">
                    <div className="container mx-auto px-4 md:px-6 pb-20 pt-32">
                      <h1 className="text-4xl md:text-6xl font-bold mb-2">{video.title}</h1>
                      <div className="flex items-center text-sm md:text-base mb-4">
                        <span className="text-primary mr-2">{video.views.toLocaleString()} visualizações</span>
                        <span className="mr-2">•</span>
                        <span>{video.createdAt}</span>
                        <span className="mr-2">•</span>
                        <span>{video.duration}</span>
                      </div>
                      <p className="text-lg md:text-xl max-w-xl mb-6 line-clamp-3 md:line-clamp-none">
                        {video.description}
                      </p>
                      <div className="flex space-x-3">
                        <Button 
                          className="bg-primary hover:bg-primary/80 text-white flex items-center gap-2"
                          onClick={() => navigate(`/video/${video.id}`)}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {featuredVideos.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentBanner === index ? "bg-primary" : "bg-white/50"
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Video sections */}
      <div className="relative z-10 -mt-16 pb-10 flex-1">
        {trendingCategory && <VideoCarousel key={trendingCategory.id} category={trendingCategory} />}
        {recentCategory && <VideoCarousel key={recentCategory.id} category={recentCategory} />}
        {exclusiveCategory && <VideoCarousel key={exclusiveCategory.id} category={exclusiveCategory} />}
        {favoritesCategory && <VideoCarousel key={favoritesCategory.id} category={favoritesCategory} />}
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
