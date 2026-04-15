import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  description: string;
  keywords: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  category?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

// Vite-specific way to load local files
const postFiles = import.meta.glob('/posts/*.md', { query: '?raw', eager: true });

export function getAllPosts(): PostMetadata[] {
  return Object.keys(postFiles).map((path) => {
    const content = (postFiles[path] as any).default;
    const { data } = matter(content);
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    return {
      ...(data as any),
      slug,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const path = `/posts/${slug}.md`;
  const file = postFiles[path];
  
  if (!file) return null;
  
  const contentRaw = (file as any).default;
  const { data, content } = matter(contentRaw);
  
  return {
    ...(data as any),
    slug,
    content,
  };
}
