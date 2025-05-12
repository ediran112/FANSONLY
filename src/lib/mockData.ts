
export interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  year: number;
  duration: string;
  genre: string[];
  rating: number;
}

export interface Category {
  id: number;
  name: string;
  movies: Movie[];
}

// Sample movies using placeholder URLs for images
export const movies: Movie[] = [
  {
    id: 1,
    title: "Matrix Reloaded",
    description: "Neo, Trinity e Morpheus continuam a liderar a revolta contra as Máquinas.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
    year: 2003,
    duration: "2h 18min",
    genre: ["Action", "Sci-Fi"],
    rating: 7.2
  },
  {
    id: 2,
    title: "Oceano Azul",
    description: "Uma jornada fascinante pelas profundezas do oceano.",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-blue-water-4783-large.mp4",
    year: 2021,
    duration: "1h 45min",
    genre: ["Documentary", "Nature"],
    rating: 8.5
  },
  {
    id: 3,
    title: "Noite Estrelada",
    description: "Uma viagem pela Via Láctea e os mistérios do universo.",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
    year: 2020,
    duration: "2h 05min",
    genre: ["Documentary", "Science"],
    rating: 8.1
  },
  {
    id: 4,
    title: "Floresta Encantada",
    description: "Os segredos e mistérios de uma antiga floresta.",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-raindrops-falling-on-a-leaf-1192-large.mp4",
    year: 2019,
    duration: "1h 58min",
    genre: ["Adventure", "Fantasy"],
    rating: 7.8
  },
  {
    id: 5,
    title: "Felino Selvagem",
    description: "A vida secreta dos felinos na natureza.",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-petting-a-cat-5-large.mp4",
    year: 2022,
    duration: "1h 32min",
    genre: ["Documentary", "Nature"],
    rating: 7.9
  },
  {
    id: 6,
    title: "Oceano Profundo",
    description: "Mergulho nas profundezas inexploradas do oceano.",
    imageUrl: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1564-large.mp4",
    year: 2023,
    duration: "2h 10min",
    genre: ["Documentary", "Adventure"],
    rating: 8.3
  },
  {
    id: 7,
    title: "Cidade Neon",
    description: "Uma aventura futurista em uma cidade dominada por luzes e tecnologia.",
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-on-a-street-at-night-4757-large.mp4",
    year: 2020,
    duration: "2h 22min",
    genre: ["Sci-Fi", "Action"],
    rating: 7.5
  },
  {
    id: 8,
    title: "Montanhas Misteriosas",
    description: "Uma jornada épica pelas maiores montanhas do mundo.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-landscape-of-mountains-and-sunset-3128-large.mp4",
    year: 2021,
    duration: "1h 48min",
    genre: ["Adventure", "Documentary"],
    rating: 8.0
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Populares na Netflix",
    movies: [movies[0], movies[1], movies[2], movies[3], movies[4]]
  },
  {
    id: 2,
    name: "Lançamentos",
    movies: [movies[5], movies[6], movies[7], movies[1], movies[3]]
  },
  {
    id: 3,
    name: "Documentários",
    movies: [movies[2], movies[1], movies[4], movies[5], movies[7]]
  },
  {
    id: 4,
    name: "Ficção Científica",
    movies: [movies[0], movies[6], movies[2], movies[3], movies[4]]
  }
];

export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};
