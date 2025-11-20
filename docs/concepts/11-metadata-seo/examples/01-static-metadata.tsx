// Example 1: Static Metadata
// Demonstrates static metadata in Next.js

// app/page.tsx - Basic metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - My App',
  description: 'Welcome to my Next.js application',
}

export default function HomePage() {
  return <h1>Home</h1>
}

// app/about/page.tsx - Metadata with Open Graph
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  openGraph: {
    title: 'About Us',
    description: 'Learn more about our company',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return <h1>About</h1>
}

// app/blog/page.tsx - Complete metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - My App',
  description: 'Read our latest blog posts',
  keywords: ['blog', 'articles', 'news'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'Blog',
    description: 'Read our latest blog posts',
    images: ['/og-blog.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Read our latest blog posts',
    images: ['/twitter-blog.jpg'],
  },
}

export default function BlogPage() {
  return <h1>Blog</h1>
}

// app/layout.tsx - Metadata template
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'My amazing Next.js application',
}

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

