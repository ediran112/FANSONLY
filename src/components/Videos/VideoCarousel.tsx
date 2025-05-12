
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoCard from './VideoCard';
import { Category } from '@/lib/mockData';

interface VideoCarouselProps {
  category: Category;
}

const VideoCarousel = ({ category }: VideoCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = 240 * 3; // Scroll by 3 items at once
    const scrollPosition = direction === 'left' 
      ? carouselRef.current.scrollLeft - scrollAmount
      : carouselRef.current.scrollLeft + scrollAmount;
    
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative group py-4">
      <h2 className="text-lg md:text-xl font-medium mb-2 px-4 md:px-6">{category.name}</h2>
      
      <div className="relative overflow-hidden">
        {/* Left scroll button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        {/* Carousel */}
        <div 
          ref={carouselRef} 
          className="carousel flex px-4 md:px-6 gap-2 py-2 scroll-smooth"
        >
          {category.videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        
        {/* Right scroll button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default VideoCarousel;
