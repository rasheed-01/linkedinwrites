import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostEditor from './components/PostEditor';
import PostPreview from './components/PostPreview';
import TemplateGallery from './components/TemplateGallery';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [formattedContent, setFormattedContent] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePreviewUpdate = (newContent: string) => {
    setFormattedContent(newContent);
  };

  const handleTemplateSelect = (templateContent: string) => {
    setContent(templateContent);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Transform Your LinkedIn Posts</h2>
          <p className="text-gray-600 mb-8">
            Turn ordinary content into attention-grabbing LinkedIn posts that mimic viral formats.
            Select a style, customize your message, and watch it transform.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <PostEditor 
                onPreviewUpdate={handlePreviewUpdate}
                content={content}
                setContent={setContent}
              />
            </div>
            <div>
              <PostPreview content={formattedContent} />
            </div>
          </div>
        </section>
        
        <TemplateGallery onTemplateSelect={handleTemplateSelect} />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;