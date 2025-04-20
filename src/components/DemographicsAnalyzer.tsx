import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const DemographicsAnalyzer = () => {
  const ageData = [
    { name: '13-17', value: 5 },
    { name: '18-24', value: 35 },
    { name: '25-34', value: 40 },
    { name: '35-44', value: 15 },
    { name: '45+', value: 5 },
  ];

  const genderData = [
    { name: 'Female', value: 65 },
    { name: 'Male', value: 35 },
  ];

  const locationData = [
    { city: 'New York', percentage: 25 },
    { city: 'Los Angeles', percentage: 20 },
    { city: 'London', percentage: 15 },
    { city: 'Toronto', percentage: 12 },
    { city: 'Sydney', percentage: 8 },
  ];

  const COLORS = ['#9333EA', '#EC4899', '#8B5CF6', '#F472B6', '#C084FC'];

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Demographics Analysis</h3>
          <p className="text-gray-400">Understand your audience composition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Age Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h4 className="text-lg font-semibold mb-4">Age Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gender Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h4 className="text-lg font-semibold mb-4">Gender Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h4 className="text-lg font-semibold mb-4">Top Locations</h4>
          <div className="space-y-4">
            {locationData.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{location.city}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${location.percentage}%` }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="h-full bg-purple-500"
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-400">{location.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};