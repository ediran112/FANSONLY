
import { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import { getVideoById } from '@/lib/mockData';
import { isAuthenticated } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const VideoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const video = id ? getVideoById(parseInt(id)) : undefined;

  useEffect(() => {
    if (video) {
      // Get 5 related videos (excluding the current video)
      const related = [...Array(5)].map((_, index) => {
        const randomId = Math.floor(Math.random() * 8) + 1;
        return getVideoById(randomId === parseInt(id!) ? (randomId + 1) % 8 + 1 : randomId);
      });
      setRelatedVideos(related);
    }
  }, [id, video]);

  if (isAuth === false) {
    return <Navigate to="/" />;
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Vídeo não encontrado</h1>
        <Button onClick={() => navigate('/dashboard')}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col">
      <Header />
      
      <div className="pt-16 flex-1">
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
            videoUrl="https://www.youtube.com/watch?v=vBZVoyBvGwk" 
            posterUrl={video.thumbnailUrl} 
          />
        </div>
        
        {/* Video details */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{video.title}</h1>
              
              <div className="flex items-center text-sm md:text-base mb-4">
                <span className="text-primary mr-2">{video.views.toLocaleString()}</span>
                <span className="mr-2">•</span>
                <span className="mr-2">{video.createdAt}</span>
                <span className="mr-2">•</span>
                <span>{video.duration}</span>
              </div>
              
              <p className="text-lg mb-6">{video.description}</p>
            </div>
            
            <div className="lg:w-1/3">
              <h3 className="text-xl font-bold mb-4">Imagens Relacionadas</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {[video, ...relatedVideos].map((item, index) => (
                    <CarouselItem key={`thumb-${index}`} className="md:basis-1/2 lg:basis-1/1">
                      <div className="p-1">
                        <AspectRatio ratio={16 / 9}>
                          <img 
                            src={item.thumbnailUrl} 
                            alt={item.title} 
                            className="rounded-md w-full h-full object-cover"
                            style={{ height: '240px' }} // Match the height from MovieCard
                          />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VideoDetails;
