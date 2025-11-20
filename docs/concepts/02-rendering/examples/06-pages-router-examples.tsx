// Example 6: Rendering Strategies in Pages Router (Legacy)
// These examples show how rendering worked in the Pages Router
// Note: App Router is recommended for new projects

// pages/index.js - Static Site Generation (SSG)
// getStaticProps runs at build time

export default function HomePage({ posts }) {
  return (
    <div>
      <h1>Home (SSG)</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

// This function runs at BUILD TIME
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  
  return {
    props: {
      posts,
    },
    // Revalidate every 60 seconds (ISR)
    revalidate: 60,
  }
}

// pages/blog/[slug].js - SSG with dynamic routes
// getStaticPaths generates all possible paths at build time

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

// Generate all possible paths at build time
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  
  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }))
  
  return {
    paths,
    fallback: false, // or 'blocking' or true
  }
}

// Fetch data for each path
export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`)
  const post = await res.json()
  
  return {
    props: {
      post,
    },
    revalidate: 60, // ISR
  }
}

// pages/dashboard.js - Server-Side Rendering (SSR)
// getServerSideProps runs on EVERY request

export default function DashboardPage({ data }) {
  return (
    <div>
      <h1>Dashboard (SSR)</h1>
      <p>Rendered on server for each request</p>
      <p>Last updated: {data.timestamp}</p>
    </div>
  )
}

// This function runs on EVERY REQUEST
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/dashboard')
  const data = await res.json()
  
  return {
    props: {
      data: {
        ...data,
        timestamp: new Date().toISOString(),
      },
    },
  }
}

// pages/products.js - Client-Side Rendering (CSR)
// No getStaticProps or getServerSideProps
// Data fetched in useEffect

import { useState, useEffect } from 'react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('https://api.example.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>Products (CSR)</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

// Comparison: App Router vs Pages Router

/*
APP ROUTER (Recommended):
- Default: Static (SSG)
- Force SSR: cache: 'no-store'
- ISR: next: { revalidate: 60 }
- Simpler, more intuitive

PAGES ROUTER (Legacy):
- Default: CSR (if no data fetching)
- SSG: getStaticProps
- SSR: getServerSideProps
- ISR: revalidate in getStaticProps
- More explicit but verbose
*/

