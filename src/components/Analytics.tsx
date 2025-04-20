import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, Users, Heart, MessageCircle, TrendingUp, Calendar, Image, Share, Clock, Target } from 'lucide-react';
import { InstagramService } from '../services/instagram';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { InstagramProfile, InstagramPost } from '../types';

const COLORS = ['#9333EA', '#EC4899', '#8B5CF6', '#F472B6'];

export const Analytics = () => {
  const [profile, setProfile] = useLocalStorage<InstagramProfile | null>('instagram_profile', null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleAnalyze = async () => {
    if (!username) {
      setError('Please enter an Instagram username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const instagramService = new InstagramService();
      const profileData = await instagramService.getPublicProfile(username);
      setProfile(profileData);
      console.log('Profile data:', profileData);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch Instagram data. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getEngagementColor = (rate: string) => {
    const percentage = parseFloat(rate);
    if (percentage >= 5) return 'text-green-500';
    if (percentage >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const generateEngagementData = () => {
    if (!profile?.recentPosts) return [];
    return profile.recentPosts.map(post => ({
      date: new Date(post.timestamp).toLocaleDateString(),
      engagement: post.engagement,
      likes: post.likes,
      comments: post.comments
    }));
  };

  const generateContentTypeData = () => {
    if (!profile?.recentPosts) return [];
    const types = profile.recentPosts.reduce((acc, post) => {
      const type = post.isVideo ? 'Video' : 'Image';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(types).map(([name, value]) => ({ name, value }));
  };

  const generateBestTimes = () => {
    if (!profile?.recentPosts) return [];
    const timeSlots = profile.recentPosts.reduce((acc, post) => {
      const hour = new Date(post.timestamp).getHours();
      const slot = `${hour}:00`;
      acc[slot] = (acc[slot] || 0) + post.engagement;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(timeSlots)
      .map(([time, engagement]) => ({ time, engagement }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5);
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Followers</h3>
          </div>
          <p className="text-3xl font-bold">{profile?.followers.toLocaleString()}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Image className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Posts</h3>
          </div>
          <p className="text-3xl font-bold">{profile?.posts.toLocaleString()}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Engagement Rate</h3>
          </div>
          <p className={`text-3xl font-bold ${getEngagementColor(profile?.engagement_rate || '0%')}`}>
            {profile?.engagement_rate}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Reach</h3>
          </div>
          <p className="text-3xl font-bold">{(profile?.followers * 0.3).toFixed(0).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Engagement Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateEngagementData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ background: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Line type="monotone" dataKey="engagement" stroke="#9333EA" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Content Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={generateContentTypeData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {generateContentTypeData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Best Posting Times</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {generateBestTimes().map((slot, index) => (
            <div key={slot.time} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-purple-500" />
                <span className="text-lg font-semibold">{slot.time}</span>
              </div>
              <p className="text-sm text-gray-400">Engagement Score: {slot.engagement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPostsTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {profile?.recentPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full aspect-square object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span>{post.comments.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 truncate">{post.caption}</p>
              <div className="mt-2 text-xs text-purple-400">
                {new Date(post.timestamp).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Instagram Analytics
        </h2>

        <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Instagram username (e.g., cristiano, nike, natgeo)"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-6 py-2 bg-purple-600 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}

          {profile && (
            <>
              <div className="flex space-x-4 mb-6 border-b border-gray-800">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'overview'
                      ? 'text-purple-500 border-b-2 border-purple-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'posts'
                      ? 'text-purple-500 border-b-2 border-purple-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Posts
                </button>
              </div>

              {activeTab === 'overview' ? renderOverviewTab() : renderPostsTab()}
            </>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 rounded-xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="w-full aspect-video object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-lg">{selectedPost.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-lg">{selectedPost.comments.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-gray-400">
                    {new Date(selectedPost.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{selectedPost.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};