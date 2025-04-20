import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Percent, Users, MessageCircle, Heart, TrendingUp } from 'lucide-react';

interface Post {
  likes: number;
  comments: number;
  engagement?: number;
}

export const EngagementCalculator = () => {
  const [followers, setFollowers] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([{ likes: 0, comments: 0 }]);
  const [averageEngagement, setAverageEngagement] = useState<number>(0);

  const addPost = () => {
    setPosts([...posts, { likes: 0, comments: 0 }]);
  };

  const removePost = (index: number) => {
    if (posts.length > 1) {
      const newPosts = posts.filter((_, i) => i !== index);
      setPosts(newPosts);
    }
  };

  const updatePost = (index: number, field: keyof Post, value: number) => {
    const newPosts = [...posts];
    newPosts[index] = { ...newPosts[index], [field]: value };
    setPosts(newPosts);
  };

  const calculateEngagement = () => {
    if (!followers) return;

    const postsWithEngagement = posts.map(post => ({
      ...post,
      engagement: ((post.likes + post.comments) / followers) * 100
    }));

    const totalEngagement = postsWithEngagement.reduce(
      (sum, post) => sum + (post.engagement || 0),
      0
    );

    setPosts(postsWithEngagement);
    setAverageEngagement(totalEngagement / posts.length);
  };

  const getEngagementColor = (rate: number) => {
    if (rate >= 5) return 'text-green-500';
    if (rate >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Engagement Rate Calculator</h3>
          <p className="text-gray-400">Calculate your Instagram engagement rate</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Total Followers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:border-purple-500"
              placeholder="Enter your follower count"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium">Post Data</h4>
            <button
              onClick={addPost}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Add Post
            </button>
          </div>

          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 p-4 rounded-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">Post {index + 1}</span>
                {posts.length > 1 && (
                  <button
                    onClick={() => removePost(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    value={post.likes}
                    onChange={(e) => updatePost(index, 'likes', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="Likes"
                  />
                </div>

                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    value={post.comments}
                    onChange={(e) => updatePost(index, 'comments', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="Comments"
                  />
                </div>
              </div>

              {post.engagement !== undefined && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <span className="text-sm text-gray-400">Engagement Rate:</span>
                  <span className={`text-sm font-medium ${getEngagementColor(post.engagement)}`}>
                    {post.engagement.toFixed(2)}%
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <button
          onClick={calculateEngagement}
          className="w-full px-6 py-3 bg-purple-600 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
        >
          <Percent className="w-5 h-5" />
          <span>Calculate Engagement Rate</span>
        </button>

        {averageEngagement > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Average Engagement Rate:</span>
              </div>
              <span className={`text-lg font-bold ${getEngagementColor(averageEngagement)}`}>
                {averageEngagement.toFixed(2)}%
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};