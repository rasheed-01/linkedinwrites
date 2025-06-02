import React, { useRef } from 'react';
import { templates } from '../data/templates';
import { PostTemplate } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TemplateGalleryProps {
  onTemplateSelect: (template: string) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onTemplateSelect }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTemplateClick = (template: PostTemplate) => {
    onTemplateSelect(template.template);
  };

  return (
    <section id="templates" className="mt-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Template Gallery</h2>
      <p className="text-gray-600 mb-8">
        Need inspiration? Swipe through these templates to get started.
      </p>
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-primary-500" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {templates.map((template) => (
            <div 
              key={template.id}
              className="min-w-[400px] bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-primary-300 scroll-snap-align-start"
              onClick={() => handleTemplateClick(template)}
            >
              <h3 className="font-bold text-gray-800 mb-2">{template.title}</h3>
              <p className="text-sm text-primary-500 mb-3">Style: {template.style}</p>
              <div className="h-32 overflow-hidden text-gray-700 text-sm">
                {template.template.substring(0, 150)}...
              </div>
              <button 
                className="mt-4 text-primary-500 font-medium hover:text-primary-600 hover:underline transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTemplateClick(template);
                }}
              >
                Use This Template
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors duration-200"
        >
          <ChevronRight className="w-6 h-6 text-primary-500" />
        </button>
      </div>
    </section>
  );
};

export default TemplateGallery;