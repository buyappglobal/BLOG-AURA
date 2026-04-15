import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for Dynamic OG Images
  app.get("/api/og", async (req, res) => {
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
              // Logo placeholder / Text
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
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '40px',
                          height: '40px',
                          backgroundColor: accentColor,
                          borderRadius: '8px',
                        }
                      }
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '24px',
                          fontWeight: 'bold',
                          letterSpacing: '-0.05em',
                        },
                        children: 'AURA BUSINESS'
                      }
                    }
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
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: accentColor,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        },
                        children: category || 'Ecosistema'
                      }
                    }
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
              // Footer / Value Prop
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
              },
              // Ticker for Smart City
              ...(tickerText ? [{
                type: 'div',
                props: {
                  style: {
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '60px',
                    backgroundColor: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 80px',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: {
                          color: 'black',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        },
                        children: tickerText
                      }
                    }
                  ]
                }
              }] : [])
            ]
          }
        } as any,
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: 'Inter',
              data: fontData,
              weight: 700,
              style: 'normal',
            },
          ],
        }
      );

      const resvg = new Resvg(svg);
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.send(pngBuffer);
    } catch (error) {
      console.error("OG Generation Error:", error);
      res.status(500).send("Error generating image");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);

    // SPA Fallback for development - MUST be the last route
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      
      // Skip API routes and files with extensions
      if (url.startsWith('/api') || url.includes('.')) {
        return next();
      }

      try {
        const fs = await import('fs');
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
    app.use(express.static(distPath));
    
    // SPA Fallback for production
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
