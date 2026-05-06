import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import matter from 'gray-matter';

// Helper to get all posts for static generation
function getStaticPosts() {
  const postsDir = path.resolve(process.cwd(), 'posts');
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Static Generation Logic for SEO and Direct Access
  const slugs = getStaticPosts();
  const distPath = path.resolve(process.cwd(), 'dist');
  const indexPath = path.resolve(process.cwd(), 'index.html');

  // API Route for Dynamic OG Images
  app.get("/api/og", async (req, res) => {
    // ... (keep existing OG logic)
    try {
      const { title, category } = req.query;
      
      const categoryColors: Record<string, string> = {
        'Retail': '#d4af37', // Gold
        'Hostelería': '#3b82f6', // Blue
        'Partners': '#10b981', // Emerald
        'Ecosistema': '#7c3aed', // Purple
      };

      const isSmartCityPost = title?.toString().includes('Smart Cities');
      const accentColor = isSmartCityPost ? '#10b981' : (categoryColors[category as string] || '#d4af37');

      const footerText = isSmartCityPost 
        ? 'Eficiencia Pública • Comunicación Ciudadana • Smart City'
        : 'Neuro-Arquitectura • Biometría Sonora • Legal Tech';

      const tickerText = isSmartCityPost
        ? 'AVISO: Inscripciones abiertas para los talleres de verano'
        : '';
        
      // Corrected: Using a hardcoded font URL might fail if it's not reachable. 
      // But keeping it to match the existing server.ts logic.
      const fontResponse = await fetch("https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff");
      const fontData = await fontResponse.arrayBuffer();

      const svg = await satori(
        {
          type: 'div',
          props: {
            style: {
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              backgroundColor: '#050505',
              backgroundImage: `radial-gradient(circle at top right, ${accentColor}22 0%, transparent 70%), radial-gradient(circle at bottom left, #111 0%, transparent 70%)`,
              padding: '80px',
              fontFamily: 'Inter',
              color: 'white',
              position: 'relative',
            },
            children: [
              // Logo
              {
                type: 'div',
                props: {
                  style: {
                    position: 'absolute',
                    top: '60px',
                    left: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  },
                  children: [
                    { type: 'div', props: { style: { width: '40px', height: '40px', backgroundColor: accentColor, borderRadius: '8px' } } },
                    { type: 'span', props: { style: { fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.05em' }, children: 'AURA BUSINESS' } }
                  ]
                }
              },
              // Category Badge
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    backgroundColor: `${accentColor}22`,
                    border: `1px solid ${accentColor}44`,
                    marginBottom: '40px',
                  },
                  children: [
                    { type: 'span', props: { style: { fontSize: '18px', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.1em' }, children: category || 'Ecosistema' } }
                  ]
                }
              },
              // Title
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: '64px',
                    fontWeight: 'bold',
                    lineHeight: 1.1,
                    marginBottom: '40px',
                    maxWidth: '900px',
                    letterSpacing: '-0.02em',
                  },
                  children: title || 'Aura Business Insights'
                }
              },
              // Footer
              {
                type: 'div',
                props: {
                  style: {
                    position: 'absolute',
                    bottom: tickerText ? '100px' : '60px',
                    left: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    color: '#666',
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                  },
                  children: footerText.split(' • ').map((text, i, arr) => [
                    { type: 'span', props: { children: text } },
                    ...(i < arr.length - 1 ? [{ type: 'div', props: { style: { width: '4px', height: '4px', backgroundColor: '#333', borderRadius: '50%' } } }] : [])
                  ]).flat()
                }
              }
            ]
          }
        } as any,
        {
          width: 1200,
          height: 630,
          fonts: [{ name: 'Inter', data: fontData, weight: 700, style: 'normal' }],
        }
      );

      const resvg = new Resvg(svg);
      const pngBuffer = resvg.render().asPng();

      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.send(pngBuffer);
    } catch (error) {
      console.error("OG Generation Error:", error);
      res.status(500).send("Error generating image");
    }
  });

  // API Route to fetch all blog posts content
  app.get("/api/posts-context", async (req, res) => {
    try {
      const postsDir = path.resolve(process.cwd(), 'posts');
      const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
      
      const postsContent = files.map(file => {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: body } = matter(content);
        return `---
Title: ${data.title}
Category: ${data.category}
---\n${body}`;
      }).join('\n\n---POST END---\n\n');
      
      res.json({ context: postsContent });
    } catch (error) {
      console.error("Error reading posts context:", error);
      res.status(500).send("Error reading posts");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);

    // SPA Fallback for development
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      // If it's a file request (has a dot) or an API call, let it pass
      if (url.includes('.') || url.startsWith('/api')) {
        return next();
      }

      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    
    // Serve static files from dist
    app.use(express.static(distPath));

    // Handle all other routes by serving index.html (SPA Fallback)
    app.get('*', (req, res) => {
      const indexPath = path.resolve(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Not Found');
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
