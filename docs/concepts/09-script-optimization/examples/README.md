# Script Optimization Examples

This directory contains practical code examples demonstrating Next.js script optimization.

## Examples

### 1. Basic Script (`01-basic-script.tsx`)
Demonstrates basic next/script usage:
- After Interactive (default)
- Lazy Onload
- Before Interactive
- Inline scripts

### 2. Analytics (`02-analytics.tsx`)
Shows analytics integration:
- Google Analytics
- Analytics with callbacks
- Chat widgets
- Multiple third-party scripts

## How to Use

1. **Copy the code** from example files
2. **Create corresponding files** in your `app/` directory
3. **Replace script URLs** with your actual scripts
4. **Run your app**: `npm run dev`
5. **Test scripts**: Verify script loading

## Key Concepts

- Use `next/script` for all third-party scripts
- Choose appropriate loading strategy
- `beforeInteractive` only works in layout
- Add ID for inline scripts
- Use callbacks for monitoring

## Next Steps

- Review detailed guides in parent directory
- Practice adding scripts to your app
- Optimize script loading for performance

