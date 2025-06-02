import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
  <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-pink-50 to-primary-50 flex items-center justify-center">

      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-16 w-16 text-primary-500 animate-float" />
        </div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-primary-600">Manaal</span> Writes
        </h1>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;