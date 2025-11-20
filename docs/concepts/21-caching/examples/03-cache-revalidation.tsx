// Example 3: Cache Revalidation
// Demonstrates on-demand and tag-based cache revalidation
//
// NOTE: These examples show different files. Each example should be in its own file.
// They are grouped here for demonstration purposes only.

// ============================================
// Example 1: Product Page with Tag-Based Caching
// File: app/products/[id]/page.tsx
// ============================================

async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['products', `product-${id}`] // Tags for on-demand revalidation
    }
  })
  
  return res.json()
}

export async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>
    </div>
  )
}

// ============================================
// Example 2: On-Demand Revalidation API Route
// File: app/api/revalidate/route.ts
// ============================================
// Copy this code to: app/api/revalidate/route.ts

/*
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { tag } = await request.json()
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag is required' },
        { status: 400 }
      )
    }
    
    revalidateTag(tag)
    
    return NextResponse.json({
      revalidated: true,
      tag,
      now: Date.now()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
*/

// ============================================
// Example 3: Revalidate Product API Route
// File: app/api/revalidate-product/route.ts
// ============================================
// Copy this code to: app/api/revalidate-product/route.ts

/*
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { productId } = await request.json()
    
    // Revalidate by tag
    revalidateTag(`product-${productId}`)
    revalidateTag('products') // Revalidate all products
    
    // Revalidate by path
    revalidatePath(`/products/${productId}`)
    revalidatePath('/products')
    
    return NextResponse.json({
      revalidated: true,
      productId,
      paths: [`/products/${productId}`, '/products']
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
*/

// ============================================
// Example 4: Server Action with Revalidation
// File: app/actions.ts
// ============================================
// Copy this code to: app/actions.ts

/*
'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function updateProduct(id: string, data: { name: string; price: number }) {
  // Update product in database
  await updateProductInDb(id, data)
  
  // Revalidate the product page
  revalidatePath(`/products/${id}`)
  
  // Revalidate products listing
  revalidatePath('/products')
  
  // Revalidate by tag
  revalidateTag(`product-${id}`)
  revalidateTag('products')
  
  return { success: true }
}

async function updateProductInDb(id: string, data: { name: string; price: number }) {
  // Simulate database update
  await new Promise(resolve => setTimeout(resolve, 100))
  return { id, ...data }
}
*/

// ============================================
// Example 5: Webhook Revalidation Route
// File: app/api/webhook/revalidate/route.ts
// ============================================
// Copy this code to: app/api/webhook/revalidate/route.ts

/*
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, id } = body
    
    // Verify webhook secret (in production)
    const secret = request.headers.get('x-webhook-secret')
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Revalidate based on webhook data
    if (type === 'product') {
      revalidateTag(`product-${id}`)
      revalidateTag('products')
    } else if (type === 'post') {
      revalidateTag(`post-${id}`)
      revalidateTag('posts')
    }
    
    return NextResponse.json({
      revalidated: true,
      type,
      id
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
*/

