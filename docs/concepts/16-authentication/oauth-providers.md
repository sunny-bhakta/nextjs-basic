# OAuth Providers

> **Category**: Intermediate | **Related Concepts**: [NextAuth.js](./nextauth.md), [Session Management](./session-management.md)  
> **Last Updated**: 2024

## 📖 Overview

OAuth providers allow users to sign in with external services like Google, GitHub, Facebook, etc. NextAuth.js supports many OAuth providers out of the box.

**Key Points:**
- Multiple providers supported
- Easy integration
- Secure OAuth flow
- User profile data
- Provider callbacks
- Custom providers

## 🎯 When to Use

- **Social Login**: When offering social login
- **User Convenience**: When you want easy sign-in
- **Multiple Providers**: When supporting multiple providers
- **OAuth Flow**: When using OAuth authentication
- **Third-Party Auth**: When using external auth services

## 💻 Basic Example

### Google Provider

```typescript
// app/api/auth/[...nextauth]/route.ts
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
```

### GitHub Provider

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
```

### Multiple Providers

```typescript
// app/api/auth/[...nextauth]/route.ts
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
```

## 🔧 Advanced Example

### Provider with Callbacks

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Custom sign-in logic
      if (account?.provider === 'google') {
        // Handle Google sign-in
        return true
      }
      return true
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      if (profile) {
        token.profile = profile
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.accessToken = token.accessToken
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
```

### Custom OAuth Provider

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers'

function CustomProvider(options: OAuthUserConfig<any>): OAuthConfig<any> {
  return {
    id: 'custom',
    name: 'Custom',
    type: 'oauth',
    authorization: {
      url: 'https://custom-provider.com/oauth/authorize',
      params: {
        scope: 'read:user',
        response_type: 'code',
      },
    },
    token: 'https://custom-provider.com/oauth/token',
    userinfo: 'https://custom-provider.com/api/user',
    client: {
      id: options.clientId,
      secret: options.clientSecret,
    },
    profile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.avatar_url,
      }
    },
    ...options,
  }
}

const handler = NextAuth({
  providers: [
    CustomProvider({
      clientId: process.env.CUSTOM_CLIENT_ID!,
      clientSecret: process.env.CUSTOM_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
```

## 📋 Common Patterns

### Pattern 1: Single Provider
```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})
```
**When to use**: Single OAuth provider

### Pattern 2: Multiple Providers
```typescript
providers: [
  GoogleProvider({...}),
  GitHubProvider({...}),
]
```
**When to use**: Multiple sign-in options

### Pattern 3: With Callbacks
```typescript
callbacks: {
  async signIn({ user, account }) {
    // Custom logic
  }
}
```
**When to use**: Custom provider handling

## ⚠️ Common Mistakes

### Mistake 1: Missing Environment Variables
```typescript
// ❌ Wrong: Hardcoded credentials
GoogleProvider({
  clientId: 'client-id',
  clientSecret: 'secret',
})
```
**Why**: Should use environment variables.

```typescript
// ✅ Correct: Use env vars
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
})
```

### Mistake 2: Wrong Redirect URI
```typescript
// ❌ Wrong: Wrong redirect URI in provider
// Provider expects: http://localhost:3000/api/auth/callback/google
// But configured: http://localhost:3000/callback
```
**Why**: Redirect URI must match NextAuth callback.

```typescript
// ✅ Correct: Use default callback
// NextAuth automatically handles: /api/auth/callback/[provider]
```

### Mistake 3: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
// OAuth flow might fail
```
**Why**: OAuth flows can fail.

```typescript
// ✅ Correct: Handle errors
callbacks: {
  async signIn({ user, account, profile }) {
    try {
      // Handle sign-in
      return true
    } catch (error) {
      return false
    }
  }
}
```

## ✨ Best Practices

1. **Use environment variables**: Store credentials securely
2. **Configure redirect URIs**: Match provider settings
3. **Handle callbacks**: Customize provider behavior
4. **Test thoroughly**: Test all providers
5. **Error handling**: Handle OAuth errors
6. **User data**: Validate and store user data

## 🔗 Related Concepts

- [NextAuth.js](./nextauth.md) - Authentication setup
- [Session Management](./session-management.md) - Session handling

## 📚 Resources

### Official Documentation
- [NextAuth.js Providers](https://next-auth.js.org/configuration/providers/oauth)

## 🧪 Practice Exercises

### Exercise 1: Google OAuth
**Difficulty**: Beginner  
**Goal**: Understand OAuth setup  
**Instructions**:
1. Set up Google OAuth
2. Configure credentials
3. Test sign-in flow
4. Verify user data

### Exercise 2: Multiple Providers
**Difficulty**: Intermediate  
**Goal**: Practice multiple providers  
**Instructions**:
1. Add multiple OAuth providers
2. Configure callbacks
3. Test all providers
4. Handle provider-specific data

## 🎓 Key Takeaways

- NextAuth supports many OAuth providers
- Configure credentials in environment variables
- Redirect URI must match provider settings
- Use callbacks for custom handling
- Test all providers thoroughly
- Handle OAuth errors gracefully

## ❓ FAQ

### Q: How do I get OAuth credentials?
**A**: Register your app with the OAuth provider (Google, GitHub, etc.).

### Q: What's the redirect URI?
**A**: NextAuth uses `/api/auth/callback/[provider]` by default.

### Q: Can I use multiple providers?
**A**: Yes, add multiple providers to the providers array.

### Q: How do I customize provider behavior?
**A**: Use callbacks (signIn, jwt, session) to customize.

### Q: Can I create custom providers?
**A**: Yes, you can create custom OAuth providers.

---

**Next Steps**: 
- Review: [NextAuth.js](./nextauth.md) for setup
- Practice: Set up OAuth providers
- Build: Add social login to your app

