import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ghost, Upload, Users, UserX, AlertCircle } from 'lucide-react';

interface Follower {
  username: string;
  lastInteraction: Date | null;
  posts: number;
  following: number;
  followers: number;
}

export const GhostFollowers = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      parseCSV(file);
    }
  };

  const parseCSV = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const rows = text.split('\n').map(row => row.split(','));
      
      // Skip header row
      const data = rows.slice(1).map(row => ({
        username: row[0],
        lastInteraction: row[1] ? new Date(row[1]) : null,
        posts: parseInt(row[2]) || 0,
        following: parseInt(row[3]) || 0,
        followers: parseInt(row[4]) || 0
      }));

      setFollowers(data);
    } catch (err) {
      setError('Error parsing CSV file. Please check the format.');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const analyzeMockData = () => {
    setLoading(true);
    setTimeout(() => {
      const mockFollowers: Follower[] = Array.from({ length: 10 }, (_, i) => ({
        username: `user_${i + 1}`,
        lastInteraction: i < 5 ? null : new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        posts: Math.floor(Math.random() * 100),
        following: Math.floor(Math.random() * 1000),
        followers: Math.floor(Math.random() * 2000)
      }));
      setFollowers(mockFollowers);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <Ghost className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Ghost Followers Detector</h3>
          <p className="text-gray-400">Identify inactive followers and potential bots</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg border-2 border-dashed border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="flex flex-col items-center cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-center text-gray-400">
              Upload your followers data (CSV) or
              <button
                onClick={(e) => {
                  e.preventDefault();
                  analyzeMockData();
                }}
                className="text-purple-400 hover:text-purple-300 ml-1"
              >
                use sample data
              </button>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Format: username, last_interaction, posts, following, followers
            </p>
          </label>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : followers.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <UserX className="w-5 h-5 text-red-400" />
                  <h4 className="font-medium">Ghost Followers</h4>
                </div>
                <p className="text-2xl font-bold text-red-400">
                  {followers.filter(f => !f.lastInteraction).length}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <h4 className="font-medium">Active Followers</h4>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {followers.filter(f => f.lastInteraction).length}
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h4 className="font-medium">Detailed Analysis</h4>
              </div>
              <div className="divide-y divide-gray-700">
                {followers.map((follower, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-6 py-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{follower.username}</p>
                      <p className="text-sm text-gray-400">
                        {follower.posts} posts • {follower.following} following • {follower.followers} followers
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      follower.lastInteraction
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {follower.lastInteraction
                        ? `Last active: ${follower.lastInteraction.toLocaleDateString()}`
                        : 'Inactive'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};