import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ThumbsUp, ThumbsDown, Meh, BarChart2, RefreshCw, Lightbulb } from 'lucide-react';

export const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<null | {
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
    normalizedScore: number;
    keywords: string[];
    suggestions: string[];
    captionSuggestions: string[];
  }>(null);
  const [loading, setLoading] = useState(false);

  const generateCaptionSuggestions = (sentiment: string, keywords: string[]) => {
    const templates = {
      positive: [
        "✨ Living for these moments! {keywords} #blessed",
        "🌟 When {keywords} come together perfectly! #goodvibes",
        "💫 Couldn't be happier! {keywords} #gratitude",
        "🎉 This is what dreams are made of! {keywords} #happiness",
        "🌈 Pure joy captured in one moment! {keywords} #positivevibes"
      ],
      negative: [
        "🤔 Learning and growing through challenges. {keywords} #growth",
        "💭 Sometimes we need to reflect... {keywords} #mindfulness",
        "🌱 Every setback is a setup for a comeback! {keywords} #motivation",
        "💪 Embracing the journey, both ups and downs. {keywords} #progress",
        "🎯 Focused on solutions, not problems. {keywords} #determination"
      ],
      neutral: [
        "📸 Capturing life as it happens. {keywords} #lifestyle",
        "🎬 Another day, another adventure. {keywords} #journey",
        "🌅 Simple moments, lasting memories. {keywords} #life",
        "💫 Just being present. {keywords} #mindful",
        "🌿 Taking it all in. {keywords} #moments"
      ]
    };

    const selectedTemplates = templates[sentiment as keyof typeof templates];
    return selectedTemplates.map(template => {
      const keywordString = keywords.length > 0 
        ? keywords.join(' ') 
        : 'moments like these';
      return template.replace('{keywords}', keywordString);
    });
  };

  const analyzeSentiment = () => {
    if (!text.trim()) return;
    
    setLoading(true);
    
    // Simulated analysis
    setTimeout(() => {
      const words = text.toLowerCase().split(' ');
      const positiveWords = ['love', 'great', 'amazing', 'awesome', 'beautiful', 'perfect', 'happy', 'joy', 'excited'];
      const negativeWords = ['hate', 'bad', 'terrible', 'awful', 'poor', 'worst', 'sad', 'angry', 'disappointed'];
      
      let score = 0;
      const foundKeywords: string[] = [];
      const totalWords = words.length;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) {
          score += 1;
          foundKeywords.push(word);
        }
        if (negativeWords.includes(word)) {
          score -= 1;
          foundKeywords.push(word);
        }
      });
      
      // Calculate normalized score (0-10)
      const maxPossibleScore = Math.min(totalWords, 10); // Cap at 10
      const rawScore = Math.abs(score);
      const normalizedScore = Math.min(
        Math.round((rawScore / maxPossibleScore) * 10),
        10
      );

      const sentiment = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
      const suggestions = getSuggestions(sentiment);
      const captionSuggestions = generateCaptionSuggestions(sentiment, foundKeywords);
      
      setAnalysis({
        sentiment,
        score: rawScore,
        normalizedScore,
        keywords: foundKeywords,
        suggestions,
        captionSuggestions
      });
      
      setLoading(false);
    }, 1000);
  };

  const getSuggestions = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return [
          'Keep the positive tone while staying authentic',
          'Consider adding specific details about what makes it great',
          'Use this enthusiasm to encourage engagement'
        ];
      case 'negative':
        return [
          'Try to focus on constructive feedback',
          'Consider a more balanced perspective',
          'Add suggestions for improvement'
        ];
      default:
        return [
          'Add more descriptive language',
          'Include your personal perspective',
          'Be more specific about your thoughts'
        ];
    }
  };

  const getSentimentIcon = () => {
    if (!analysis) return null;
    switch (analysis.sentiment) {
      case 'positive':
        return <ThumbsUp className="w-6 h-6 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="w-6 h-6 text-red-500" />;
      default:
        return <Meh className="w-6 h-6 text-yellow-500" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Content Analyzer
        </h2>

        <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Caption Generator</h3>
              <p className="text-gray-400">Analyze text and get caption suggestions</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text to analyze and get caption suggestions..."
                className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={analyzeSentiment}
                disabled={loading || !text.trim()}
                className="px-6 py-2 bg-purple-600 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <BarChart2 className="w-4 h-4" />
                    <span>Analyze & Generate</span>
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getSentimentIcon()}
                        <span className="text-lg font-semibold capitalize">
                          {analysis.sentiment} Sentiment
                        </span>
                      </div>
                      <span className="text-sm bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full">
                        Score: {analysis.normalizedScore}/10
                      </span>
                    </div>

                    {analysis.keywords.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Key Terms</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <h4 className="text-lg font-semibold">Caption Suggestions</h4>
                    </div>
                    <div className="space-y-4">
                      {analysis.captionSuggestions.map((caption, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-700 p-4 rounded-lg group hover:bg-gray-600 transition-colors cursor-pointer"
                          onClick={() => copyToClipboard(caption)}
                        >
                          <p className="text-gray-200">{caption}</p>
                          <p className="text-sm text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to copy
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};