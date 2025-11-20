# Route Groups

## Overview

Route groups allow you to organize routes without affecting the URL structure. They're created using parentheses: `(groupName)`.

## Purpose

Route groups are useful for:
- Organizing routes by feature or section
- Applying different layouts to different groups
- Sharing layouts between multiple routes
- Creating marketing vs dashboard sections

## Basic Syntax

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx      → /about
│   └── contact/
│       └── page.tsx      → /contact
└── (shop)/
    ├── products/
    │   └── page.tsx      → /products
    └── cart/
        └── page.tsx      → /cart
```

**Important**: The group name `(marketing)` and `(shop)` do NOT appear in the URL!

## Example: Marketing vs Dashboard

```typescript
// app/(marketing)/layout.tsx
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
export default function About() {
  return <h1>About Us</h1>
}

// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

// app/(dashboard)/settings/page.tsx
export default function Settings() {
  return <h1>Settings</h1>
}
```

Routes created:
- `/about` → Uses MarketingLayout
- `/settings` → Uses DashboardLayout

## Multiple Route Groups

You can have multiple route groups at the same level:

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx      → /login
│   └── register/
│       └── page.tsx      → /register
├── (marketing)/
│   ├── about/
│   │   └── page.tsx      → /about
│   └── contact/
│       └── page.tsx      → /contact
└── page.tsx              → /
```

## Nested Route Groups

Route groups can be nested:

```
app/
└── (shop)/
    ├── products/
    │   └── page.tsx      → /products
    └── (admin)/
        └── admin/
            └── page.tsx  → /admin
```

## Sharing Layouts

Use route groups to share layouts:

```typescript
// app/(main)/layout.tsx
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

// app/(main)/about/page.tsx
export default function About() {
  return <h1>About</h1>
}

// app/(main)/contact/page.tsx
export default function Contact() {
  return <h1>Contact</h1>
}
```

Both `/about` and `/contact` share the same layout.

## Best Practices

1. **Use descriptive names**: `(marketing)`, `(dashboard)`, `(admin)`
2. **Group related routes**: Keep related pages in the same group
3. **Use for layouts**: Primary use case is applying different layouts
4. **Don't overuse**: Only use when you need different layouts or organization

## Common Mistakes

### ❌ Wrong: Expecting group name in URL

```
app/(marketing)/about/page.tsx
```

This creates `/about`, NOT `/(marketing)/about`!

### ✅ Correct: Understand route groups don't affect URLs

Route groups are purely organizational. The URL structure is determined by the folder structure excluding the group name.

## Related Topics

- [File-based Routing](./file-based-routing.md)
- [App Router Layouts](../03-app-router/layouts.md)
- [Dynamic Routes](./dynamic-routes.md)

