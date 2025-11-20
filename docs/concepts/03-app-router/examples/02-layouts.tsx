// Example 2: Layouts
// Demonstrates nested layouts and shared UI

// app/layout.tsx - Root layout
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
            <a href="/blog">Blog</a>
            <a href="/dashboard">Dashboard</a>
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

// app/blog/layout.tsx - Blog section layout
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="blog-layout">
      <aside>
        <h2>Blog Categories</h2>
        <ul>
          <li><a href="/blog/tech">Tech</a></li>
          <li><a href="/blog/design">Design</a></li>
          <li><a href="/blog/business">Business</a></li>
        </ul>
      </aside>
      <article>{children}</article>
    </div>
  )
}

// app/blog/page.tsx - Uses BlogLayout
export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>
      <p>Blog listing page</p>
    </div>
  )
}

// app/dashboard/layout.tsx - Dashboard layout with sidebar
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/settings">Settings</a>
          <a href="/dashboard/profile">Profile</a>
        </nav>
      </aside>
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  )
}

// app/dashboard/page.tsx - Uses DashboardLayout
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Dashboard content</p>
    </div>
  )
}

// app/(marketing)/layout.tsx - Route group layout
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="marketing-layout">
      <header className="marketing-header">
        <h1>Marketing Site</h1>
      </header>
      {children}
      <footer className="marketing-footer">
        <p>Marketing Footer</p>
      </footer>
    </div>
  )
}

// app/(marketing)/about/page.tsx - Uses MarketingLayout
// URL: /about (group name doesn't appear)
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This page uses MarketingLayout</p>
    </div>
  )
}

