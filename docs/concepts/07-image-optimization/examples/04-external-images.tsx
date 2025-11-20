// Example 4: External Images
// Demonstrates using external image sources

// next.config.js - Configure external image domains
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'example.com',
//         pathname: '/images/**',
//       },
//       {
//         protocol: 'https',
//         hostname: '**.cdn.example.com',
//       },
//     ],
//   },
// }

// app/components/ExternalImage.tsx - External image with domain config
import Image from 'next/image'

export default function ExternalImage() {
  return (
    <Image
      src="https://example.com/images/photo.jpg"
      alt="External photo"
      width={800}
      height={600}
      // Domain must be configured in next.config.js
    />
  )
}

// app/components/CDNImage.tsx - CDN image
import Image from 'next/image'

export default function CDNImage() {
  return (
    <Image
      src="https://cdn.example.com/images/product.jpg"
      alt="Product from CDN"
      width={500}
      height={500}
      className="rounded-lg"
    />
  )
}

// app/components/ExternalImageWithPlaceholder.tsx - External image with placeholder
import Image from 'next/image'

export default function ExternalImageWithPlaceholder() {
  return (
    <Image
      src="https://example.com/images/photo.jpg"
      alt="External photo"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..." // Generate from external image
    />
  )
}

// app/components/DynamicExternalImage.tsx - Dynamic external image
import Image from 'next/image'

interface DynamicExternalImageProps {
  imageUrl: string
  alt: string
}

export default function DynamicExternalImage({ imageUrl, alt }: DynamicExternalImageProps) {
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={800}
      height={600}
      // Ensure domain is configured in next.config.js
    />
  )
}

