// Example 2: Analytics Scripts
// Demonstrates integrating analytics with next/script

// app/layout.tsx - Google Analytics
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
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}

// app/layout.tsx - Google Analytics with Callbacks
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
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('Google Analytics loaded')
          }}
          onError={(e) => {
            console.error('Google Analytics failed to load', e)
          }}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}

// app/components/ChatWidget.tsx - Chat Widget (Lazy Load)
import Script from 'next/script'

export default function ChatWidget() {
  return (
    <Script
      src="https://chat.example.com/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        // Initialize chat widget
        if (window.ChatWidget) {
          window.ChatWidget.init()
        }
      }}
    />
  )
}

// app/components/ThirdPartyScript.tsx - Multiple Third-Party Scripts
import Script from 'next/script'

export default function ThirdPartyScripts() {
  return (
    <>
      <Script
        src="https://example.com/analytics.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://example.com/widget.js"
        strategy="lazyOnload"
      />
    </>
  )
}

