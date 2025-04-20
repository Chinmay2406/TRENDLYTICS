export interface InstagramProfile {
  username: string;
  followers: number;
  following: number;
  posts: number;
  engagement_rate: string;
  isPrivate: boolean;
  profilePic: string;
  recentPosts: InstagramPost[];
  demographics?: {
    age: Record<string, number>;
    gender: Record<string, number>;
    topLocations: Array<{ city: string; percentage: number }>;
  };
  insights?: {
    reachGrowth: number;
    impressionsGrowth: number;
    topPerformingHashtags: Array<{ tag: string; uses: number; engagement: number }>;
    bestPostingTimes: Array<{ day: string; time: string; engagement: number }>;
  };
}

export interface InstagramPost {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  timestamp: number;
  isVideo: boolean;
  videoUrl?: string;
  engagement: number;
  hashtags: string[];
  reach: number;
  impressions: number;
}

export interface InstagramComment {
  id: string;
  text: string;
  username: string;
  timestamp: number;
  likes: number;
  replies?: InstagramComment[];
}

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  caption: string;
  hashtags: string[];
  mediaUrl?: string;
  mediaType: 'image' | 'video' | 'carousel';
  status: 'draft' | 'scheduled' | 'posted';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'analytics' | 'marketing' | 'community';
  url: string;
  type: 'article' | 'guide' | 'video' | 'research';
  readTime?: string;
}