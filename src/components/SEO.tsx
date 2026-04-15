import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  slug?: string;
  category?: string;
  type?: 'website' | 'article';
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  image, 
  slug = '', 
  category = 'Ecosistema',
  type = 'website' 
}: SEOProps) {
  const fullTitle = `${title} | Aura Business`;
  const url = `https://blog.auradisplay.es/${slug}`;
  
  // Dynamic OG Image URL
  const dynamicOgImage = `/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`;
  const ogImage = image || dynamicOgImage;

  useEffect(() => {
    document.title = fullTitle;
    
    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    
    // OpenGraph
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', ogImage, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:site_name', 'Aura Business', 'property');
    
    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);

    // JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? "BlogPosting" : "WebSite",
      "headline": title,
      "description": description,
      "image": ogImage,
      "url": url,
      "author": {
        "@type": "Organization",
        "name": "Aura Business Strategy Team",
        "logo": {
          "@type": "ImageObject",
          "url": "https://solonet.es/wp-content/uploads/2026/03/LOGO-AURA-BUSINESS-512-x-512-px.png"
        }
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      // Cleanup if needed, though usually not necessary for SPAs
    };
  }, [title, description, keywords, image, url, type, fullTitle]);

  return null;
}
