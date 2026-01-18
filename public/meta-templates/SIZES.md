# Meta Asset Size Guide

This directory contains templates for generating your meta assets. Use any design tool (Figma, Illustrator, Canva, etc.) to create these.

## Required Assets

### Favicon
| File | Size | Format | Location |
|------|------|--------|----------|
| favicon.svg | N/A | SVG | `/meta-media/favicon.svg` |
| favicon.ico | 32x32, 16x16 | ICO | `/favicon.ico` (optional, for legacy) |

### Apple Touch Icon
| File | Size | Format | Location |
|------|------|--------|----------|
| apple-touch-icon.png | 180x180 | PNG | `/meta-media/apple-touch-icon.png` |

### PWA / Manifest Icons
| File | Size | Format | Location |
|------|------|--------|----------|
| manifest-icon-192.png | 192x192 | PNG | `/meta-media/manifest-icon-192.png` |
| manifest-icon-512.png | 512x512 | PNG | `/meta-media/manifest-icon-512.png` |

### Open Graph Image (Facebook, LinkedIn, etc.)
| File | Size | Format | Location |
|------|------|--------|----------|
| og-image.png | 1200x630 | PNG/JPG | `/meta-media/og-image.png` |

**Tips for OG Image:**
- Include your logo and tagline
- Use high contrast for readability in feeds
- Keep important content in the center (may be cropped)
- Use 72 DPI

### Twitter Card Image
| File | Size | Format | Location |
|------|------|--------|----------|
| twitter-card.png | 1200x600 | PNG/JPG | `/meta-media/twitter-card.png` |

**Tips for Twitter Card:**
- Similar to OG image but slightly shorter aspect ratio
- Twitter crops from the sides on mobile
- Keep text readable at small sizes

### Logo Files
| File | Size | Format | Location |
|------|------|--------|----------|
| logo.svg | Variable (h: ~32px) | SVG | `/logo.svg` |
| logo.png | Variable | PNG | `/meta-media/logo.png` (for JSON-LD) |

## Quick Checklist

Before launch, ensure you have:

- [ ] favicon.svg (32x32 viewBox)
- [ ] apple-touch-icon.png (180x180)
- [ ] manifest-icon-192.png (192x192)
- [ ] manifest-icon-512.png (512x512)
- [ ] og-image.png (1200x630)
- [ ] twitter-card.png (1200x600)
- [ ] logo.svg (for header/footer)

## Tools

- **Favicon Generator**: https://realfavicongenerator.net/
- **Social Preview**: https://socialsharepreview.com/
- **OG Image Debugger**: https://developers.facebook.com/tools/debug/

## Tips

1. **SVG Favicon**: Modern browsers support SVG favicons. They look crisp at any size and support dark mode via `prefers-color-scheme`.

2. **Keep it Simple**: Icons should be recognizable at small sizes. Avoid text and fine details.

3. **Test Everywhere**: Preview your OG/Twitter images on actual social platforms before launch.

4. **Optimize Images**: Use WebP where supported, or compress PNGs with tools like TinyPNG.
