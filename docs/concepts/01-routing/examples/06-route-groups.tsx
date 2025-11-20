// Example 6: Route Groups
// Demonstrates how to organize routes using route groups without affecting URLs

// app/(marketing)/layout.tsx
// This layout applies to all routes in the (marketing) group
// Routes: /about, /contact, /pricing (group name doesn't appear in URL)

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="marketing-layout">
      <header className="bg-blue-500 text-white p-4">
        <nav>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/pricing">Pricing</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-200 p-4">
        <p>Marketing Footer</p>
      </footer>
    </div>
  )
}

// app/(marketing)/about/page.tsx
// URL: /about (NOT /(marketing)/about)
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This page uses the MarketingLayout</p>
    </div>
  )
}

// app/(marketing)/contact/page.tsx
// URL: /contact
export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>This page uses the MarketingLayout</p>
    </div>
  )
}

// app/(dashboard)/layout.tsx
// Different layout for dashboard routes
// Routes: /dashboard, /settings, /profile

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <aside className="w-64 bg-gray-800 text-white">
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/settings">Settings</a>
          <a href="/profile">Profile</a>
        </nav>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}

// app/(dashboard)/dashboard/page.tsx
// URL: /dashboard (NOT /(dashboard)/dashboard)
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This page uses the DashboardLayout</p>
    </div>
  )
}

// app/(dashboard)/settings/page.tsx
// URL: /settings
export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <p>This page uses the DashboardLayout</p>
    </div>
  )
}

