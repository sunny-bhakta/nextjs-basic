// Example 8: Complete Routing Example
// A complete example combining multiple routing concepts

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// app/layout.tsx - Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}

// Navigation component using Link
function Navigation() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link href="/" className="hover:text-blue-600">
        Home
      </Link>
      <Link href="/blog" className="hover:text-blue-600">
        Blog
      </Link>
      <Link href="/products" className="hover:text-blue-600">
        Products
      </Link>
      <Link href="/about" className="hover:text-blue-600">
        About
      </Link>
    </nav>
  )
}

// app/page.tsx - Home page
export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p>This is the home page at route: /</p>
    </div>
  )
}

// app/blog/page.tsx - Blog listing
export default function BlogPage() {
  const posts = [
    { id: 1, slug: 'getting-started', title: 'Getting Started with Next.js' },
    { id: 2, slug: 'routing', title: 'Understanding Next.js Routing' },
    { id: 3, slug: 'data-fetching', title: 'Data Fetching in Next.js' },
  ]
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.id}>
            <Link 
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/blog/[slug]/page.tsx - Individual blog post (dynamic route)
interface BlogPostProps {
  params: {
    slug: string
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  // In a real app, you'd fetch the post data here
  const post = {
    slug: params.slug,
    title: `Post: ${params.slug}`,
    content: 'This is the blog post content...',
  }
  
  return (
    <article className="p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p>{post.content}</p>
      <Link 
        href="/blog"
        className="text-blue-600 hover:underline mt-4 inline-block"
      >
        ← Back to Blog
      </Link>
    </article>
  )
}

// app/products/page.tsx - Products listing with search
'use client'

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('q') || ''
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('query') as string
    router.push(`/products?q=${query}`)
  }
  
  const products = [
    { id: 1, name: 'Laptop', category: 'electronics' },
    { id: 2, name: 'Shirt', category: 'clothing' },
    { id: 3, name: 'Phone', category: 'electronics' },
  ]
  
  const filteredProducts = search
    ? products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Products</h1>
      
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="query"
          placeholder="Search products..."
          defaultValue={search}
          className="border p-2 rounded"
        />
        <button 
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      
      <ul className="space-y-2">
        {filteredProducts.map(product => (
          <li key={product.id}>
            <Link 
              href={`/products/${product.category}/${product.id}`}
              className="text-blue-600 hover:underline"
            >
              {product.name} ({product.category})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/products/[category]/[id]/page.tsx - Product detail (multiple dynamic segments)
interface ProductDetailProps {
  params: {
    category: string
    id: string
  }
}

export default function ProductDetail({ params }: ProductDetailProps) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Product Details</h1>
      <p>Category: {params.category}</p>
      <p>Product ID: {params.id}</p>
      <Link 
        href="/products"
        className="text-blue-600 hover:underline mt-4 inline-block"
      >
        ← Back to Products
      </Link>
    </div>
  )
}

// app/about/page.tsx - About page
export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p>This is the about page at route: /about</p>
    </div>
  )
}

