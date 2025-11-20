// Example 1: Basic App Router Structure
// Demonstrates the fundamental structure of App Router

// app/layout.tsx - Root layout (required)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

// app/page.tsx - Home page (creates route: /)
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the root route</p>
    </div>
  )
}

// app/about/page.tsx - About page (creates route: /about)
export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the /about route</p>
    </div>
  )
}

// app/contact/page.tsx - Contact page (creates route: /contact)
export default function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>This is the /contact route</p>
    </div>
  )
}

