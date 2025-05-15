
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

// Array of vertical video URLs for the first carousel
const verticalVideos = [
  "https://imjyu.s3.us-east-2.amazonaws.com/10.mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/3.mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/4.mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/5.mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/6.mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/7.mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/8.mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/9.mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/Untitled+video+-+Made+with+Clipchamp+(3).mp4",
  "https://imjyu.s3.us-east-2.amazonaws.com/Untitled+video+-+Made+with+Clipchamp.mp4"
];

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

  // Handle video card click
  const handleVideoClick = (videoUrl: string) => {
    // Store the selected video URL in sessionStorage
    sessionStorage.setItem('selectedVideo', videoUrl);
    // Navigate to video details page
    navigate('/video/1');
  };

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
                  {index < 2 ? (
                    <div className="absolute inset-0 w-full h-full">
                      <video 
                        src={index === 0 ? "https://imjyu.s3.us-east-2.amazonaws.com/4.mp4" : "https://imjyu.s3.us-east-2.amazonaws.com/8.mp4"}
                        className="absolute inset-0 w-full h-full object-cover filter grayscale"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 video-backdrop" />
                    </div>
                  ) : (
                    <div 
                      className="absolute inset-0 bg-cover bg-center animate-kenburns"
                      style={{ 
                        backgroundImage: `url(${video.thumbnailUrl})`,
                        animation: 'kenburns 30s ease infinite alternate' 
                      }}
                    >
                      <div className="absolute inset-0 video-backdrop" />
                    </div>
                  )}
                  
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

      {/* Vertical videos carousel */}
      <div className="relative z-10 -mt-16 pb-6 flex-1">
        <div className="py-4 container mx-auto">
          <h2 className="text-lg md:text-xl font-medium mb-2 px-4 md:px-6">Vídeos Verticais</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {verticalVideos.map((videoUrl, index) => (
                <CarouselItem key={`vertical-${index}`} className="md:basis-1/4 lg:basis-1/5">
                  <div 
                    className="p-1 cursor-pointer" 
                    onClick={() => handleVideoClick(videoUrl)}
                  >
                    <div className="relative rounded-md overflow-hidden" style={{ aspectRatio: '9/16', height: '240px' }}>
                      <video 
                        src={videoUrl}
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>

        {/* Video sections - with container to match spacing */}
        <div className="container mx-auto">
          {trendingCategory && <VideoCarousel key={trendingCategory.id} category={trendingCategory} />}
          {recentCategory && <VideoCarousel key={recentCategory.id} category={recentCategory} />}
          {exclusiveCategory && <VideoCarousel key={exclusiveCategory.id} category={exclusiveCategory} />}
          {favoritesCategory && <VideoCarousel key={favoritesCategory.id} category={favoritesCategory} />}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
