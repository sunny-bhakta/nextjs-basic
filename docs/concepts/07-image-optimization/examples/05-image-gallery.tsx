// Example 5: Image Gallery
// Demonstrates building an image gallery with optimization

// app/components/ImageGallery.tsx - Responsive image gallery
import Image from 'next/image'

interface GalleryImage {
  id: number
  src: string
  alt: string
  blurDataURL?: string
}

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square group">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover rounded-lg transition-transform group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}

// app/components/ProductGallery.tsx - Product image gallery
import Image from 'next/image'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative aspect-square">
        <Image
          src={images[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          priority
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
              selectedImage === index ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

// app/components/LightboxGallery.tsx - Gallery with lightbox
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LightboxGalleryProps {
  images: Array<{ src: string; alt: string }>
}

export default function LightboxGallery({ images }: LightboxGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-square"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
      
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}

