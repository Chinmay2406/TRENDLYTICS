import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Hash, Clock, MessageCircle, Heart, Copy } from 'lucide-react';

interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  hashtags: string[];
}

export const TopPerformingContent = () => {
  const [posts] = useState<Post[]>([
    {
      id: '1',
      imageUrl: 'https://source.unsplash.com/600x600/?fitness',
      caption: "Starting the week strong 💪 #fitness #motivation",
      likes: 1200,
      comments: 45,
      timestamp: "2024-03-18T09:00:00",
      hashtags: ['#fitness', '#motivation', '#workout']
    },
    {
      id: '2',
      imageUrl: 'https://source.unsplash.com/600x600/?food',
      caption: "Perfect breakfast to fuel your day 🍳 #foodie #healthy",
      likes: 980,
      comments: 32,
      timestamp: "2024-03-17T08:30:00",
      hashtags: ['#foodie', '#healthy', '#breakfast']
    },
    {
      id: '3',
      imageUrl: 'https://source.unsplash.com/600x600/?travel',
      caption: "Adventure awaits ✈️ #travel #wanderlust",
      likes: 1500,
      comments: 67,
      timestamp: "2024-03-16T15:00:00",
      hashtags: ['#travel', '#wanderlust', '#adventure']
    }
  ]);

  const topHashtags = [
    { tag: '#fitness', count: 250, engagement: 4.5 },
    { tag: '#travel', count: 180, engagement: 4.2 },
    { tag: '#food', count: 150, engagement: 3.8 },
    { tag: '#lifestyle', count: 120, engagement: 3.5 },
    { tag: '#motivation', count: 100, engagement: 3.2 }
  ];

  const bestPostingTimes = [
    { day: 'Monday', time: '9:00 AM', engagement: 4.2 },
    { day: 'Wednesday', time: '12:00 PM', engagement: 4.5 },
    { day: 'Friday', time: '6:00 PM', engagement: 4.8 },
    { day: 'Saturday', time: '11:00 AM', engagement: 4.3 },
    { day: 'Sunday', time: '3:00 PM', engagement: 4.0 }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Top Performing Content</h3>
          <p className="text-gray-400">Analyze your best posts and engagement patterns</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Top Posts */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Top Posts</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  src={post.imageUrl}
                  alt={`Top post ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-blue-400" />
                      <span>{post.comments.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{post.caption}</p>
                  <div className="flex flex-wrap gap-1">
                    {post.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Hashtags */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Top Performing Hashtags</h4>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topHashtags.map((hashtag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                  onClick={() => copyToClipboard(hashtag.tag)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Hash className="w-4 h-4 text-purple-400" />
                    <Copy className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-medium text-purple-400">{hashtag.tag}</p>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>{hashtag.count} posts</p>
                    <p>{hashtag.engagement}% engagement</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Best Posting Times */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Best Posting Times</h4>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {bestPostingTimes.map((timeSlot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="font-medium">{timeSlot.day}</span>
                  </div>
                  <p className="text-lg font-bold text-purple-400">{timeSlot.time}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {timeSlot.engagement}% engagement
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};