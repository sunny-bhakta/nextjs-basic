// Example 6: Complete Image Optimization Example
// A comprehensive example combining all image optimization concepts

// app/page.tsx - Home page with optimized images
import Image from 'next/image'
import HeroImage from './components/hero-image'
import ProductGrid from './components/product-grid'
import ImageGallery from './components/image-gallery'

export default function HomePage() {
  return (
    <div>
      <HeroImage />
      <ProductGrid />
      <ImageGallery />
    </div>
  )
}

// app/components/hero-image.tsx - Hero image with priority
import Image from 'next/image'

export default function HeroImage() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/hero.jpg"
        alt="Hero image"
        fill
        priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Welcome</h1>
      </div>
    </div>
  )
}

// app/components/product-grid.tsx - Product grid with responsive images
import Image from 'next/image'

interface Product {
  id: number
  name: string
  image: string
  price: number
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,..."
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-lg">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// app/components/image-gallery.tsx - Image gallery with optimization
import Image from 'next/image'

interface GalleryImage {
  id: number
  src: string
  alt: string
  blurDataURL?: string
}

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative aspect-video group">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              className="object-cover rounded-lg transition-transform group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// app/components/optimized-image.tsx - Reusable optimized image component
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  sizes?: string
  className?: string
  blurDataURL?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  className = '',
  blurDataURL
}: OptimizedImageProps) {
  const commonProps = {
    src,
    alt,
    priority,
    className,
    placeholder: blurDataURL ? "blur" as const : "empty" as const,
    ...(blurDataURL && { blurDataURL }),
    ...(sizes && { sizes }),
  }
  
  if (fill) {
    return <Image {...commonProps} fill />
  }
  
  if (!width || !height) {
    throw new Error('Width and height are required when fill is false')
  }
  
  return <Image {...commonProps} width={width} height={height} />
}

// Summary:
// - Hero image with priority loading
// - Product grid with responsive images
// - Image gallery with placeholders
// - Reusable optimized image component
// - All images use next/image
// - Proper sizes for responsive layouts
// - Blur placeholders for better UX

