import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, Hash, Sparkles, X } from 'lucide-react';

interface ImageAnalysis {
  captions: string[];
  hashtags: string[];
  mood: string;
  colors: string[];
}

export const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setLoading(true);
    // Simulated AI analysis
    setTimeout(() => {
      const mockAnalysis: ImageAnalysis = {
        captions: [
          "✨ Adventure awaits at every corner",
          "🌟 Living life in full color",
          "🎯 Making memories that last forever",
          "🌈 Finding beauty in everyday moments",
          "💫 When life gives you perfect lighting"
        ],
        hashtags: [
          "#photography",
          "#lifestyle",
          "#inspiration",
          "#moments",
          "#photooftheday",
          "#instagood",
          "#explore"
        ],
        mood: "Vibrant & Energetic",
        colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"]
      };
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Image Analyzer
        </h2>

        <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="block w-full aspect-square bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors cursor-pointer"
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <Upload className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-400">Upload an image to analyze</p>
                    </div>
                  )}
                </label>
              </div>

              {selectedImage && (
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                  }}
                  className="w-full px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                >
                  Remove Image
                </button>
              )}
            </div>

            {/* Analysis Section */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="space-y-4 text-center">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-400">Analyzing image...</p>
                  </div>
                </motion.div>
              ) : analysis ? (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Captions */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <ImageIcon className="w-5 h-5 text-purple-500" />
                      <h3 className="text-lg font-semibold">Caption Suggestions</h3>
                    </div>
                    <div className="space-y-2">
                      {analysis.captions.map((caption, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                          onClick={() => navigator.clipboard.writeText(caption)}
                        >
                          <p className="text-gray-200">{caption}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Hash className="w-5 h-5 text-purple-500" />
                      <h3 className="text-lg font-semibold">Suggested Hashtags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.hashtags.map((hashtag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full cursor-pointer hover:bg-purple-600/30 transition-colors"
                          onClick={() => navigator.clipboard.writeText(hashtag)}
                        >
                          {hashtag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Mood & Colors */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <h3 className="text-lg font-semibold">Image Mood</h3>
                    </div>
                    <p className="text-gray-200 mb-4">{analysis.mood}</p>
                    <div className="flex space-x-2">
                      {analysis.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};