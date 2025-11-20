# CSS Modules

> **Category**: Core | **Related Concepts**: [Tailwind CSS](./tailwind-css.md), [Global CSS](./global-css.md)  
> **Last Updated**: 2024

## 📖 Overview

CSS Modules provide scoped CSS by automatically generating unique class names. This prevents style conflicts and makes CSS more maintainable.

**Key Points:**
- Scoped CSS classes
- No naming conflicts
- Type-safe with TypeScript
- Component-scoped styles
- Easy to maintain
- Works with Next.js

## 🎯 When to Use

- **Component Styles**: When you want component-scoped styles
- **Avoid Conflicts**: When you want to avoid CSS conflicts
- **Type Safety**: When using TypeScript
- **Traditional CSS**: When you prefer traditional CSS
- **Team Preference**: When team prefers CSS modules

## 💻 Basic Example

### Basic CSS Module

```typescript
// app/components/Button.module.css
.button {
  padding: 10px 20px;
  background: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background: darkblue;
}

// app/components/Button.tsx
import styles from './Button.module.css'

export default function Button() {
  return <button className={styles.button}>Click me</button>
}
```

### Multiple Classes

```typescript
// app/components/Card.module.css
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.content {
  color: #666;
}

// app/components/Card.tsx
import styles from './Card.module.css'

export default function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Title</h2>
      <p className={styles.content}>Content</p>
    </div>
  )
}
```

### Conditional Classes

```typescript
// app/components/Button.module.css
.button {
  padding: 10px 20px;
  border-radius: 4px;
}

.primary {
  background: blue;
  color: white;
}

.secondary {
  background: gray;
  color: black;
}

// app/components/Button.tsx
import styles from './Button.module.css'
import { clsx } from 'clsx'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
    >
      Click me
    </button>
  )
}
```

## 🔧 Advanced Example

### Composition

```typescript
// app/components/base.module.css
.base {
  padding: 10px;
  border-radius: 4px;
}

// app/components/Button.module.css
.button {
  composes: base from './base.module.css';
  background: blue;
  color: white;
}
```

### TypeScript Support

```typescript
// app/components/Button.module.css.d.ts (auto-generated)
declare const styles: {
  readonly button: string;
  readonly primary: string;
}
export default styles;

// app/components/Button.tsx
import styles from './Button.module.css'

export default function Button() {
  return <button className={styles.button}>Click me</button>
}
```

### Responsive Design

```typescript
// app/components/Grid.module.css
.grid {
  display: grid;
  gap: 20px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

// app/components/Grid.tsx
import styles from './Grid.module.css'

export default function Grid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}
```

## 📋 Common Patterns

### Pattern 1: Single Class
```typescript
import styles from './Component.module.css'
<div className={styles.container}>
```
**When to use**: Simple component styling

### Pattern 2: Multiple Classes
```typescript
import styles from './Component.module.css'
<div className={`${styles.container} ${styles.active}`}>
```
**When to use**: Multiple classes needed

### Pattern 3: Conditional Classes
```typescript
import styles from './Component.module.css'
import clsx from 'clsx'
<div className={clsx(styles.container, { [styles.active]: isActive })}>
```
**When to use**: Conditional styling

## ⚠️ Common Mistakes

### Mistake 1: Not Using .module.css
```typescript
// ❌ Wrong: Regular CSS file
import './Button.css'
// Not scoped, can cause conflicts
```
**Why**: Regular CSS files are global, not scoped.

```typescript
// ✅ Correct: Use .module.css
import styles from './Button.module.css'
```

### Mistake 2: Using Global Selectors
```typescript
// ❌ Wrong: Global selector in module
.button :global(.icon) {
  color: red;
}
// Breaks scoping
```
**Why**: Avoid global selectors unless necessary.

```typescript
// ✅ Correct: Scoped classes
.button {
  /* styles */
}
.icon {
  /* styles */
}
```

### Mistake 3: Not Handling Dynamic Classes
```typescript
// ❌ Wrong: String concatenation
className={styles.button + ' ' + styles.active}
```
**Why**: Use clsx or template literals.

```typescript
// ✅ Correct: Use clsx
import clsx from 'clsx'
className={clsx(styles.button, styles.active)}
```

## ✨ Best Practices

1. **Use .module.css**: Always use module extension
2. **Scoped classes**: Keep classes scoped to component
3. **Use clsx**: For conditional classes
4. **TypeScript**: Enable TypeScript support
5. **Composition**: Use composes for shared styles
6. **Naming**: Use descriptive class names

## 🔗 Related Concepts

- [Tailwind CSS](./tailwind-css.md) - Utility-first CSS
- [Global CSS](./global-css.md) - Global styles

## 📚 Resources

### Official Documentation
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

## 🧪 Practice Exercises

### Exercise 1: Basic Module
**Difficulty**: Beginner  
**Goal**: Understand CSS modules  
**Instructions**:
1. Create a CSS module
2. Import and use styles
3. Test scoping
4. Verify no conflicts

### Exercise 2: Complex Component
**Difficulty**: Intermediate  
**Goal**: Practice advanced patterns  
**Instructions**:
1. Create component with multiple classes
2. Use conditional classes
3. Add responsive styles
4. Test all variations

## 🎓 Key Takeaways

- CSS Modules provide scoped CSS
- Use .module.css extension
- Classes are automatically scoped
- Use clsx for conditional classes
- Works great with TypeScript
- Prevents naming conflicts

## ❓ FAQ

### Q: How do CSS modules work?
**A**: Next.js automatically scopes class names by adding unique identifiers.

### Q: Can I use global styles?
**A**: Yes, use `:global()` selector or regular CSS files.

### Q: Do I need TypeScript?
**A**: No, but TypeScript provides better type safety.

### Q: Can I use CSS variables?
**A**: Yes, CSS variables work normally in CSS modules.

### Q: How do I share styles?
**A**: Use `composes` or create shared CSS module files.

---

**Next Steps**: 
- Review: [Tailwind CSS](./tailwind-css.md) for utility-first approach
- Practice: Create components with CSS modules
- Build: Style your application

