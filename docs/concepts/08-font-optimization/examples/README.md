# Font Optimization Examples

This directory contains practical code examples demonstrating Next.js font optimization.

## Examples

### 1. Google Fonts (`01-google-fonts.tsx`)
Demonstrates using Google Fonts:
- Single Google Font
- Multiple Google Fonts
- Font with specific weights
- Font with CSS variables

### 2. Local Fonts (`02-local-fonts.tsx`)
Shows using local font files:
- Single local font
- Multiple font files
- Local font with CSS variables
- Variable fonts

## How to Use

1. **Copy the code** from example files
2. **Create corresponding files** in your `app/` directory
3. **For local fonts**: Add font files to `app/fonts/` directory
4. **Run your app**: `npm run dev`
5. **Test fonts**: Verify font loading and optimization

## File Structure

```
app/
├── layout.tsx              # Root layout with fonts
├── fonts/                  # Local font files (if using)
│   ├── MyFont.woff2
│   └── ...
└── page.tsx                # Pages using fonts
```

## Key Concepts

- Use `next/font/google` for Google Fonts
- Use `localFont` for custom fonts
- Apply fonts to root layout
- Use CSS variables for multiple fonts
- Fonts are automatically optimized

## Next Steps

- Review detailed guides in parent directory
- Practice adding fonts to your app
- Optimize fonts for performance

