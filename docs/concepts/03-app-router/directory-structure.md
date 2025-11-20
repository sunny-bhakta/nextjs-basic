# Directory Structure

> **Category**: Core | **Related Concepts**: [Pages](./pages.md), [Layouts](./layouts.md)  
> **Last Updated**: 2024

## 📖 Overview

The App Router uses a file-system based routing system where the `app/` directory structure determines the routes of your application. Special file names like `page.tsx`, `layout.tsx`, and `loading.tsx` have specific meanings and create different parts of your application.

**Key Points:**
- File structure in `app/` creates routes automatically
- Special files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Folders create URL segments
- Route groups organize without affecting URLs
- Nested layouts create nested UI

## 🎯 When to Use

- **Organizing routes**: Structure your app's navigation
- **Creating layouts**: Shared UI across multiple pages
- **Handling errors**: Custom error pages
- **Loading states**: Show loading UI during data fetching
- **Route organization**: Group related routes together

## 💻 Basic Example

### Basic Structure

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── about/
│   └── page.tsx        # About page (/about)
├── blog/
│   ├── page.tsx        # Blog listing (/blog)
│   └── [slug]/
│       └── page.tsx    # Blog post (/blog/[slug])
└── contact/
    └── page.tsx        # Contact page (/contact)
```

### Root Layout

```typescript
// app/layout.tsx - Required root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Home Page

```typescript
// app/page.tsx - Creates route: /
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
    </div>
  )
}
```

## 🔧 Advanced Example

### Nested Structure with Layouts

```
app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Home (/)
├── (marketing)/                  # Route group
│   ├── layout.tsx                # Marketing layout
│   ├── about/
│   │   └── page.tsx              # /about
│   └── contact/
│       └── page.tsx              # /contact
├── (dashboard)/                  # Route group
│   ├── layout.tsx                # Dashboard layout
│   ├── dashboard/
│   │   └── page.tsx             # /dashboard
│   └── settings/
│       └── page.tsx              # /settings
└── blog/
    ├── layout.tsx                # Blog layout
    ├── page.tsx                  # /blog
    ├── [slug]/
    │   ├── page.tsx              # /blog/[slug]
    │   └── loading.tsx          # Loading UI
    └── loading.tsx               # Blog loading UI
```

### Route Groups

```typescript
// app/(marketing)/layout.tsx
// Group name doesn't appear in URL
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="marketing-layout">
      <header>Marketing Header</header>
      {children}
      <footer>Marketing Footer</footer>
    </div>
  )
}

// app/(marketing)/about/page.tsx
// URL: /about (NOT /(marketing)/about)
export default function AboutPage() {
  return <h1>About Us</h1>
}
```

## 📋 Common Patterns

### Pattern 1: Simple Nested Routes
```
app/
├── products/
│   ├── page.tsx        # /products
│   └── [id]/
│       └── page.tsx    # /products/[id]
```
**When to use**: Simple nested structure

### Pattern 2: Route Groups for Layouts
```
app/
├── (auth)/
│   ├── login/
│   └── register/
└── (main)/
    ├── about/
    └── contact/
```
**When to use**: Different layouts for different sections

### Pattern 3: Parallel Routes
```
app/
├── @analytics/
│   └── page.tsx        # Parallel route
├── @team/
│   └── page.tsx        # Parallel route
└── dashboard/
    └── page.tsx        # Main route
```
**When to use**: Multiple pages rendered simultaneously

## ⚠️ Common Mistakes

### Mistake 1: Missing Root Layout
```typescript
// ❌ Wrong: No root layout
// app/page.tsx
export default function Home() {
  return <h1>Home</h1> // Error: Missing root layout
}
```
**Why**: App Router requires a root `layout.tsx` file.

```typescript
// ✅ Correct: Include root layout
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Mistake 2: Wrong File Names
```
// ❌ Wrong: Using wrong file names
app/
├── home.tsx           # Won't create a route
└── about.tsx          # Won't create a route
```
**Why**: Only `page.tsx` creates routes.

```typescript
// ✅ Correct: Use page.tsx
app/
├── page.tsx           # Creates /
└── about/
    └── page.tsx      # Creates /about
```

### Mistake 3: Expecting Route Group in URL
```
// ❌ Wrong: Expecting group name in URL
app/(marketing)/about/page.tsx
// URL is NOT /(marketing)/about
```
**Why**: Route groups are organizational only.

```typescript
// ✅ Correct: Group name doesn't appear in URL
// app/(marketing)/about/page.tsx
// URL is: /about
```

## ✨ Best Practices

1. **Use route groups**: Organize routes without affecting URLs
2. **Nest layouts**: Create shared UI for route segments
3. **Consistent naming**: Use `page.tsx`, `layout.tsx` consistently
4. **Organize by feature**: Group related routes together
5. **Use special files**: Leverage `loading.tsx`, `error.tsx` for better UX
6. **Keep structure shallow**: Avoid deep nesting when possible
7. **Document structure**: Comment complex route organizations

## 🔗 Related Concepts

- [Pages](./pages.md) - Creating pages
- [Layouts](./layouts.md) - Shared UI
- [Pages & Routing](../01-routing/README.md) - Routing concepts

## 📚 Resources

### Official Documentation
- [App Router Directory Structure](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

## 🧪 Practice Exercises

### Exercise 1: Create Basic Structure
**Difficulty**: Beginner  
**Goal**: Understand basic directory structure  
**Instructions**:
1. Create a root layout
2. Create home page
3. Create about and contact pages
4. Test all routes

### Exercise 2: Nested Routes with Layouts
**Difficulty**: Intermediate  
**Goal**: Practice nested structures  
**Instructions**:
1. Create a blog section with layout
2. Create blog listing page
3. Create dynamic blog post pages
4. Add nested layouts

## 🎓 Key Takeaways

- `app/` directory structure determines routes
- `page.tsx` creates routes
- `layout.tsx` creates shared UI
- Route groups organize without affecting URLs
- Special files have specific purposes
- Nested folders create nested routes

## ❓ FAQ

### Q: Do I need a root layout?
**A**: Yes, `app/layout.tsx` is required in App Router.

### Q: Can I have multiple layouts?
**A**: Yes, you can nest layouts for different route segments.

### Q: Do route groups affect URLs?
**A**: No, route groups are purely organizational.

### Q: What's the difference between `page.tsx` and `layout.tsx`?
**A**: `page.tsx` creates a route, `layout.tsx` creates shared UI that wraps pages.

### Q: Can I use both `app/` and `pages/` directories?
**A**: Technically yes, but it's not recommended. Use App Router for new projects.

---

**Next Steps**: 
- Review: [Layouts](./layouts.md) for shared UI
- Practice: Create a multi-page app structure
- Build: Organize a complex application with route groups

