import React from 'react';
import { Hero } from './components/Hero';
import { Analytics } from './components/Analytics';
import { Calendar } from './components/Calendar';
import { SentimentAnalysis } from './components/SentimentAnalysis';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { Resources } from './components/Resources';
import { ThemeToggle } from './components/ThemeToggle';
import { Trends } from './components/Trends';
import { EngagementCalculator } from './components/EngagementCalculator';
import { GhostFollowers } from './components/GhostFollowers';
import { TopPerformingContent } from './components/TopPerformingContent';
import { ContentHeatmap } from './components/ContentHeatmap';
import { DemographicsAnalyzer } from './components/DemographicsAnalyzer';
import { PostIdeaGenerator } from './components/PostIdeaGenerator';

function App() {
  return (
    <div className="bg-black transition-colors duration-300 light-mode:bg-gray-100">
      <ThemeToggle />
      <Hero />
      <Trends />
      <div className="p-8 space-y-8">
        <div id="analytics">
          <Analytics />
        </div>
        <EngagementCalculator />
        <GhostFollowers />
        <TopPerformingContent />
        <ContentHeatmap />
        <DemographicsAnalyzer />
        <PostIdeaGenerator />
      </div>
      <Calendar />
      <SentimentAnalysis />
      <ImageAnalyzer />
      <Resources />
    </div>
  );
}

export default App;