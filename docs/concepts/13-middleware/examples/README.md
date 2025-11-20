# Middleware Examples

This directory contains practical code examples demonstrating Next.js middleware.

## Examples

### 1. Basic Middleware (`01-basic-middleware.ts`)
Demonstrates basic middleware:
- Simple middleware
- Redirect middleware
- Header middleware

### 2. Authentication Middleware (`02-auth-middleware.ts`)
Shows authentication:
- Route protection
- Role-based protection
- Conditional redirects

## How to Use

1. Create middleware.ts in root
2. Add middleware logic
3. Configure matcher
4. Test middleware

## Key Concepts

- Runs on Edge runtime
- Must return NextResponse
- Use matchers to limit scope
- Only Web APIs available
- Keep middleware fast

