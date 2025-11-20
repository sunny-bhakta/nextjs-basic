// Example 2: Responsive Images
// Demonstrates responsive image handling

// app/components/ResponsiveHero.tsx - Full-width responsive image
import Image from 'next/image'

export default function ResponsiveHero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1920}
      height={1080}
      sizes="100vw" // Full viewport width
      className="w-full h-auto"
    />
  )
}

// app/components/ResponsiveGrid.tsx - Images in responsive grid
import Image from 'next/image'

interface ImageItem {
  id: number
  src: string
  alt: string
}

export default function ResponsiveGrid({ images }: { images: ImageItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <Image
          key={image.id}
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto rounded-lg"
        />
      ))}
    </div>
  )
}

// app/components/ComplexResponsive.tsx - Complex responsive sizes
import Image from 'next/image'

export default function ComplexResponsive() {
  return (
    <Image
      src="/featured.jpg"
      alt="Featured image"
      width={2400}
      height={1600}
      sizes="
        (max-width: 640px) 100vw,
        (max-width: 768px) 90vw,
        (max-width: 1024px) 80vw,
        (max-width: 1280px) 70vw,
        60vw
      "
      className="w-full h-auto"
    />
  )
}

// app/components/ResponsiveFill.tsx - Responsive image with fill
import Image from 'next/image'

export default function ResponsiveFill() {
  return (
    <div className="relative w-full aspect-video">
      <Image
        src="/video-thumbnail.jpg"
        alt="Video thumbnail"
        fill
        sizes="100vw"
        className="object-cover rounded-lg"
      />
    </div>
  )
}

