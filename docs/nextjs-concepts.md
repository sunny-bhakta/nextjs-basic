# Complete Next.js Concepts List

A comprehensive guide to all major Next.js concepts and features.

> **📊 Progress Tracker**: See [LEARNING_PROGRESS.md](./LEARNING_PROGRESS.md) to track your learning progress  
> **📚 Learning Plan**: See [CONCEPTS_LEARNING_PLAN.md](./CONCEPTS_LEARNING_PLAN.md) for a structured learning approach  
> **📝 Template**: Use [concepts/TEMPLATE.md](./concepts/TEMPLATE.md) when creating detailed guides

## Quick Navigation

- [Core Concepts](#-core-concepts) (1-10)
- [Intermediate Concepts](#-intermediate-concepts) (11-25)
- [Advanced Concepts](#-advanced-concepts) (26-40)
- [Learning Path](#-learning-path)
- [Resources](#-key-resources)

## How to Use This Guide

1. **Review the concepts** below to understand what you need to learn
2. **Track your progress** in [LEARNING_PROGRESS.md](./LEARNING_PROGRESS.md)
3. **Follow the learning plan** in [CONCEPTS_LEARNING_PLAN.md](./CONCEPTS_LEARNING_PLAN.md)
4. **Create detailed guides** using the [template](./concepts/TEMPLATE.md) as you learn each concept
5. **Build projects** to practice and reinforce your learning

**Status Legend:**
- ⏳ Not Started
- 📚 In Progress  
- ✅ Completed
- 🔄 Review Needed

---

## 🚀 Core Concepts

*These are the fundamental concepts you should learn first.*

### 1. **Pages & Routing** ⏳
**Priority**: 🔴 High | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#1-pages--routing) | [📚 Detailed Guide](./concepts/01-routing/README.md)
- File-based routing system
- Dynamic routes (`[id].js`, `[...slug].js`)
- Nested routes and route groups
- Route parameters and query strings
- Catch-all routes (`[...params]`)
- Optional catch-all routes (`[[...params]]`)
- Route prefetching
- Programmatic navigation (`useRouter`, `router.push`, `router.replace`)
- Shallow routing
- Route handlers (API routes in `app` directory)

### 2. **Rendering Strategies** ⏳
**Priority**: 🔴 High | **Difficulty**: Beginner-Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#2-rendering-strategies) | [📚 Detailed Guide](./concepts/02-rendering/README.md)
- **Server-Side Rendering (SSR)**
  - `getServerSideProps`
  - Server Components (App Router)
- **Static Site Generation (SSG)**
  - `getStaticProps`
  - `getStaticPaths`
  - Incremental Static Regeneration (ISR)
  - On-demand ISR (`revalidate`)
- **Client-Side Rendering (CSR)**
  - `useEffect` for data fetching
  - Client Components
- **Hybrid Rendering**
  - Mixing SSR, SSG, and CSR
  - Partial prerendering

### 3. **App Router (Next.js 13+)** ⏳
**Priority**: 🔴 High | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#3-app-router-nextjs-13) | [📚 Detailed Guide](./concepts/03-app-router/README.md)
- `app/` directory structure
- Layouts (`layout.tsx`)
- Pages (`page.tsx`)
- Loading states (`loading.tsx`)
- Error boundaries (`error.tsx`)
- Not found pages (`not-found.tsx`)
- Route groups (`(groupName)`)
- Parallel routes (`@folder`)
- Intercepting routes (`(.)folder`, `(..)folder`, etc.)
- Server Components vs Client Components
- Streaming and Suspense
- Route Handlers (API routes)

### 4. **Pages Router (Legacy)** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#4-pages-router-legacy)  
*Note: Legacy router, learn for reference but use App Router for new projects*
- `pages/` directory structure
- `_app.js` (Custom App)
- `_document.js` (Custom Document)
- `_error.js` (Custom Error Page)
- `404.js` (Custom 404)
- `500.js` (Custom 500)
- API routes (`pages/api/`)

### 5. **Data Fetching** ⏳
**Priority**: 🔴 High | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#5-data-fetching)
- `getStaticProps` (SSG)
- `getStaticPaths` (Dynamic SSG)
- `getServerSideProps` (SSR)
- `fetch` API with caching
- Server Actions (App Router)
- `useSWR` integration
- React Query integration
- Data fetching in Client Components

### 6. **API Routes** ⏳
**Priority**: 🔴 High | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#6-api-routes)
- API route handlers (`pages/api/` or `app/api/`)
- HTTP methods (GET, POST, PUT, DELETE, etc.)
- Request/Response handling
- Middleware in API routes
- Dynamic API routes
- API route middleware
- Edge runtime for API routes

### 7. **Image Optimization** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#7-image-optimization)
- `next/image` component
- Image optimization and lazy loading
- Responsive images
- Image domains configuration
- Image formats (WebP, AVIF)
- Placeholder images (blur, empty)
- Priority loading
- Image sizing and layout

### 8. **Font Optimization** ⏳
**Priority**: 🟢 Low | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#8-font-optimization)
- `next/font` (Font optimization)
- Google Fonts integration
- Local fonts
- Font display strategies
- Variable fonts
- Font preloading

### 9. **Script Optimization** ⏳
**Priority**: 🟢 Low | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#9-script-optimization)
- `next/script` component
- Script loading strategies
- `beforeInteractive`
- `afterInteractive`
- `lazyOnload`
- Script optimization

### 10. **Styling** ⏳
**Priority**: 🔴 High | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#10-styling)

---

## 📘 Intermediate Concepts

*Build on core concepts with these intermediate topics.*

### 11. **Metadata & SEO** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#11-metadata--seo)
- CSS Modules
- Global CSS
- Sass/SCSS support
- Tailwind CSS integration
- Styled JSX
- CSS-in-JS libraries (styled-components, emotion)
- PostCSS configuration
- CSS variables

### 11. **Metadata & SEO**
- `<Head>` component (Pages Router)
- `metadata` object (App Router)
- Dynamic metadata
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt
- Canonical URLs

### 12. **Environment Variables** ⏳
**Priority**: 🔴 High | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#12-environment-variables)
- `.env.local`
- `.env.development`
- `.env.production`
- `.env`
- Server-side vs Client-side variables
- `NEXT_PUBLIC_` prefix
- Environment variable validation

### 13. **Middleware** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#13-middleware)
- `middleware.ts` file
- Request/Response manipulation
- Redirects and rewrites
- Authentication checks
- A/B testing
- Edge runtime
- Conditional logic
- Cookie handling
- Headers manipulation

### 14. **Redirects & Rewrites** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#14-redirects--rewrites)
- `next.config.js` redirects
- `next.config.js` rewrites
- Dynamic redirects
- Permanent vs temporary redirects
- URL rewriting
- External redirects

### 15. **Internationalization (i18n)** ⏳
**Priority**: 🟢 Low | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#15-internationalization-i18n)
- Locale detection
- Locale routing
- Default locale
- Locale domains
- `next-intl` integration
- Language switching
- Locale-specific content

### 16. **Authentication** ⏳
**Priority**: 🔴 High | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#16-authentication)
- NextAuth.js integration
- JWT authentication
- Session management
- OAuth providers
- Custom authentication
- Protected routes
- Server-side auth checks
- Client-side auth checks

### 17. **State Management** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#17-state-management)
- React Context API
- Redux integration
- Zustand
- Jotai
- Recoil
- SWR
- React Query
- Local state with `useState`
- Server state vs Client state

### 18. **Forms & User Input** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#18-forms--user-input)
- Form handling
- Form validation
- Server Actions (App Router)
- Form submission
- File uploads
- Form libraries (React Hook Form, Formik)
- Controlled vs Uncontrolled components

### 19. **File Uploads** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#19-file-uploads)
- File upload handling
- Multipart form data
- File validation
- File storage (local, cloud)
- Image upload optimization
- Progress tracking

### 20. **Database Integration** ⏳
**Priority**: 🔴 High | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#20-database-integration)
- Prisma ORM
- TypeORM
- Mongoose (MongoDB)
- SQL databases (PostgreSQL, MySQL)
- Database connection pooling
- Server-side database queries
- Database migrations

### 21. **Caching** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate-Advanced  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#21-caching)
- Static page caching
- ISR caching
- API route caching
- `fetch` caching strategies
- Cache revalidation
- On-demand revalidation
- Cache tags
- Time-based revalidation

### 22. **Performance Optimization** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate-Advanced  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#22-performance-optimization)
- Code splitting
- Automatic code splitting
- Dynamic imports (`next/dynamic`)
- Lazy loading components
- Bundle analysis
- Web Vitals optimization
- Performance monitoring
- Lighthouse optimization

### 23. **TypeScript Support** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#23-typescript-support)
- TypeScript configuration
- Type definitions
- Type-safe API routes
- Type-safe props
- Type inference
- TypeScript strict mode

### 24. **Testing** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#24-testing)
- Jest configuration
- React Testing Library
- Unit testing
- Integration testing
- E2E testing (Playwright, Cypress)
- Snapshot testing
- Mocking API calls
- Testing API routes

### 25. **Deployment** ⏳
**Priority**: 🔴 High | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#25-deployment)

---

## 🚀 Advanced Concepts

*Master these advanced topics to become a Next.js expert.*

### 26. **Error Handling** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#26-error-handling)
- Vercel deployment
- Static export
- Docker deployment
- Serverless deployment
- Environment-specific builds
- Build optimization
- Deployment previews

### 26. **Error Handling**
- Error boundaries
- `_error.js` (Pages Router)
- `error.tsx` (App Router)
- Try-catch in Server Components
- API route error handling
- Custom error pages
- Error logging

### 27. **WebSockets & Real-time** ⏳
**Priority**: 🟢 Low | **Difficulty**: Advanced  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#27-websockets--real-time)
- WebSocket integration
- Socket.io
- Server-Sent Events (SSE)
- Real-time updates
- WebSocket API routes

### 28. **Analytics** ⏳
**Priority**: 🟢 Low | **Difficulty**: Beginner-Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#28-analytics)
- Vercel Analytics
- Google Analytics
- Custom analytics
- Web Vitals tracking
- Performance monitoring
- User behavior tracking

### 29. **Security** ⏳
**Priority**: 🔴 High | **Difficulty**: Intermediate-Advanced  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#29-security)
- Content Security Policy (CSP)
- XSS prevention
- CSRF protection
- Secure headers
- Environment variable security
- API route security
- Authentication security

### 30. **Advanced Features** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Advanced  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#30-advanced-features)
- **Edge Functions**
  - Edge runtime
  - Edge API routes
  - Edge middleware
- **Streaming**
  - Streaming SSR
  - Suspense boundaries
  - Progressive rendering
- **React Server Components**
  - Server Components
  - Client Components
  - Component composition
- **Turbopack** (Next.js 13+)
  - Faster builds
  - Faster dev server
- **Partial Prerendering**
  - Hybrid rendering
  - Dynamic islands

### 31. **Configuration** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#31-configuration)
- `next.config.js`
- Webpack configuration
- Babel configuration
- TypeScript configuration
- ESLint configuration
- Custom server setup
- Custom build configuration

### 32. **Plugins & Extensions** ⏳
**Priority**: 🟢 Low | **Difficulty**: Advanced  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#32-plugins--extensions)
- Next.js plugins
- Webpack plugins
- Babel plugins
- Community plugins
- Custom plugins

### 33. **Debugging** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#33-debugging)
- Development tools
- Error overlay
- Source maps
- Debug mode
- Console logging
- Network debugging

### 34. **Monorepo Support** ⏳
**Priority**: 🟢 Low | **Difficulty**: Advanced  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#34-monorepo-support)
- Workspaces
- Turborepo integration
- Shared packages
- Multi-app setup

### 35. **Progressive Web App (PWA)** ⏳
**Priority**: 🟢 Low | **Difficulty**: Intermediate-Advanced  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#35-progressive-web-app-pwa)
- Service workers
- Offline support
- App manifest
- Install prompts
- Push notifications

### 36. **Accessibility** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#36-accessibility)
- ARIA attributes
- Semantic HTML
- Keyboard navigation
- Screen reader support
- Focus management

### 37. **Code Organization** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Beginner-Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#37-code-organization)
- Folder structure
- Component organization
- Utility functions
- Shared components
- Feature-based structure
- Barrel exports

### 38. **API Integration** ⏳
**Priority**: 🟡 Medium | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#38-api-integration)
- REST APIs
- GraphQL (Apollo, Relay)
- tRPC
- API client setup
- Error handling
- Request interceptors
- Response interceptors

### 39. **File System** ⏳
**Priority**: 🟢 Low | **Difficulty**: Beginner  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#39-file-system)
- Public folder (`public/`)
- Static assets
- File serving
- Asset optimization

### 40. **Build & Production** ⏳
**Priority**: 🔴 High | **Difficulty**: Intermediate  
**Status**: ⏳ Not Started | [Track Progress](./LEARNING_PROGRESS.md#40-build--production)
- Build process
- Production optimizations
- Bundle size optimization
- Tree shaking
- Minification
- Compression

---

## 📚 Learning Path

### Beginner
1. Pages & Routing
2. Basic Data Fetching
3. Styling
4. Image Optimization
5. Environment Variables

### Intermediate
1. App Router vs Pages Router
2. Server Components & Client Components
3. API Routes
4. Middleware
5. Authentication
6. Database Integration

### Advanced
1. Edge Functions
2. Streaming & Suspense
3. Advanced Caching Strategies
4. Performance Optimization
5. Custom Server Setup
6. Monorepo Architecture

---

## 🔗 Key Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Next.js Blog](https://nextjs.org/blog)

---

## 📝 Notes

- Next.js is constantly evolving, especially with the App Router
- Always refer to the latest documentation for current best practices
- The App Router (Next.js 13+) is the recommended approach for new projects
- Pages Router is still supported but considered legacy for new projects

