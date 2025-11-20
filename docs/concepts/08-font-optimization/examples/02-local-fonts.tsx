// Example 2: Local Fonts
// Demonstrates using local font files

// app/layout.tsx - Single local font
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}

// app/layout.tsx - Multiple font files
import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    {
      path: './fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}

// app/layout.tsx - Local font with CSS variable
import localFont from 'next/font/local'

const headingFont = localFont({
  src: './fonts/HeadingFont.woff2',
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = localFont({
  src: './fonts/BodyFont.woff2',
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}

// app/layout.tsx - Variable font
import localFont from 'next/font/local'

const variableFont = localFont({
  src: './fonts/VariableFont.woff2',
  variable: '--font-variable',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={variableFont.variable}>
      <body>{children}</body>
    </html>
  )
}

