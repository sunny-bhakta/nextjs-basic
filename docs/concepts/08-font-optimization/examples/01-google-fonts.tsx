// Example 1: Google Fonts
// Demonstrates using Google Fonts with next/font

// app/layout.tsx - Single Google Font
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}

// app/layout.tsx - Multiple Google Fonts
import { Inter, Roboto_Mono, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}

// app/page.tsx - Using font variables
export default function HomePage() {
  return (
    <div>
      <h1 className="font-inter">Inter font</h1>
      <code className="font-roboto-mono">Roboto Mono font</code>
      <p className="font-playfair">Playfair Display font</p>
    </div>
  )
}

// app/layout.tsx - Font with specific weights
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}

