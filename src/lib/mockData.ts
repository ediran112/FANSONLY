
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

// Extended video collection to have 10+ videos per category
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
  },
  {
    id: 9,
    title: "Bedroom Confessions",
    description: "Getting personal about life experiences and answering your most burning questions.",
    thumbnailUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-turning-off-her-alarm-clock-42897-large.mp4",
    createdAt: "2025-04-29",
    duration: "40:21",
    views: 12540,
    creatorId: 1,
    isExclusive: true
  },
  {
    id: 10,
    title: "Swimsuit Collection Review",
    description: "Trying on my favorite swimsuits and sharing which ones are best for different body types.",
    thumbnailUrl: "https://images.unsplash.com/photo-1570976447640-ac859083c325?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-pool-1229-large.mp4",
    createdAt: "2025-04-28",
    duration: "24:15",
    views: 8760,
    creatorId: 3,
    isExclusive: false
  },
  {
    id: 11,
    title: "Hotel Room Tour: Luxury Edition",
    description: "Exclusive tour of my premium hotel suite during my latest vacation.",
    thumbnailUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-turning-on-the-tv-in-a-hotel-room-4838-large.mp4",
    createdAt: "2025-04-27",
    duration: "15:40",
    views: 6230,
    creatorId: 2,
    isExclusive: true
  },
  {
    id: 12,
    title: "Late Night Thoughts",
    description: "An intimate conversation about dreams, aspirations, and revealing personal secrets.",
    thumbnailUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-sitting-on-the-floor-and-contemplating-4832-large.mp4",
    createdAt: "2025-04-26",
    duration: "32:18",
    views: 9870,
    creatorId: 1,
    isExclusive: true
  },
  {
    id: 13,
    title: "Spa Day Routine",
    description: "My complete self-care routine that I do every week to maintain my glow.",
    thumbnailUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-getting-facial-mask-in-spa-salon-4840-large.mp4",
    createdAt: "2025-04-25",
    duration: "26:45",
    views: 5640,
    creatorId: 3,
    isExclusive: false
  },
  {
    id: 14,
    title: "Dinner Date Preparation",
    description: "Watch me get ready for a romantic evening out - makeup, outfit selection and more!",
    thumbnailUrl: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-trying-on-a-pink-dress-in-her-apartment-12281-large.mp4",
    createdAt: "2025-04-24",
    duration: "38:22",
    views: 7890,
    creatorId: 1,
    isExclusive: true
  },
  {
    id: 15,
    title: "Home Workout: Lower Body Focus",
    description: "A comprehensive lower body workout you can do with minimal equipment at home.",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-trainer-teaching-exercise-with-a-woman-in-a-gym-32959-large.mp4",
    createdAt: "2025-04-23",
    duration: "45:10",
    views: 6430,
    creatorId: 4,
    isExclusive: true
  },
  {
    id: 16,
    title: "Lingerie Collection Showcase",
    description: "Reviewing my favorite lingerie pieces with detailed feedback on comfort and quality.",
    thumbnailUrl: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-sitting-on-her-living-room-couch-4822-large.mp4",
    createdAt: "2025-04-22",
    duration: "22:35",
    views: 14520,
    creatorId: 3,
    isExclusive: true
  },
  {
    id: 17,
    title: "Fitness Journey: Month 3 Update",
    description: "Progress update on my fitness transformation with before and after comparisons.",
    thumbnailUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-trainer-explaining-exercises-routine-to-a-woman-32961-large.mp4",
    createdAt: "2025-04-21",
    duration: "18:40",
    views: 5830,
    creatorId: 4,
    isExclusive: false
  },
  {
    id: 18,
    title: "Bedroom Dancing",
    description: "An intimate dance session filmed in my bedroom with new choreography.",
    thumbnailUrl: "https://images.unsplash.com/photo-1621784564114-6eea05b89863?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-happily-on-her-bed-4867-large.mp4",
    createdAt: "2025-04-20",
    duration: "14:25",
    views: 10240,
    creatorId: 3,
    isExclusive: true
  },
  {
    id: 19,
    title: "Answering Subscriber Questions",
    description: "Spending time answering your most personal questions from my premium subscribers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1597414726125-8e95d31dc8ea?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-talking-while-sitting-on-her-bed-45813-large.mp4",
    createdAt: "2025-04-19",
    duration: "50:12",
    views: 8430,
    creatorId: 1,
    isExclusive: true
  },
  {
    id: 20,
    title: "My Morning Skincare Routine",
    description: "Detailed walkthrough of all the products I use to maintain my skin's glow.",
    thumbnailUrl: "https://images.unsplash.com/photo-1573461160327-833d7a9bf362?auto=format&fit=crop&q=80&w=500&h=750",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-face-mask-looking-at-mirror-4835-large.mp4",
    createdAt: "2025-04-18",
    duration: "16:55",
    views: 6720,
    creatorId: 2,
    isExclusive: false
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Trending Content",
    videos: videos.slice(0, 10)
  },
  {
    id: 2,
    name: "Recently Added",
    videos: videos.slice(5, 15)
  },
  {
    id: 3,
    name: "Exclusive Content",
    videos: videos.filter(v => v.isExclusive).slice(0, 10)
  },
  {
    id: 4,
    name: "Favorites",
    videos: [videos[0], videos[2], videos[5], videos[7], videos[9], videos[11], videos[13], videos[15], videos[17], videos[19]]
  },
];

export const getVideoById = (id: number): Video | undefined => {
  return videos.find(video => video.id === id);
};

export const getCreatorById = (id: number): Creator | undefined => {
  return creators.find(creator => creator.id === id);
};
