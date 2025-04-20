import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Music, Hash, User, Video, Flame } from 'lucide-react';

interface Trend {
  id: string;
  title: string;
  category: 'song' | 'hashtag' | 'account' | 'challenge';
  value: string;
  count: string;
  change: number;
}

export const Trends = () => {
  const [trends, setTrends] = useState<Trend[]>([
    {
      id: '1',
      title: 'Top Reels Song',
      category: 'song',
      value: 'vampire - Olivia Rodrigo',
      count: '2.1M reels',
      change: 15
    },
    {
      id: '2',
      title: 'Trending Hashtag',
      category: 'hashtag',
      value: '#BeReal',
      count: '1.8M posts',
      change: 25
    },
    {
      id: '3',
      title: 'Rising Creator',
      category: 'account',
      value: '@dance_trends',
      count: '500K new followers',
      change: 40
    },
    {
      id: '4',
      title: 'Viral Challenge',
      category: 'challenge',
      value: 'Fitness Challenge',
      count: '950K participants',
      change: 30
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'song':
        return <Music className="w-6 h-6 text-purple-400" />;
      case 'hashtag':
        return <Hash className="w-6 h-6 text-blue-400" />;
      case 'account':
        return <User className="w-6 h-6 text-pink-400" />;
      case 'challenge':
        return <Video className="w-6 h-6 text-green-400" />;
      default:
        return <TrendingUp className="w-6 h-6 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center space-x-3 mb-8">
          <Flame className="w-8 h-8 text-orange-500" />
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Trending Now
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trends.map((trend) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 rounded-xl p-6 border border-purple-600/30"
            >
              <div className="flex items-center justify-between mb-4">
                {getCategoryIcon(trend.category)}
                <span className={`text-sm px-2 py-1 rounded-full ${
                  trend.change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {trend.change > 0 ? '+' : '-'}{Math.abs(trend.change)}%
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{trend.title}</h3>
              <p className="text-2xl font-bold mb-2 text-purple-400">{trend.value}</p>
              <p className="text-sm text-gray-400">{trend.count}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gray-900 rounded-xl p-6 border border-purple-600/30">
          <h3 className="text-2xl font-bold mb-6">Popular Hashtags</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { tag: '#SocialScope', count: '1.2M' },
              { tag: '#ContentCreator', count: '890K' },
              { tag: '#DigitalMarketing', count: '750K' },
              { tag: '#SocialMediaTips', count: '680K' },
              { tag: '#Influencer', count: '550K' },
              { tag: '#GrowthHacking', count: '420K' },
              { tag: '#SocialMediaStrategy', count: '380K' },
              { tag: '#PersonalBranding', count: '310K' }
            ].map((hashtag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-600/20 px-4 py-2 rounded-full cursor-pointer hover:bg-purple-600/30 transition-colors"
              >
                <span className="font-semibold text-purple-400">{hashtag.tag}</span>
                <span className="text-sm text-gray-400 ml-2">{hashtag.count}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
            <h3 className="text-xl font-bold mb-4">Top Reels Music</h3>
            <div className="space-y-4">
              {[
                { title: 'Vampire', artist: 'Olivia Rodrigo', uses: '2.1M' },
                { title: 'Last Night', artist: 'Morgan Wallen', uses: '1.8M' },
                { title: 'Cruel Summer', artist: 'Taylor Swift', uses: '1.5M' }
              ].map((song, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <Music className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-sm text-gray-400">{song.artist} • {song.uses} uses</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
            <h3 className="text-xl font-bold mb-4">Rising Creators</h3>
            <div className="space-y-4">
              {[
                { name: '@dance_trends', followers: '500K', niche: 'Dance' },
                { name: '@tech_tips', followers: '450K', niche: 'Technology' },
                { name: '@food_stories', followers: '400K', niche: 'Food' }
              ].map((creator, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-600/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{creator.name}</p>
                    <p className="text-sm text-gray-400">{creator.niche} • {creator.followers} followers</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
            <h3 className="text-xl font-bold mb-4">Viral Challenges</h3>
            <div className="space-y-4">
              {[
                { name: 'Fitness Challenge', participants: '950K', duration: '7 days' },
                { name: 'Dance Challenge', participants: '820K', duration: '5 days' },
                { name: 'Photo Challenge', participants: '750K', duration: '3 days' }
              ].map((challenge, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                    <Video className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{challenge.name}</p>
                    <p className="text-sm text-gray-400">{challenge.participants} participants • {challenge.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};