// Example 1: NextAuth.js Setup
// Demonstrates setting up NextAuth.js

// app/api/auth/[...nextauth]/route.ts - Basic setup
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === 'user' && credentials?.password === 'pass') {
          return { id: '1', name: 'User', email: 'user@example.com' }
        }
        return null
      }
    })
  ],
})

export { handler as GET, handler as POST }

// app/providers.tsx - Session provider
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

// app/layout.tsx - Wrap with provider
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

// app/components/UserButton.tsx - Using session
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function UserButton() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <p>Loading...</p>
  
  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  
  return <button onClick={() => signIn()}>Sign in</button>
}

