import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Copy, RefreshCw, Hash } from 'lucide-react';

interface PostIdea {
  title: string;
  description: string;
  caption: string;
  hashtags: string[];
}

interface NicheData {
  [key: string]: {
    ideas: PostIdea[];
    hashtags: string[];
  };
}

export const PostIdeaGenerator = () => {
  const [selectedNiche, setSelectedNiche] = useState<string>('');
  const [generatedIdeas, setGeneratedIdeas] = useState<PostIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const niches: NicheData = {
    fitness: {
      ideas: [
        {
          title: 'Morning Workout Routine',
          description: 'Share your energizing morning workout routine',
          caption: "🌅 Starting the day strong with my morning workout routine! Here's how I kickstart my day with energy and positivity. What's your favorite morning exercise? 💪",
          hashtags: ['#MorningWorkout', '#FitnessMotivation', '#HealthyLifestyle']
        },
        {
          title: 'Healthy Meal Prep',
          description: 'Showcase your weekly meal preparation',
          caption: "Meal prep Sunday in full swing! 🥗 Preparing healthy meals for the week ahead is key to staying on track with fitness goals. Swipe to see my full prep routine! 🍽️",
          hashtags: ['#MealPrep', '#HealthyEating', '#FitnessFoodie']
        }
      ],
      hashtags: ['#FitnessJourney', '#WorkoutMotivation', '#HealthyLifestyle', '#FitFam']
    },
    travel: {
      ideas: [
        {
          title: 'Hidden Gems',
          description: 'Showcase lesser-known local spots',
          caption: "Discovered this hidden paradise today! 🌴 Sometimes the best places are off the beaten path. Swipe to see this magical spot that's not in any guidebook! ✨",
          hashtags: ['#HiddenGem', '#TravelSecrets', '#Wanderlust']
        },
        {
          title: 'Travel Tips',
          description: 'Share practical travel advice',
          caption: "✈️ My top travel hacks that have saved me time and money! These are the tips I wish I knew before starting my journey. Save this post for your next trip! 🌍",
          hashtags: ['#TravelTips', '#TravelHacks', '#Wanderlust']
        }
      ],
      hashtags: ['#TravelBlog', '#Wanderlust', '#ExploreMore', '#TravelPhotography']
    },
    food: {
      ideas: [
        {
          title: 'Recipe Tutorial',
          description: 'Step-by-step cooking guide',
          caption: "👨‍🍳 Making my signature pasta dish! This recipe has been in my family for generations and I'm finally sharing it with you all. Save this for later! 🍝",
          hashtags: ['#FoodieLife', '#Cooking', '#RecipeShare']
        },
        {
          title: 'Restaurant Review',
          description: 'Share your dining experience',
          caption: "Found the most amazing hidden restaurant! 🍽️ This place serves authentic cuisine that will transport you straight to Italy. Must-try dishes in my highlights! ⭐",
          hashtags: ['#FoodReview', '#Foodiegram', '#DiningOut']
        }
      ],
      hashtags: ['#Foodie', '#FoodBlogger', '#FoodPhotography', '#Yummy']
    }
  };

  const generateIdeas = () => {
    if (!selectedNiche) return;

    setLoading(true);
    setTimeout(() => {
      setGeneratedIdeas(niches[selectedNiche].ideas);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Post Idea Generator</h3>
          <p className="text-gray-400">Get creative content ideas for your niche</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select Your Niche
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(niches).map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedNiche === niche
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 hover:border-purple-500/50'
                }`}
              >
                <span className="capitalize">{niche}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedNiche && (
          <button
            onClick={generateIdeas}
            disabled={loading}
            className="w-full px-6 py-3 bg-purple-600 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating Ideas...</span>
              </>
            ) : (
              <>
                <Lightbulb className="w-5 h-5" />
                <span>Generate Ideas</span>
              </>
            )}
          </button>
        )}

        <AnimatePresence>
          {generatedIdeas.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {generatedIdeas.map((idea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 p-6 rounded-lg space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">{idea.title}</h4>
                    <button
                      onClick={() => copyToClipboard(idea.caption)}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-400">{idea.description}</p>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm">{idea.caption}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {idea.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm cursor-pointer hover:bg-purple-600/30"
                        onClick={() => copyToClipboard(tag)}
                      >
                        <Hash className="w-3 h-3" />
                        <span>{tag.replace('#', '')}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};