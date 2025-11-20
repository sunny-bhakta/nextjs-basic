// Example 2: Dynamic Routes
// Demonstrates how to create routes with dynamic parameters

// app/blog/[slug]/page.tsx - Creates route: /blog/[slug]
// Example URLs: /blog/my-first-post, /blog/hello-world

interface BlogPostProps {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: BlogPostProps) {
  return (
    <article>
      <h1>Blog Post: {params.slug}</h1>
      <p>This page is accessible at: /blog/{params.slug}</p>
      <p>Try visiting: /blog/my-first-post or /blog/hello-world</p>
    </article>
  )
}

// app/users/[id]/page.tsx - Creates route: /users/[id]
// Example URLs: /users/123, /users/456

interface UserProfileProps {
  params: {
    id: string
  }
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {params.id}</p>
      <p>This page is accessible at: /users/{params.id}</p>
    </div>
  )
}

// app/shop/[category]/[product]/page.tsx - Multiple dynamic segments
// Example URLs: /shop/electronics/laptop, /shop/clothing/shirt

interface ProductPageProps {
  params: {
    category: string
    product: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div>
      <h1>Product Details</h1>
      <p>Category: {params.category}</p>
      <p>Product: {params.product}</p>
      <p>URL: /shop/{params.category}/{params.product}</p>
    </div>
  )
}

