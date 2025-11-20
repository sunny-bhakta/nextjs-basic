// Example 4: Edge Runtime
// Demonstrates running Route Handlers on Edge

// app/api/hello/route.ts - Basic Edge handler
export const runtime = 'edge'

export async function GET() {
  return Response.json({ message: 'Hello from Edge!' })
}

// app/api/geo/route.ts - Edge handler with geo headers
export const runtime = 'edge'

export async function GET(request: Request) {
  // Access Edge-specific headers
  const country = request.headers.get('x-vercel-ip-country')
  const city = request.headers.get('x-vercel-ip-city')
  const region = request.headers.get('x-vercel-ip-country-region')
  
  return Response.json({
    country,
    city,
    region,
    message: 'Running on Edge'
  })
}

// app/api/cache/route.ts - Edge handler with caching
export const runtime = 'edge'

export async function GET(request: Request) {
  const url = request.url
  const cacheKey = new URL(url).pathname
  
  // Check cache (Edge-compatible caching)
  const cached = await getFromCache(cacheKey)
  if (cached) {
    return Response.json(cached, {
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    })
  }
  
  // Fetch and cache
  const data = { timestamp: Date.now(), data: 'from edge' }
  await setCache(cacheKey, data)
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60',
    },
  })
}

// app/api/protected/route.ts - Edge handler with authentication
export const runtime = 'edge'

async function verifyToken(token: string) {
  // Simple token verification (Edge-compatible)
  // Note: Can't use Node.js crypto in Edge
  const isValid = token === process.env.API_KEY
  
  return isValid
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const token = authHeader.replace('Bearer ', '')
  const isValid = await verifyToken(token)
  
  if (!isValid) {
    return Response.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
  
  return Response.json({ message: 'Protected data' })
}

// app/api/proxy/route.ts - Edge handler proxying external API
export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')
  
  if (!targetUrl) {
    return Response.json(
      { error: 'URL parameter required' },
      { status: 400 }
    )
  }
  
  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Next.js Edge Runtime',
      },
    })
    
    const data = await res.json()
    
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60',
      },
    })
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch' },
      { status: 500 }
    )
  }
}

// app/api/ab-test/route.ts - Edge handler with A/B testing
export const runtime = 'edge'

export async function GET(request: Request) {
  // Get user location for A/B testing
  const country = request.headers.get('x-vercel-ip-country')
  const city = request.headers.get('x-vercel-ip-city')
  
  // Simple A/B test logic
  const variant = country === 'US' ? 'variant-a' : 'variant-b'
  
  return Response.json({
    variant,
    country,
    city,
    message: `You're seeing ${variant}`
  })
}

// app/api/redirect/route.ts - Edge handler with redirect
export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('to')
  
  if (!redirectTo) {
    return Response.json(
      { error: 'Redirect URL required' },
      { status: 400 }
    )
  }
  
  return Response.redirect(redirectTo, 302)
}

