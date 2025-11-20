# Layouts

> **Category**: Core | **Related Concepts**: [Pages](./pages.md), [Directory Structure](./directory-structure.md)  
> **Last Updated**: 2024

## 📖 Overview

Layouts in the App Router allow you to create shared UI that wraps multiple pages. They persist across navigation, maintain state, and can be nested to create complex UI hierarchies. Unlike pages, layouts don't re-render when navigating between child routes.

**Key Points:**
- Shared UI across multiple pages
- Persist across navigation
- Can be nested for complex structures
- Don't re-render on navigation
- Perfect for navigation, headers, footers

## 🎯 When to Use

- **Shared Navigation**: Header, footer, sidebar
- **Common UI Elements**: Theme providers, modals, notifications
- **Nested Structures**: Different layouts for different sections
- **State Persistence**: Keep state when navigating
- **Route Organization**: Group routes with shared UI

## 💻 Basic Example

### Root Layout

```typescript
// app/layout.tsx - Required root layout
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 My App</p>
        </footer>
      </body>
    </html>
  )
}
```

### Nested Layout

```typescript
// app/dashboard/layout.tsx - Dashboard layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <aside>
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/settings">Settings</a>
          <a href="/dashboard/profile">Profile</a>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  )
}

// app/dashboard/page.tsx - Uses DashboardLayout
export default function DashboardPage() {
  return <h1>Dashboard</h1>
}
```

## 🔧 Advanced Example

### Multiple Nested Layouts

```typescript
// app/layout.tsx - Root layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RootHeader />
        {children}
        <RootFooter />
      </body>
    </html>
  )
}

// app/blog/layout.tsx - Blog section layout
export default function BlogLayout({ children }) {
  return (
    <div className="blog-layout">
      <BlogSidebar />
      <article>{children}</article>
    </div>
  )
}

// app/blog/[slug]/layout.tsx - Individual post layout
export default function PostLayout({ children }) {
  return (
    <div className="post-layout">
      <PostHeader />
      {children}
      <PostFooter />
    </div>
  )
}
```

### Layout with Metadata

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'Welcome to my app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// app/blog/layout.tsx - Override metadata for blog section
export const metadata: Metadata = {
  title: 'Blog - My App',
  description: 'Read our latest blog posts',
}

export default function BlogLayout({ children }) {
  return <div className="blog">{children}</div>
}
```

### Layout with Providers

```typescript
// app/layout.tsx
import { ThemeProvider } from './providers/theme-provider'
import { AuthProvider } from './providers/auth-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Simple Shared Layout
```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```
**When to use**: Basic shared UI across all pages

### Pattern 2: Section-Specific Layouts
```typescript
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  return (
    <div>
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </div>
  )
}
```
**When to use**: Different layouts for different sections

### Pattern 3: Layout with State
```typescript
// app/dashboard/layout.tsx
'use client'

import { useState } from 'react'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div>
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        Toggle Sidebar
      </button>
      {sidebarOpen && <Sidebar />}
      <main>{children}</main>
    </div>
  )
}
```
**When to use**: Layouts that need client-side interactivity

## ⚠️ Common Mistakes

### Mistake 1: Using Layout as Page
```typescript
// ❌ Wrong: Using layout.tsx to create a route
// app/about/layout.tsx
export default function AboutLayout() {
  return <h1>About</h1> // This won't create /about route
}
```
**Why**: Layouts don't create routes, only `page.tsx` does.

```typescript
// ✅ Correct: Use page.tsx for routes
// app/about/page.tsx
export default function AboutPage() {
  return <h1>About</h1> // Creates /about route
}
```

### Mistake 2: Not Including children
```typescript
// ❌ Wrong: Missing children prop
export default function Layout() {
  return <div>Layout</div> // Children won't render
}
```
**Why**: Layouts must render `children` to display page content.

```typescript
// ✅ Correct: Always include children
export default function Layout({ children }) {
  return <div>{children}</div>
}
```

### Mistake 3: Re-rendering on Navigation
```typescript
// ❌ Wrong: Expecting layout to re-render
'use client'

export default function Layout({ children }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    console.log('Layout rendered') // Only logs once
  }, [])
  // Layout doesn't re-render on navigation
}
```
**Why**: Layouts persist and don't re-render on navigation.

```typescript
// ✅ Correct: Understand layout persistence
// Use pages for navigation-dependent logic
```

## ✨ Best Practices

1. **Use root layout**: Always have `app/layout.tsx`
2. **Nest layouts**: Create section-specific layouts
3. **Include children**: Always render the `children` prop
4. **Add metadata**: Set metadata in layouts
5. **Use route groups**: Organize layouts with route groups
6. **Keep layouts simple**: Move complex logic to pages
7. **Client components**: Use `'use client'` only when needed

## 🔗 Related Concepts

- [Pages](./pages.md) - Creating pages
- [Directory Structure](./directory-structure.md) - File organization
- [Server Components](./server-components.md) - Default component type

## 📚 Resources

### Official Documentation
- [Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts)
- [Nested Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts)

## 🧪 Practice Exercises

### Exercise 1: Create Nested Layouts
**Difficulty**: Beginner  
**Goal**: Understand layout nesting  
**Instructions**:
1. Create root layout with header/footer
2. Create blog section with its own layout
3. Create dashboard section with sidebar layout
4. Test navigation between sections

### Exercise 2: Layout with Providers
**Difficulty**: Intermediate  
**Goal**: Use layouts for context providers  
**Instructions**:
1. Create theme provider
2. Add to root layout
3. Create auth provider
4. Add to dashboard layout
5. Use providers in pages

## 🎓 Key Takeaways

- Layouts create shared UI across pages
- Layouts persist across navigation
- Can be nested for complex structures
- Must always render `children` prop
- Perfect for navigation, headers, footers
- Use route groups to organize layouts

## ❓ FAQ

### Q: Do layouts re-render on navigation?
**A**: No, layouts persist and don't re-render when navigating between child routes.

### Q: Can I have multiple root layouts?
**A**: No, only one root layout (`app/layout.tsx`) is allowed.

### Q: Can layouts be client components?
**A**: Yes, use `'use client'` when you need client-side features in layouts.

### Q: How do nested layouts work?
**A**: Child layouts wrap their parent layouts, creating a nested UI structure.

### Q: Can I pass props to layouts?
**A**: No, layouts only receive the `children` prop. Use context or other patterns for data sharing.

---

**Next Steps**: 
- Review: [Pages](./pages.md) for creating routes
- Practice: Create a multi-section app with nested layouts
- Build: A dashboard with sidebar layout

