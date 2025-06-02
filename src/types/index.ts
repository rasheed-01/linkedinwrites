export interface Post {
  content: string;
  formattedContent: string;
}

export type PostStyle = 'storytelling' | 'listicle' | 'inspiration' | 'question' | 'default';

export interface PostTemplate {
  id: string;
  title: string;
  style: PostStyle;
  template: string;
}