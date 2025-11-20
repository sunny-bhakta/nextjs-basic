// Example 3: Image Placeholders
// Demonstrates blur and empty placeholders

// app/components/BlurPlaceholder.tsx - Image with blur placeholder
import Image from 'next/image'

export default function BlurPlaceholder() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      className="rounded-lg"
    />
  )
}

// app/components/EmptyPlaceholder.tsx - Image without placeholder
import Image from 'next/image'

export default function EmptyPlaceholder() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      placeholder="empty"
      className="rounded-lg"
    />
  )
}

// app/components/LoadingImage.tsx - Image with loading state
'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function LoadingImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
        onLoad={() => setIsLoading(false)}
        className={`rounded-lg transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}

// app/components/GalleryImage.tsx - Gallery image with placeholder
import Image from 'next/image'

interface GalleryImageProps {
  src: string
  alt: string
  blurDataURL?: string
}

export default function GalleryImage({ src, alt, blurDataURL }: GalleryImageProps) {
  return (
    <div className="relative aspect-square">
      <Image
        src={src}
        alt={alt}
        fill
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

