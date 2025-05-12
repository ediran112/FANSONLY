
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../lib/mockData';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div 
      className="movie-card w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 mr-2 relative overflow-hidden rounded-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <img 
        src={movie.imageUrl} 
        alt={movie.title} 
        className="w-full h-[240px] md:h-[300px] object-cover"
      />
      
      {isHovering && (
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-2 md:p-3 animate-fade-in">
          <div>
            <h3 className="font-bold text-sm md:text-base">{movie.title}</h3>
            <div className="flex items-center mt-1 text-xs md:text-sm">
              <span className="text-green-500 mr-1">{movie.rating.toFixed(1)}</span>
              <span className="mr-1">•</span>
              <span className="text-gray-300 mr-1">{movie.year}</span>
              <span className="mr-1">•</span>
              <span>{movie.duration}</span>
            </div>
          </div>
          <div className="text-xs md:text-sm line-clamp-3 mt-1">
            {movie.description}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genre.map((genre, index) => (
              <span key={index} className="text-xs bg-netflix-dark px-1 rounded">
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
