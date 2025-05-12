
import { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import VideoPlayer from '@/components/VideoPlayer';
import { getVideoById, getCreatorById } from '@/lib/mockData';
import { isAuthenticated } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Share2, Lock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const VideoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const video = id ? getVideoById(parseInt(id)) : undefined;
  const creator = video ? getCreatorById(video.creatorId) : undefined;

  const handleSubscribe = () => {
    toast.success(`Você se inscreveu em ${creator?.name}!`);
  };

  const handleLike = () => {
    toast.success("Adicionado aos favoritos!");
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado para a área de transferência!");
  };

  if (isAuth === false) {
    return <Navigate to="/" />;
  }

  if (!video || !creator) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Conteúdo não encontrado</h1>
        <Button onClick={() => navigate('/dashboard')}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Back button */}
        <div className="container mx-auto px-4 md:px-6 py-4">
          <Button 
            variant="ghost" 
            className="flex items-center text-white hover:text-primary"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>

        {/* Video player */}
        <div className="container mx-auto px-4 md:px-6 mb-6">
          <VideoPlayer 
            videoUrl={video.videoUrl} 
            posterUrl={video.thumbnailUrl} 
          />
        </div>
        
        {/* Video details */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">{video.title}</h1>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-white/10"
                    onClick={handleLike}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-white/10"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center text-sm md:text-base mb-4">
                <span className="text-primary mr-2">{video.views.toLocaleString()} visualizações</span>
                <span className="mr-2">•</span>
                <span className="mr-2">{video.createdAt}</span>
                <span className="mr-2">•</span>
                <span>{video.duration}</span>
                {video.isExclusive && (
                  <>
                    <span className="mr-2">•</span>
                    <Badge variant="secondary" className="bg-primary/80 text-white">
                      <Lock className="h-3 w-3 mr-1" />
                      Exclusivo
                    </Badge>
                  </>
                )}
              </div>
              
              <p className="text-lg mb-8">{video.description}</p>
            </div>
            
            <div className="lg:w-1/3">
              <div className="glass-card rounded-lg p-4 mb-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-14 w-14 mr-4 border-2 border-primary">
                    <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                    <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{creator.name}</h3>
                    <p className="text-sm text-gray-300">@{creator.username}</p>
                    <p className="text-sm text-gray-300">{creator.subscriberCount.toLocaleString()} assinantes</p>
                  </div>
                </div>
                <p className="text-sm mb-4 line-clamp-3">{creator.bio}</p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/80 text-white"
                  onClick={handleSubscribe}
                >
                  Assinar {creator.subscriptionPrice.toFixed(2)}€/mês
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
