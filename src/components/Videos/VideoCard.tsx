
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video } from '@/lib/mockData';
import { Lock, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div 
      className="video-card w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 relative overflow-hidden rounded-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <div className="relative h-[240px] md:h-[300px] overflow-hidden">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
            video.isExclusive && "filter grayscale hover:grayscale-0 transition-all duration-500"
          )}
        />
        
        {video.isExclusive && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="badge-premium text-white animate-pulse">
              <Lock className="h-3 w-3 mr-1" />
              Exclusive
            </Badge>
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 text-xs bg-black/70 px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </div>
      
      {isHovering && (
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-2 md:p-3 animate-fade-in">
          <div>
            <h3 className="font-bold text-sm md:text-base">{video.title}</h3>
            <div className="flex items-center mt-1 text-xs md:text-sm">
              <span className="text-primary mr-1">{video.views.toLocaleString()} views</span>
              <span className="mr-1">•</span>
              <span>{video.createdAt}</span>
            </div>
          </div>
          <div className="text-xs md:text-sm line-clamp-3 mt-1">
            {video.description}
          </div>
          <div className="mt-2 flex items-center justify-center">
            <div className="bg-primary/90 text-white rounded-full p-2 hover:bg-primary transition-colors">
              <Play className="h-4 w-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
