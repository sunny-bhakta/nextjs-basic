// Example 1: Basic Image Usage
// Demonstrates basic next/image component usage

// app/page.tsx - Simple image
import Image from 'next/image'

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={800}
        height={600}
      />
    </div>
  )
}

// app/components/ProductImage.tsx - Product image component
import Image from 'next/image'

interface ProductImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function ProductImage({
  src,
  alt,
  width = 500,
  height = 500
}: ProductImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="rounded-lg"
    />
  )
}

// app/components/PriorityImage.tsx - Above-the-fold image
import Image from 'next/image'

export default function PriorityImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1920}
      height={1080}
      priority // Load immediately, don't lazy load
      className="w-full h-auto"
    />
  )
}

// app/components/FillImage.tsx - Image that fills container
import Image from 'next/image'

export default function FillImage() {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/banner.jpg"
        alt="Banner"
        fill
        className="object-cover"
      />
    </div>
  )
}

