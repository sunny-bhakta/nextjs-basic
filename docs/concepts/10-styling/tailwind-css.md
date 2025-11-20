# Tailwind CSS

> **Category**: Core | **Related Concepts**: [CSS Modules](./css-modules.md), [Global CSS](./global-css.md)  
> **Last Updated**: 2024

## 📖 Overview

Tailwind CSS is a utility-first CSS framework that works seamlessly with Next.js. It provides low-level utility classes to build custom designs quickly.

**Key Points:**
- Utility-first CSS
- Fast development
- Small production bundle
- Highly customizable
- Responsive design
- Dark mode support

## 🎯 When to Use

- **Rapid Development**: When you need to build quickly
- **Custom Designs**: When you need full design control
- **Utility Classes**: When you prefer utility classes
- **Modern Projects**: When starting new projects
- **Component Libraries**: When building component libraries

## 💻 Basic Example

### Setup

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

### Basic Usage

```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600">Hello World</h1>
    </div>
  )
}
```

### Responsive Design

```typescript
// app/components/ResponsiveCard.tsx
export default function ResponsiveCard() {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Card Title</h2>
        <p className="text-gray-600">Card content</p>
      </div>
    </div>
  )
}
```

## 🔧 Advanced Example

### Custom Theme

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
export default config
```

### Dark Mode

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class', // or 'media'
  // ...
}

// app/page.tsx
export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <h1 className="text-gray-900 dark:text-white">Hello</h1>
    </div>
  )
}
```

### Custom Components

```typescript
// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
  }
}

// app/page.tsx
export default function HomePage() {
  return <button className="btn-primary">Click me</button>
}
```

## 📋 Common Patterns

### Pattern 1: Utility Classes
```typescript
<div className="flex items-center justify-between p-4">
```
**When to use**: Standard utility classes

### Pattern 2: Responsive
```typescript
<div className="w-full md:w-1/2 lg:w-1/3">
```
**When to use**: Responsive layouts

### Pattern 3: Custom Components
```typescript
@layer components {
  .btn { @apply ... }
}
```
**When to use**: Reusable component styles

## ⚠️ Common Mistakes

### Mistake 1: Not Configuring Content
```typescript
// ❌ Wrong: Missing content paths
const config = { theme: {...} }
// Tailwind won't find your classes
```
**Why**: Tailwind needs to know where to look for classes.

```typescript
// ✅ Correct: Configure content
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
}
```

### Mistake 2: Using Arbitrary Values Incorrectly
```typescript
// ❌ Wrong: Missing brackets
<div className="w-123px">
```
**Why**: Arbitrary values need brackets.

```typescript
// ✅ Correct: Use brackets
<div className="w-[123px]">
```

### Mistake 3: Not Purging
```typescript
// ❌ Wrong: All classes included
// Large bundle size
```
**Why**: Tailwind should purge unused classes in production.

```typescript
// ✅ Correct: Tailwind auto-purges in production
// Only used classes are included
```

## ✨ Best Practices

1. **Configure content**: Specify all file paths
2. **Use utilities**: Prefer utility classes
3. **Customize theme**: Extend theme for brand colors
4. **Use dark mode**: Support dark mode
5. **Optimize bundle**: Let Tailwind purge unused classes
6. **Use components layer**: For reusable styles

## 🔗 Related Concepts

- [CSS Modules](./css-modules.md) - Scoped CSS
- [Global CSS](./global-css.md) - Global styles

## 📚 Resources

### Official Documentation
- [Tailwind CSS](https://tailwindcss.com)
- [Next.js with Tailwind](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)

## 🧪 Practice Exercises

### Exercise 1: Basic Setup
**Difficulty**: Beginner  
**Goal**: Understand Tailwind setup  
**Instructions**:
1. Install Tailwind
2. Configure tailwind.config
3. Create styled components
4. Test responsive design

### Exercise 2: Custom Theme
**Difficulty**: Intermediate  
**Goal**: Practice customization  
**Instructions**:
1. Customize colors
2. Add custom fonts
3. Create component classes
4. Test dark mode

## 🎓 Key Takeaways

- Utility-first CSS framework
- Fast development with utility classes
- Small production bundle (purged)
- Highly customizable
- Responsive and dark mode support
- Works seamlessly with Next.js

## ❓ FAQ

### Q: How do I install Tailwind?
**A**: Run `npx create-next-app --tailwind` or install manually and configure.

### Q: Can I use custom CSS?
**A**: Yes, use `@layer` directives or regular CSS files.

### Q: How does purging work?
**A**: Tailwind automatically removes unused classes in production builds.

### Q: Can I use CSS modules with Tailwind?
**A**: Yes, but it's not recommended. Use Tailwind utilities instead.

### Q: How do I customize colors?
**A**: Extend the theme in `tailwind.config.ts`.

---

**Next Steps**: 
- Review: [CSS Modules](./css-modules.md) for alternative approach
- Practice: Build components with Tailwind
- Build: Create a styled application

