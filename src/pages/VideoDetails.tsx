
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

// Array of video URLs for the carousel
const carouselVideos = [
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

const VideoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
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

  // Handle carousel item click to play the selected video
  const handleCarouselItemClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

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
            videoUrl={selectedVideo || "https://site456.s3.us-east-2.amazonaws.com/biklojmg.mp4"} 
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
              
              {/* Video carousel section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Videos Relacionados</h3>
                <Carousel className="w-full">
                  <CarouselContent>
                    {carouselVideos.map((videoUrl, index) => (
                      <CarouselItem key={`video-${index}`} className="md:basis-1/3 lg:basis-1/4">
                        <div 
                          className="p-1 cursor-pointer" 
                          onClick={() => handleCarouselItemClick(videoUrl)}
                        >
                          <AspectRatio ratio={9 / 16}>
                            <div className="relative w-full h-full overflow-hidden rounded-md">
                              <video 
                                src={videoUrl}
                                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                                style={{ height: '240px' }}
                                muted
                                loop
                                onMouseOver={(e) => {
                                  e.currentTarget.play();
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.pause();
                                }}
                              />
                            </div>
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
            
            <div className="lg:w-1/3">
              <h3 className="text-xl font-bold mb-4">Imagens Relacionadas</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {[video, ...relatedVideos].map((item, index) => (
                    <CarouselItem key={`thumb-${index}`} className="md:basis-1/2 lg:basis-1/1">
                      <div className="p-1">
                        <AspectRatio ratio={16 / 9}>
                          {index <= 1 ? (
                            <div className="relative w-full h-full">
                              <img 
                                src={item.thumbnailUrl} 
                                alt={item.title} 
                                className="rounded-md w-full h-full object-cover transition-opacity duration-300"
                                style={{ height: '240px' }}
                              />
                              <video 
                                src="https://site456.s3.us-east-2.amazonaws.com/biklojmg.mp4"
                                className="absolute inset-0 rounded-md w-full h-full object-cover opacity-0 transition-opacity duration-300"
                                style={{ height: '240px' }}
                                muted
                                loop
                                onTimeUpdate={(e) => {
                                  // Wait 7 seconds before showing video
                                  setTimeout(() => {
                                    const videoElement = e.currentTarget;
                                    const imgElement = videoElement.previousElementSibling as HTMLElement;
                                    if (imgElement && videoElement) {
                                      videoElement.style.opacity = "1";
                                      imgElement.style.opacity = "0";
                                      videoElement.play();
                                    }
                                  }, 7000);
                                }}
                              />
                            </div>
                          ) : (
                            <img 
                              src={item.thumbnailUrl} 
                              alt={item.title} 
                              className="rounded-md w-full h-full object-cover"
                              style={{ height: '240px' }} // Match the height from MovieCard
                            />
                          )}
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
