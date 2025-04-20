import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

interface HeatmapData {
  [key: string]: {
    [key: string]: number;
  };
}

export const ContentHeatmap = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const [heatmapData] = useState<HeatmapData>(() => {
    const data: HeatmapData = {};
    days.forEach(day => {
      data[day] = {};
      hours.forEach(hour => {
        data[day][hour] = Math.floor(Math.random() * 10);
      });
    });
    return data;
  });

  const getHeatmapColor = (value: number) => {
    const maxValue = 10;
    const intensity = (value / maxValue) * 100;
    return `bg-purple-${Math.round(intensity / 10) * 100}/${Math.round(intensity)}`;
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${period}`;
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Content Heatmap</h3>
          <p className="text-gray-400">Visualize your posting patterns and engagement times</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="grid grid-cols-[auto_repeat(24,minmax(40px,1fr))]">
            {/* Header */}
            <div className="sticky left-0 bg-gray-900 z-10 p-2"></div>
            {hours.map(hour => (
              <div
                key={hour}
                className="p-2 text-center text-sm text-gray-400 border-b border-gray-800"
              >
                <Clock className="w-4 h-4 mx-auto mb-1" />
                {formatHour(hour)}
              </div>
            ))}

            {/* Rows */}
            {days.map((day, dayIndex) => (
              <React.Fragment key={day}>
                <div className="sticky left-0 bg-gray-900 z-10 p-2 flex items-center font-medium">
                  {day}
                </div>
                {hours.map(hour => {
                  const value = heatmapData[day][hour];
                  return (
                    <motion.div
                      key={`${day}-${hour}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (dayIndex * 24 + hour) * 0.01 }}
                      className={`p-2 border border-gray-800 ${getHeatmapColor(value)} group relative`}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 rounded text-sm whitespace-nowrap z-20">
                        {value} posts at {formatHour(hour)}
                      </div>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-100/10 rounded"></div>
          <span className="text-sm text-gray-400">Low Activity</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500/50 rounded"></div>
          <span className="text-sm text-gray-400">Medium Activity</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-600/90 rounded"></div>
          <span className="text-sm text-gray-400">High Activity</span>
        </div>
      </div>
    </div>
  );
};