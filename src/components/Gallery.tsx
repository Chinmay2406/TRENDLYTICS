import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Share2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  likes: number;
  comments: number;
  shares: number;
}

const mockImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://source.unsplash.com/800x800/?nature',
    title: 'Natural Beauty',
    likes: 245,
    comments: 18,
    shares: 12
  },
  {
    id: '2',
    url: 'https://source.unsplash.com/800x800/?urban',
    title: 'City Life',
    likes: 189,
    comments: 24,
    shares: 8
  },
  {
    id: '3',
    url: 'https://source.unsplash.com/800x800/?portrait',
    title: 'Portrait',
    likes: 312,
    comments: 32,
    shares: 15
  },
  {
    id: '4',
    url: 'https://source.unsplash.com/800x800/?travel',
    title: 'Adventure',
    likes: 278,
    comments: 21,
    shares: 19
  },
  {
    id: '5',
    url: 'https://source.unsplash.com/800x800/?food',
    title: 'Culinary Delights',
    likes: 156,
    comments: 15,
    shares: 7
  },
  {
    id: '6',
    url: 'https://source.unsplash.com/800x800/?architecture',
    title: 'Architectural Wonder',
    likes: 203,
    comments: 28,
    shares: 11
  }
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const handleLike = (imageId: string) => {
    setLiked(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId);
      } else {
        newLiked.add(imageId);
      }
      return newLiked;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Photo Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-square">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(image.id);
                    }}
                    className="flex items-center space-x-1"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        liked.has(image.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                      }`}
                    />
                    <span>{liked.has(image.id) ? image.likes + 1 : image.likes}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-5 h-5 text-gray-400" />
                    <span>{image.comments}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Share functionality
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">{selectedImage.title}</h3>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(selectedImage.id)}
                      className="flex items-center space-x-2"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          liked.has(selectedImage.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                        }`}
                      />
                      <span>{liked.has(selectedImage.id) ? selectedImage.likes + 1 : selectedImage.likes} likes</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-6 h-6 text-gray-400" />
                      <span>{selectedImage.comments} comments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-6 h-6 text-gray-400" />
                      <span>{selectedImage.shares} shares</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};