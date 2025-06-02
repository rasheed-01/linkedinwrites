import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-pink-100 border-b border-primary-100 sticky top-0 z-10 shadow-pink">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 animate-slide-in">
          <Sparkles className="h-8 w-8 text-primary-500 animate-float" />
          <h1 className="text-xl font-bold text-gray-800">
            <span className="text-primary-500">Manaal</span> Writes
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#templates" 
                className="text-gray-600 hover:text-primary-500 transition-colors duration-200"
              >
                Templates
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;