import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-100 border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            Built by Rasheed &copy; {new Date().getFullYear()}
          </p>
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-600 hover:text-[#0A66C2] text-sm transition-colors duration-200"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-[#0A66C2] text-sm transition-colors duration-200"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-[#0A66C2] text-sm transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;