import React from 'react';
import { Sparkles } from 'lucide-react';

interface PostPreviewProps {
  content: string;
}

const PostPreview: React.FC<PostPreviewProps> = ({ content }) => {
  const formattedHtml = content
    .split('\n')
    .map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <div className="bg-white rounded-lg shadow-pink overflow-hidden animate-fade-in">
      <div className="bg-primary-50 p-4 border-b border-primary-100 flex items-center">
        <Sparkles className="h-6 w-6 text-primary-500 mr-2 animate-sparkle" />
        <h3 className="text-primary-700 font-medium">LinkedIn Post Preview</h3>
      </div>
      
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 font-bold text-lg mr-3">
            MW
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Manaal Waheed Khan</h4>
            <p className="text-primary-500 text-sm">Smartest Woman on The Planet</p>
            <p className="text-gray-400 text-xs">1d • Edited • 🌎</p>
          </div>
        </div>
        
        <div className="mb-4 whitespace-pre-wrap font-light text-gray-800">
          {content ? formattedHtml : (
            <p className="text-gray-400 italic">Your formatted post will appear here...</p>
          )}
        </div>
        
        {content && (
          <div className="pt-4 border-t border-primary-50">
            <div className="flex justify-between text-gray-500 text-sm">
              <div className="flex items-center">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-white text-xs mr-1">👍</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-white text-xs mr-1">❤️</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-400 text-white text-xs mr-1">💝</span>
                <span className="ml-1">842</span>
              </div>
              <div>
                <span>123 comments • 45 reposts</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPreview;