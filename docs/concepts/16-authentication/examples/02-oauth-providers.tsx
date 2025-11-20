// Example 2: OAuth Providers
// Demonstrates using OAuth providers with NextAuth

// app/api/auth/[...nextauth]/route.ts - Google OAuth
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }

// app/api/auth/[...nextauth]/route.ts - Multiple providers
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }

// app/components/SignInButtons.tsx - Provider buttons
'use client'

import { signIn } from 'next-auth/react'

export default function SignInButtons() {
  return (
    <div>
      <button onClick={() => signIn('google')}>
        Sign in with Google
      </button>
      <button onClick={() => signIn('github')}>
        Sign in with GitHub
      </button>
      <button onClick={() => signIn('facebook')}>
        Sign in with Facebook
      </button>
    </div>
  )
}

