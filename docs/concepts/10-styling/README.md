# Styling

> **Category**: Core | **Priority**: 🔴 High | **Difficulty**: Beginner  
> **Related Concepts**: [App Router](../03-app-router/README.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js supports multiple styling approaches: CSS Modules, Global CSS, Tailwind CSS, CSS-in-JS, and more. Choose based on your project needs and team preferences.

## Key Topics

- [CSS Modules](./css-modules.md) - Scoped CSS with modules
- [Global CSS](./global-css.md) - Global stylesheets
- [Tailwind CSS](./tailwind-css.md) - Utility-first CSS framework
- [CSS-in-JS](./css-in-js.md) - Styled-components, Emotion, etc.
- [Sass/SCSS](./sass.md) - CSS preprocessor support
- [Styled JSX](./styled-jsx.md) - Built-in CSS-in-JS

## Quick Start

### Tailwind CSS (Recommended)

```typescript
// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// app/page.tsx
export default function Home() {
  return <h1 className="text-4xl font-bold">Hello</h1>
}
```

### CSS Modules

```typescript
// app/components/Button.module.css
.button {
  padding: 10px 20px;
  background: blue;
}

// app/components/Button.tsx
import styles from './Button.module.css'
export default function Button() {
  return <button className={styles.button}>Click</button>
}
```

## Learning Path

1. Choose your styling approach
2. Learn [Tailwind CSS](./tailwind-css.md) (recommended)
3. Understand [CSS Modules](./css-modules.md)
4. Explore [Global CSS](./global-css.md)

## Resources

- [Styling Docs](https://nextjs.org/docs/app/building-your-application/styling)
- [Tailwind CSS](https://tailwindcss.com)

---

**Previous**: [Script Optimization](../09-script-optimization/README.md) | **Next**: [Metadata & SEO](../11-metadata-seo/README.md)

