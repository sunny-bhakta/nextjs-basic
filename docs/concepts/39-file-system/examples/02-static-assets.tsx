// Example 2: Static Assets
// Demonstrates static asset usage

import Image from 'next/image'

// ============================================
// Example 1: Image Usage
// ============================================

export function ImageExamples() {
  return (
    <div className="space-y-4">
      {/* Next.js Image with optimization */}
      <Image
        src="/images/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        className="rounded"
      />

      {/* Image with priority */}
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={200}
        height={50}
        priority
      />

      {/* Responsive image */}
      <Image
        src="/images/banner.jpg"
        alt="Banner"
        width={1920}
        height={1080}
        className="w-full h-auto"
        sizes="100vw"
      />
    </div>
  )
}

// ============================================
// Example 2: Icon Usage
// ============================================

export function IconExamples() {
  return (
    <div className="space-y-4">
      {/* SVG icon */}
      <img src="/icons/check.svg" alt="Check" width={24} height={24} />

      {/* Favicon */}
      <link rel="icon" href="/icons/favicon.ico" />

      {/* Apple touch icon */}
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
    </div>
  )
}

// ============================================
// Example 3: Font Loading
// ============================================

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export function FontExample() {
  return (
    <div className={inter.className}>
      <h1>Text with custom font</h1>
    </div>
  )
}

// ============================================
// Example 4: Document Links
// ============================================

export function DocumentLinks() {
  return (
    <div className="space-y-2">
      <a
        href="/documents/guide.pdf"
        download
        className="text-blue-600 hover:underline"
      >
        Download Guide (PDF)
      </a>
      <a
        href="/documents/terms.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        View Terms (PDF)
      </a>
    </div>
  )
}

// ============================================
// Example 5: Dynamic Asset Loading
// ============================================

'use client'

import { useState } from 'react'

export function DynamicAsset({ assetName }: { assetName: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return <div className="text-red-600">Asset not found</div>
  }

  return (
    <Image
      src={`/images/${assetName}`}
      alt={assetName}
      width={400}
      height={300}
      onError={() => setError(true)}
      className="rounded"
    />
  )
}

