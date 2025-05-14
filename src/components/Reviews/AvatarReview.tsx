
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

// Define the review data type
interface Review {
  id: number;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
}

// Sample review data
const reviews: Review[] = [
  {
    id: 1,
    name: "Sophia",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    comment: "Plataforma incrível! Conteúdo exclusivo de alta qualidade.",
    rating: 5
  },
  {
    id: 2,
    name: "Camila",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    comment: "Os vídeos são perfeitos, vale cada centavo!",
    rating: 5
  },
  {
    id: 3,
    name: "Isabella",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
    comment: "A melhor plataforma para conteúdo exclusivo!",
    rating: 5
  },
  {
    id: 4,
    name: "Valentina",
    avatarUrl: "https://i.pravatar.cc/150?img=16",
    comment: "Encontrei exatamente o que procurava. Excelente!",
    rating: 5
  },
  {
    id: 5,
    name: "Julia",
    avatarUrl: "https://i.pravatar.cc/150?img=20",
    comment: "Interface super intuitiva e conteúdo de primeira!",
    rating: 5
  }
];

const AvatarReview = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % reviews.length);
    }, 3000); // Change review every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, index) => (
      <Star key={index} className="h-4 w-4 fill-primary text-primary" />
    ));
  };

  return (
    <div className="mt-6 relative overflow-hidden">
      <div className="text-center text-sm text-gray-400 mb-2">O que dizem sobre nós:</div>
      
      <div className="relative h-28 overflow-hidden">
        <div 
          ref={reviewsRef}
          className="absolute w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentReview * 100}%)` }}
        >
          <div className="flex">
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0 px-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={review.avatarUrl} alt={review.name} />
                    <AvatarFallback>{review.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex items-center mt-2">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-xs text-center mt-1 text-gray-300 line-clamp-2">
                    "{review.comment}"
                  </p>
                  
                  <p className="text-xs font-semibold text-primary mt-1">
                    {review.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-2 space-x-1">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentReview === index ? "bg-primary" : "bg-gray-500"
            }`}
            onClick={() => setCurrentReview(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarReview;
