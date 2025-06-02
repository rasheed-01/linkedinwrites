import React, { useState, useRef, useEffect } from 'react';
import { formatLinkedInPost } from '../utils/formatter';
import { PostStyle } from '../types';
import { ClipboardCopy, RefreshCw, Wand2, AlertCircle, Sparkles } from 'lucide-react';
import { enhancePost } from '../firebase';

interface PostEditorProps {
  onPreviewUpdate: (formattedContent: string) => void;
  content: string;
  setContent: (content: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ onPreviewUpdate, content, setContent }) => {
  const [style, setStyle] = useState<PostStyle>('default');
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState<string | null>(null);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formattedContent = formatLinkedInPost(content, style);

  const MAX_CHARS = 3000;

  useEffect(() => {
    onPreviewUpdate(formattedContent);
  }, [formattedContent, onPreviewUpdate]);

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  useEffect(() => {
    let timer: number;
    if (retryAfter) {
      timer = window.setInterval(() => {
        setRetryAfter(prev => prev && prev > 0 ? prev - 1 : null);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [retryAfter]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStyle(e.target.value as PostStyle);
    animateFormatting();
  };

  const animateFormatting = () => {
    setIsFormatting(true);
    setTimeout(() => setIsFormatting(false), 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const enhanceWithAI = async () => {
    setIsEnhancing(true);
    setEnhanceError(null);
    try {
      const result = await enhancePost({ content, style });
      const data = result.data as { enhancedContent: string };
      setContent(data.enhancedContent);
    } catch (error: any) {
      console.error('Error enhancing post:', error);
      setEnhanceError(error.message || 'Failed to enhance post');
      if (error.code === 'functions/resource-exhausted') {
        setRetryAfter(30);
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  const getCharCountColor = () => {
    if (charCount > MAX_CHARS) return 'text-accent-500';
    if (charCount > MAX_CHARS * 0.8) return 'text-primary-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
      <div className="mb-6">
        <label 
          htmlFor="content" 
          className="block text-gray-700 font-medium mb-2"
        >
          Your Content
        </label>
        <textarea
          ref={textareaRef}
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Enter your content here..."
          className="w-full h-64 px-4 py-3 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        />
        <div className="flex justify-between items-center mt-2">
          <span className={`text-sm ${getCharCountColor()}`}>
            {charCount} / {MAX_CHARS} characters
          </span>
          {charCount > MAX_CHARS && (
            <span className="text-sm text-accent-500">
              Exceeds LinkedIn's character limit
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="w-full md:w-1/3 mr-0 md:mr-4">
          <label 
            htmlFor="style" 
            className="block text-gray-700 font-medium mb-2"
          >
            Post Style
          </label>
          <select
            id="style"
            value={style}
            onChange={handleStyleChange}
            className="w-full px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            <option value="default">Default</option>
            <option value="storytelling">Storytelling</option>
            <option value="listicle">Listicle</option>
            <option value="inspiration">Inspirational</option>
            <option value="question">Question-based</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={enhanceWithAI}
            disabled={!content || isEnhancing || retryAfter !== null}
            className={`flex items-center justify-center px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
              isEnhancing || !content || retryAfter !== null
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-pink-300 hover:bg-pink-300 hover:shadow-lg'
            }`}
          >
            {isEnhancing ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
          </button>

          <button
            onClick={copyToClipboard}
            disabled={!formattedContent}
            className={`flex items-center justify-center px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
              copied 
                ? 'bg-green-500' 
                : !formattedContent 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-pink-300 hover:bg-bg-pink-200 hover:shadow-lg'
            }`}
          >
            <ClipboardCopy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>

      {enhanceError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start animate-fade-in">
          <AlertCircle className="w-5 h-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-accent-500">{enhanceError}</p>
            {retryAfter && (
              <p className="text-primary-600 mt-1">
                Please try again in {retryAfter} seconds
              </p>
            )}
          </div>
        </div>
      )}

      {isFormatting && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <RefreshCw className="w-6 h-6 text-primary-500 animate-spin mr-3" />
            <p className="text-gray-700">Formatting your post...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEditor;