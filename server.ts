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

      const accentColor = categoryColors[category as string] || '#d4af37';

      // Load font
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
                    bottom: '60px',
                    left: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    color: '#666',
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                  },
                  children: [
                    { type: 'span', props: { children: 'Neuro-Arquitectura' } },
                    { type: 'div', props: { style: { width: '4px', height: '4px', backgroundColor: '#333', borderRadius: '50%' } } },
                    { type: 'span', props: { children: 'Biometría Sonora' } },
                    { type: 'div', props: { style: { width: '4px', height: '4px', backgroundColor: '#333', borderRadius: '50%' } } },
                    { type: 'span', props: { children: 'Legal Tech' } }
                  ]
                }
              }
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
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
