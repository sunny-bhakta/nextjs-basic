# Authentication Examples

This directory contains practical code examples demonstrating authentication in Next.js.

## Examples

### 1. NextAuth Setup (`01-nextauth-setup.tsx`)
Demonstrates NextAuth.js setup:
- Basic NextAuth configuration
- Session provider
- Using session in components
- Sign in/out functionality

### 2. OAuth Providers (`02-oauth-providers.tsx`)
Shows OAuth provider integration:
- Google OAuth
- Multiple providers
- Provider buttons
- OAuth flow

### 3. Protected Routes (`03-protected-routes.tsx`)
Demonstrates route protection:
- Middleware protection
- Server component protection
- API route protection
- Client-side guards

### 4. JWT Authentication (`04-jwt-authentication.ts`)
Shows JWT-based authentication:
- Login with JWT
- Token verification
- Protected APIs
- Token refresh

### 5. Complete Example (`05-complete-example.tsx`)
A comprehensive example combining:
- NextAuth with multiple providers
- Middleware protection
- Protected pages
- Login page
- User menu
- Role-based access

## How to Use

1. **Install dependencies**: `npm install next-auth jsonwebtoken`
2. **Set up environment variables**: Add OAuth credentials
3. **Copy code** from example files
4. **Create corresponding files** in your app
5. **Run your app**: `npm run dev`
6. **Test authentication**: Test login, protection, etc.

## File Structure

```
app/
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts        # NextAuth configuration
├── login/
│   └── page.tsx                # Login page
├── dashboard/
│   └── page.tsx                # Protected dashboard
├── components/
│   ├── UserButton.tsx          # User button component
│   └── ProtectedContent.tsx    # Protected content wrapper
├── providers.tsx                # Session provider
└── layout.tsx                   # Root layout
middleware.ts                     # Route protection
.env.local                        # Environment variables
```

## Key Concepts

- NextAuth.js: Complete auth solution
- OAuth providers: Social login
- JWT: Token-based authentication
- Session management: User sessions
- Route protection: Securing routes
- Role-based access: Different access levels

## Environment Variables

```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
```

## Next Steps

- Review detailed guides in parent directory
- Practice setting up authentication
- Secure your application with auth

