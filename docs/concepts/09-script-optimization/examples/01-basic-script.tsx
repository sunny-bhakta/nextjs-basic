// Example 1: Basic Script Usage
// Demonstrates basic next/script component usage

// app/page.tsx - After Interactive (default)
import Script from 'next/script'

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Script src="https://example.com/script.js" />
    </div>
  )
}

// app/page.tsx - Lazy Onload
import Script from 'next/script'

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Script
        src="https://example.com/script.js"
        strategy="lazyOnload"
      />
    </div>
  )
}

// app/layout.tsx - Before Interactive
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Script
          src="https://example.com/critical.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  )
}

// app/page.tsx - Inline Script
import Script from 'next/script'

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Script id="inline-script" strategy="afterInteractive">
        {`
          console.log('Inline script executed');
        `}
      </Script>
    </div>
  )
}

