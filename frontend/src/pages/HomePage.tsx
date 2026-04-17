import React from 'react';
import { motion } from 'framer-motion';
import { Code, Play, Trophy, Users, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Code Editor",
      description: "Modern VS Code-style editor with syntax highlighting and IntelliSense"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Real-time Execution",
      description: "Run your code instantly with Judge0 API integration"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Leaderboard",
      description: "Compete with others and climb the global rankings"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Join a vibrant community of programmers"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Performance",
      description: "Lightning-fast code execution and responsive UI"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure",
      description: "JWT-based authentication and secure code execution"
    }
  ];

  const stats = [
    { label: "Problems Solved", value: "10K+" },
    { label: "Active Users", value: "5K+" },
    { label: "Contests", value: "50+" },
    { label: "Languages", value: "10+" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome to Coding Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A comprehensive coding platform with modular architecture, featuring real-time code execution, 
              problem solving, and competitive programming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/problems"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Coding
              </Link>
              <Link
                to="/leaderboard"
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard
              </Link>
            </div>
          </motion.div>

          {/* Code Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-gray-400">solution.py</span>
              </div>
              <pre className="p-4 text-sm text-green-400 overflow-x-auto">
                <code>{`def two_sum(nums, target):
    """Find two numbers that add up to target."""
    complement_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in complement_map:
            return [complement_map[complement], i]
        complement_map[num] = i
    return []

# Example usage
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Indices: {result}")  # Output: [0, 1]`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to improve your coding skills
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Coding?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers improving their coding skills
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-lg"
            >
              Get Started Now
              <Play className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
