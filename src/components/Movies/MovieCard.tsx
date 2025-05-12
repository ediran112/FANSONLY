
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  video: Video;
}

const MovieCard = ({ video }: MovieCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${video.id}`);
  };

  return (
    <div 
      className="movie-card w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 mr-2 relative overflow-hidden rounded-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <img 
        src={video.thumbnailUrl} 
        alt={video.title} 
        className={cn(
          "w-full h-[240px] md:h-[300px] object-cover",
          video.isExclusive && "filter grayscale hover:grayscale-0 transition-all duration-500"
        )}
      />
      
      {isHovering && (
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-2 md:p-3 animate-fade-in">
          <div>
            <h3 className="font-bold text-sm md:text-base">{video.title}</h3>
            <div className="flex items-center mt-1 text-xs md:text-sm">
              <span className="text-green-500 mr-1">{video.views.toLocaleString()}</span>
              <span className="mr-1">•</span>
              <span className="text-gray-300 mr-1">{video.createdAt}</span>
              <span className="mr-1">•</span>
              <span>{video.duration}</span>
            </div>
          </div>
          <div className="text-xs md:text-sm line-clamp-3 mt-1">
            {video.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
