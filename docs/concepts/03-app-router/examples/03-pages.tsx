// Example 3: Pages
// Demonstrates creating pages with data fetching and metadata

// app/page.tsx - Home page with metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - My App',
  description: 'Welcome to my Next.js app',
}

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
    </div>
  )
}

// app/blog/page.tsx - Blog listing with data fetching
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache'
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  
  return res.json()
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: { id: number; title: string; slug: string }) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/blog/[slug]/page.tsx - Dynamic page with metadata
import type { Metadata } from 'next'

interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    cache: 'force-cache'
  })
  
  if (!res.ok) {
    throw new Error('Post not found')
  }
  
  return res.json()
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

// app/search/page.tsx - Page with search params
interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
  }
}

async function search(query: string, category?: string) {
  const url = new URL('https://api.example.com/search')
  url.searchParams.set('q', query)
  if (category) {
    url.searchParams.set('category', category)
  }
  
  const res = await fetch(url.toString(), {
    cache: 'no-store'
  })
  
  return res.json()
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const category = searchParams.category
  
  const results = query ? await search(query, category) : []
  
  return (
    <div>
      <h1>Search</h1>
      {query && (
        <div>
          <p>Results for: {query}</p>
          {category && <p>Category: {category}</p>}
          <ul>
            {results.map((result: { id: number; title: string }) => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

