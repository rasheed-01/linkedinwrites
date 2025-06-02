import { PostStyle } from '../types';

export const formatLinkedInPost = (content: string, style: PostStyle): string => {
  if (!content.trim()) return '';
  
  let formattedContent = content;
  
  // Common LinkedIn post formatting patterns
  switch (style) {
    case 'storytelling':
      formattedContent = formatStorytellingStyle(content);
      break;
    case 'listicle':
      formattedContent = formatListicleStyle(content);
      break;
    case 'inspiration':
      formattedContent = formatInspirationStyle(content);
      break;
    case 'question':
      formattedContent = formatQuestionStyle(content);
      break;
    default:
      formattedContent = formatDefaultStyle(content);
  }

    const toBold = (text: string): string => {
  return `**${text}**`;
};
  
 formattedContent = formattedContent.replace(/([^.!?]*\*\*[^.!?]*\*\*[^.!?]*[.!?])/g, (match) => {
  const cleanSentence = match.replace(/\*\*/g, '').trim();
  return toBold(cleanSentence);
});


  
  // Add hashtags if they don't exist
  if (!/#\w+/.test(formattedContent)) {
    formattedContent += suggestHashtags(content);
  }
  
  return formattedContent;
};

const formatStorytellingStyle = (content: string): string => {
  const sentences = content.split(/(?<=[.!?])\s+/);
  
  // Short, impactful opening
  if (sentences.length > 3) {
    sentences[0] = `**${sentences[0].trim()}**\n\n`;
    sentences[1] = `${sentences[1].trim()}\n\n`;
  }
  
  // Add emojis if none present
  if (!containsEmoji(content)) {
    sentences.forEach((sentence, index) => {
      if (index < 3 && isEmotionalSentence(sentence)) {
        const emoji = selectEmoji(sentence);
        sentences[index] = `${sentence.trim()} ${emoji}\n\n`;
      }
    });
  }
  
  // Add a hook/lesson at the end
  if (sentences.length > 4) {
    sentences[sentences.length - 2] = `\n**The lesson?**\n\n${sentences[sentences.length - 2].trim()}\n\n`;
  }
  
  return sentences.join(' ').replace(/\n\s+/g, '\n');
};

const formatListicleStyle = (content: string): string => {
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  // Convert to numbered list if not already
  let formattedParagraphs: string[] = [];
  let hasNumberedList = false;
  
  // Add a strong opening
  formattedParagraphs.push(`**${paragraphs[0].trim()}**\n\n`);
  
  if (paragraphs.length > 1) {
    formattedParagraphs.push(`${paragraphs[1].trim()}\n\n`);
  }
  
  // Look for list items and format them
  const listItems = paragraphs.filter(p => !p.match(/^\d+\./)).slice(2);
  
  if (listItems.length >= 3) {
    formattedParagraphs.push(`**Here are ${listItems.length} things you need to know:**\n\n`);
    
    listItems.forEach((item, index) => {
      formattedParagraphs.push(`${index + 1}. ${item.trim()}\n`);
      hasNumberedList = true;
    });
    
    formattedParagraphs.push(`\n**The best part?**\n\n`);
    formattedParagraphs.push(`You can start applying these today.\n\n`);
    formattedParagraphs.push(`**Which one resonates with you?**\n\n`);
  } else {
    // If not enough items for a list, format as regular paragraphs
    paragraphs.slice(2).forEach(p => {
      formattedParagraphs.push(`${p.trim()}\n\n`);
    });
  }
  
  return formattedParagraphs.join('');
};

const formatInspirationStyle = (content: string): string => {
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  // Inspirational posts often start with a hook
  let formattedParagraphs: string[] = [];
  
  // Add a powerful opening
  if (paragraphs.length > 0) {
    formattedParagraphs.push(`**${paragraphs[0].trim()}**\n\n`);
  }
  
  // Add a personal note
  if (paragraphs.length > 1) {
    formattedParagraphs.push(`${paragraphs[1].trim()}\n\n`);
  }
  
  // Format middle paragraphs with line breaks for emphasis
  const middleParagraphs = paragraphs.slice(2, -1);
  if (middleParagraphs.length > 0) {
    // Check if we should format as bullet points
    if (middleParagraphs.length >= 3 && middleParagraphs.every(p => p.length < 50)) {
      formattedParagraphs.push(`**Sometimes you'll feel like:**\n`);
      middleParagraphs.forEach(p => {
        formattedParagraphs.push(`- ${p.trim()}\n`);
      });
      formattedParagraphs.push(`\n`);
    } else {
      middleParagraphs.forEach(p => {
        formattedParagraphs.push(`${p.trim()}\n\n`);
      });
    }
  }
  
  // Add a strong conclusion with short, impactful sentences
  if (paragraphs.length > 3) {
    const conclusion = paragraphs[paragraphs.length - 1];
    const conclusionSentences = conclusion.split(/(?<=[.!?])\s+/);
    
    conclusionSentences.forEach(sentence => {
      if (sentence.trim().length > 0) {
        formattedParagraphs.push(`**${sentence.trim()}**\n\n`);
      }
    });
  }
  
  return formattedParagraphs.join('');
};

const formatQuestionStyle = (content: string): string => {
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  let formattedParagraphs: string[] = [];
  
  // Start with a question
  if (paragraphs.length > 0) {
    const firstParagraph = paragraphs[0];
    if (!firstParagraph.endsWith('?')) {
      formattedParagraphs.push(`**${firstParagraph.trim()}?**\n\n`);
    } else {
      formattedParagraphs.push(`**${firstParagraph.trim()}**\n\n`);
    }
  }
  
  // Add a personal reflection
  if (paragraphs.length > 1) {
    formattedParagraphs.push(`${paragraphs[1].trim()}\n\n`);
  }
  
  // Add some points with checkmarks
  const middleParagraphs = paragraphs.slice(2, -1);
  if (middleParagraphs.length > 2) {
    formattedParagraphs.push(`**It's about:**\n\n`);
    middleParagraphs.forEach(p => {
      formattedParagraphs.push(`✅ ${p.trim()}\n`);
    });
    formattedParagraphs.push(`\n`);
  } else {
    middleParagraphs.forEach(p => {
      formattedParagraphs.push(`${p.trim()}\n\n`);
    });
  }
  
  // Add a call for engagement
  formattedParagraphs.push(`**How do you feel about this?**\n\n`);
  formattedParagraphs.push(`Genuinely curious to hear your thoughts below.\n\n`);
  
  return formattedParagraphs.join('');
};

const formatDefaultStyle = (content: string): string => {
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  // Simple formatting with line breaks between paragraphs
  return paragraphs.map(p => `${p.trim()}\n\n`).join('');
};

const containsEmoji = (text: string): boolean => {
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return emojiRegex.test(text);
};

const isEmotionalSentence = (sentence: string): boolean => {
  const emotionalWords = [
    'happy', 'sad', 'excited', 'disappointed', 'amazed', 'shocked', 'surprised',
    'love', 'hate', 'feel', 'felt', 'devastated', 'thrilled', 'proud', 'scared',
    'worried', 'anxious', 'grateful', 'thankful', 'angry', 'frustrated'
  ];
  
  return emotionalWords.some(word => 
    sentence.toLowerCase().includes(word)
  );
};

const selectEmoji = (sentence: string): string => {
  const sentimentMap: Record<string, string[]> = {
    positive: ['😊', '🙌', '💪', '🚀', '✨', '🎯', '🔥', '👏', '😁', '🤩'],
    negative: ['😔', '😞', '😢', '😨', '😰', '😓', '😕', '😟', '😤', '😠'],
    neutral: ['🤔', '💭', '📝', '📌', '💡', '👀', '📊', '🧐', '🔍', '⏱️']
  };
  
  const positiveWords = [
    'happy', 'excited', 'amazed', 'love', 'thrilled', 'proud', 'grateful', 
    'thankful', 'success', 'achieved', 'accomplished', 'won', 'celebrate'
  ];
  
  const negativeWords = [
    'sad', 'disappointed', 'shocked', 'hate', 'devastated', 'scared',
    'worried', 'anxious', 'angry', 'frustrated', 'failed', 'lost', 'mistake'
  ];
  
  if (positiveWords.some(word => sentence.toLowerCase().includes(word))) {
    const randomIndex = Math.floor(Math.random() * sentimentMap.positive.length);
    return sentimentMap.positive[randomIndex];
  } else if (negativeWords.some(word => sentence.toLowerCase().includes(word))) {
    const randomIndex = Math.floor(Math.random() * sentimentMap.negative.length);
    return sentimentMap.negative[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * sentimentMap.neutral.length);
    return sentimentMap.neutral[randomIndex];
  }
};

const suggestHashtags = (content: string): string => {
  const commonHashtags: Record<string, string[]> = {
    career: ['#CareerAdvice', '#JobSearch', '#CareerGrowth', '#Leadership', '#Networking'],
    tech: ['#Tech', '#Innovation', '#AI', '#MachineLearning', '#Programming', '#SoftwareDevelopment'],
    business: ['#Entrepreneurship', '#StartUp', '#Business', '#Marketing', '#Sales'],
    personal: ['#PersonalDevelopment', '#Growth', '#Mindset', '#Success', '#Motivation'],
    productivity: ['#Productivity', '#TimeManagement', '#Focus', '#Efficiency', '#WorkSmarter']
  };
  
  // Detect themes in the content
  const lowerContent = content.toLowerCase();
  const detectedThemes: string[] = [];
  
  Object.keys(commonHashtags).forEach(theme => {
    const themeWords = theme.split(/\s+/);
    if (themeWords.some(word => lowerContent.includes(word))) {
      detectedThemes.push(theme);
    }
  });
  
  // If no theme detected, use personal (most common on LinkedIn)
  if (detectedThemes.length === 0) {
    detectedThemes.push('personal');
  }
  
  // Get hashtags for detected themes
  const suggestedHashtags: string[] = [];
  detectedThemes.forEach(theme => {
    const themeHashtags = commonHashtags[theme];
    if (themeHashtags) {
      // Get 2 random hashtags from each detected theme
      const randomHashtags = themeHashtags
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      
      suggestedHashtags.push(...randomHashtags);
    }
  });
  
  // Take unique hashtags
  const uniqueHashtags = [...new Set(suggestedHashtags)];
  
  // Take at most 3 hashtags
  const finalHashtags = uniqueHashtags.slice(0, 3);
  
  return `\n\n${finalHashtags.join(' ')}`;
};