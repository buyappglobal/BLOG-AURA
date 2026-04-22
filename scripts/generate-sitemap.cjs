const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '../posts');
const publicDir = path.join(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

const baseUrl = 'https://blog.auradisplay.es';

function generateSitemap() {
  const files = fs.readdirSync(postsDir);
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/soluciones-marketing-sensorial</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  files.forEach(file => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      const slug = file.replace('.md', '');
      
      sitemap += `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${data.date || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    }
  });

  sitemap += '</urlset>';

  fs.writeFileSync(sitemapPath, sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
