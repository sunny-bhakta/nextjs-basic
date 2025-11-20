// Example 1: Basic File-based Routing
// This demonstrates how Next.js creates routes from your file structure

// app/page.tsx - Creates route: /
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the root route (/)</p>
    </div>
  )
}

// app/about/page.tsx - Creates route: /about
export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the /about route</p>
    </div>
  )
}

// app/contact/page.tsx - Creates route: /contact
export default function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>This is the /contact route</p>
    </div>
  )
}

// app/products/page.tsx - Creates route: /products
export default function ProductsPage() {
  return (
    <div>
      <h1>Products Page</h1>
      <p>This is the /products route</p>
    </div>
  )
}

// app/products/featured/page.tsx - Creates route: /products/featured
export default function FeaturedProductsPage() {
  return (
    <div>
      <h1>Featured Products</h1>
      <p>This is the /products/featured route (nested route)</p>
    </div>
  )
}

