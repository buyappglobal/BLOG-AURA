import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://blog.auradisplay.es';

function generateSitemap() {
  const postsDir = path.resolve(process.cwd(), 'posts');
  const publicDir = path.resolve(process.cwd(), 'public');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const posts = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data } = matter(content);
      return {
        slug: file.replace('.md', ''),
        date: data.date || new Date().toISOString().split('T')[0]
      };
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${BASE_URL}/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully in public/sitemap.xml');
}

generateSitemap();
