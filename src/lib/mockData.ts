
export interface Creator {
  id: number;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  subscriberCount: number;
  subscriptionPrice: number;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: string;
  duration: string;
  views: number;
  creatorId: number;
  isExclusive: boolean;
}

export interface Category {
  id: number;
  name: string;
  videos: Video[];
}

// Sample creators
export const creators: Creator[] = [
  {
    id: 1,
    name: "Sofia Deluxe",
    username: "sofiadeluxe",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Fitness model sharing exclusive workout routines and lifestyle content",
    subscriberCount: 24500,
    subscriptionPrice: 12.99
  },
  {
    id: 2,
    name: "Alex Rivers",
    username: "alexrivers",
    avatarUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Model and photographer sharing artistic photoshoots and behind-the-scenes content",
    subscriberCount: 18300,
    subscriptionPrice: 15.99
  },
  {
    id: 3,
    name: "Luna Star",
    username: "lunastar",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b398ccff?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Dancer and performer sharing dance routines and exclusive performances",
    subscriberCount: 32100,
    subscriptionPrice: 19.99
  },
  {
    id: 4,
    name: "James Cole",
    username: "jamescole",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Fitness coach offering personal training videos and nutrition advice",
    subscriberCount: 15700,
    subscriptionPrice: 9.99
  }
];

// Sample videos using placeholder URLs for thumbnails
export const videos: Video[] = [
  {
    id: 1,
    title: "Private Yoga Session",
    description: "Join me for an exclusive yoga session focusing on flexibility and relaxation techniques.",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-in-a-studio-4820-large.mp4",
    createdAt: "2025-05-08",
    duration: "18:45",
    views: 4320,
    creatorId: 1,
    isExclusive: true
  },
  {
    id: 2,
    title: "Beach Photoshoot BTS",
    description: "Behind the scenes of my latest beachside photoshoot. See all the angles we didn't publish!",
    thumbnailUrl: "https://images.unsplash.com/photo-1506901437675-cde80ff9c746?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-blue-water-4783-large.mp4",
    createdAt: "2025-05-06",
    duration: "12:30",
    views: 2870,
    creatorId: 3,
    isExclusive: true
  },
  {
    id: 3,
    title: "Late Night Chat Session",
    description: "A candid talk about life, dreams and answering your personal questions.",
    thumbnailUrl: "https://images.unsplash.com/photo-1610498717975-1867885b32d8?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-turning-off-her-alarm-clock-42897-large.mp4",
    createdAt: "2025-05-05",
    duration: "35:12",
    views: 9840,
    creatorId: 1,
    isExclusive: false
  },
  {
    id: 4,
    title: "Workout Session: Core Strength",
    description: "Intense core workout routine that will help define those abs. Suitable for intermediate level.",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-sit-ups-on-the-floor-31675-large.mp4",
    createdAt: "2025-05-04",
    duration: "22:18",
    views: 3650,
    creatorId: 4,
    isExclusive: true
  },
  {
    id: 5,
    title: "Dancing in the Rain",
    description: "Special choreography shot during a summer rain. One of my most artistic performances yet!",
    thumbnailUrl: "https://images.unsplash.com/photo-1529335764835-380e027a78ff?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-elegant-female-dancer-performing-a-dance-4899-large.mp4",
    createdAt: "2025-05-03",
    duration: "15:45",
    views: 7820,
    creatorId: 3,
    isExclusive: true
  },
  {
    id: 6,
    title: "Morning Routine Revealed",
    description: "My complete morning routine from wake-up to breakfast. Learn all my beauty secrets!",
    thumbnailUrl: "https://images.unsplash.com/photo-1612596551578-9c81c9de1b2d?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-sitting-on-the-bed-and-drinking-a-coffee-23766-large.mp4",
    createdAt: "2025-05-02",
    duration: "28:10",
    views: 5430,
    creatorId: 1,
    isExclusive: false
  },
  {
    id: 7,
    title: "Photoshoot Lighting Tips",
    description: "Professional photography lighting tips I use for all my premium content. Improve your content quality!",
    thumbnailUrl: "https://images.unsplash.com/photo-1633934542143-5f66211248f5?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-photographer-taking-pictures-in-a-city-39758-large.mp4",
    createdAt: "2025-05-01",
    duration: "19:22",
    views: 4120,
    creatorId: 2,
    isExclusive: true
  },
  {
    id: 8,
    title: "Evening Stretching Session",
    description: "Wind down with me in this relaxing full-body stretching routine perfect for before bed.",
    thumbnailUrl: "https://images.unsplash.com/photo-1566241823584-c2638af61789?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-stretching-before-sport-4440-large.mp4",
    createdAt: "2025-04-30",
    duration: "16:55",
    views: 2980,
    creatorId: 4,
    isExclusive: true
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Trending Content",
    videos: [videos[0], videos[4], videos[2], videos[5], videos[7]]
  },
  {
    id: 2,
    name: "Recently Added",
    videos: [videos[0], videos[1], videos[2], videos[3]]
  },
  {
    id: 3,
    name: "Fitness & Workouts",
    videos: [videos[0], videos[3], videos[7]]
  },
  {
    id: 4,
    name: "Behind the Scenes",
    videos: [videos[1], videos[6], videos[5]]
  }
];

export const getVideoById = (id: number): Video | undefined => {
  return videos.find(video => video.id === id);
};

export const getCreatorById = (id: number): Creator | undefined => {
  return creators.find(creator => creator.id === id);
};
