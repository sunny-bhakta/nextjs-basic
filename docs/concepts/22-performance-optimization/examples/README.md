# Performance Optimization Examples

This directory contains practical code examples demonstrating performance optimization in Next.js.

## Examples

### 1. Code Splitting (`01-code-splitting.tsx`)
Demonstrates code splitting:
- Automatic code splitting
- Route-based splitting
- Component splitting

### 2. Dynamic Imports (`02-dynamic-imports.tsx`)
Shows dynamic imports:
- Lazy loading components
- Conditional loading
- SSR control

### 3. Bundle Optimization (`03-bundle-optimization.tsx`)
Demonstrates bundle optimization:
- Tree shaking
- External dependencies
- Bundle analysis

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Run your Next.js app**: `npm run dev`
4. **Analyze bundle size**: Use bundle analyzer
5. **Monitor performance**: Check Web Vitals

## Key Concepts

### Code Splitting
- Automatic in App Router
- Route-based splitting
- Component-level splitting

### Dynamic Imports
- Lazy load components
- Reduce initial bundle
- Improve load times

### Bundle Optimization
- Tree shaking
- External dependencies
- Code minification

## Best Practices

1. **Use dynamic imports**: For heavy components
2. **Monitor bundle size**: Regular analysis
3. **Optimize dependencies**: Remove unused code
4. **Lazy load**: Below-the-fold content
5. **Track metrics**: Web Vitals

