// Example 2: HTTP Methods
// Demonstrates handling different HTTP methods

// app/api/products/route.ts - Complete CRUD API
// GET - List all products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  
  const products = await getProducts({ page, limit })
  return Response.json({ products })
}

// POST - Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate
    if (!body.name || !body.price) {
      return Response.json(
        { error: 'Name and price required' },
        { status: 400 }
      )
    }
    
    const product = await createProduct(body)
    return Response.json({ product }, { status: 201 })
  } catch (error) {
    return Response.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// app/api/products/[id]/route.ts
// GET - Get single product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await getProductById(params.id)
  
  if (!product) {
    return Response.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
  
  return Response.json({ product })
}

// PUT - Replace entire product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const product = await replaceProduct(params.id, body)
  return Response.json({ product })
}

// PATCH - Partially update product
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const product = await updateProduct(params.id, body)
  return Response.json({ product })
}

// DELETE - Remove product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deleteProduct(params.id)
  return Response.json(
    { message: 'Product deleted' },
    { status: 200 }
  )
}

// app/api/data/route.ts - OPTIONS for CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function GET() {
  const data = await getData()
  return Response.json(data, { headers: corsHeaders })
}

export async function POST(request: Request) {
  const body = await request.json()
  const result = await createData(body)
  return Response.json(result, {
    status: 201,
    headers: corsHeaders
  })
}

// app/api/files/[name]/route.ts - HEAD method
export async function HEAD(
  request: Request,
  { params }: { params: { name: string } }
) {
  const file = await getFileInfo(params.name)
  
  if (!file) {
    return new Response(null, { status: 404 })
  }
  
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size.toString(),
      'Last-Modified': file.modified.toUTCString(),
    },
  })
}

