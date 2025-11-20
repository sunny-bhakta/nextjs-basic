# next/script

> **Category**: Core | **Related Concepts**: [Performance Optimization](../22-performance-optimization/README.md)  
> **Last Updated**: 2024

## 📖 Overview

The `next/script` component allows you to optimize third-party scripts with different loading strategies. It helps improve performance by controlling when and how scripts are loaded.

**Key Points:**
- Optimized script loading
- Multiple loading strategies
- Automatic optimization
- Better performance
- Prevents blocking
- Script deduplication

## 🎯 When to Use

- **Third-Party Scripts**: Analytics, chat widgets, etc.
- **Performance**: When you need optimized script loading
- **Critical Scripts**: Scripts that need to load early
- **Non-Critical Scripts**: Scripts that can load later
- **External Scripts**: Scripts from external sources

## 💻 Basic Example

### After Interactive (Default)

```typescript
// app/page.tsx
import Script from 'next/script'

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Script src="https://example.com/script.js" />
    </div>
  )
}
```

### Before Interactive

```typescript
// app/layout.tsx
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
          src="https://example.com/script.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  )
}
```

### Lazy Onload

```typescript
// app/page.tsx
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
```

## 🔧 Advanced Example

### Inline Script

```typescript
// app/page.tsx
import Script from 'next/script'

export default function HomePage() {
  return (
    <div>
      <Script id="inline-script" strategy="afterInteractive">
        {`
          console.log('Inline script executed');
        `}
      </Script>
    </div>
  )
}
```

### Script with Callback

```typescript
// app/page.tsx
import Script from 'next/script'

export default function HomePage() {
  return (
    <div>
      <Script
        src="https://example.com/script.js"
        onLoad={() => {
          console.log('Script loaded')
        }}
        onError={() => {
          console.error('Script failed to load')
        }}
      />
    </div>
  )
}
```

### Multiple Scripts

```typescript
// app/page.tsx
import Script from 'next/script'

export default function HomePage() {
  return (
    <div>
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
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Analytics
```typescript
<Script src="https://analytics.example.com/script.js" strategy="afterInteractive" />
```
**When to use**: Analytics scripts

### Pattern 2: Chat Widget
```typescript
<Script src="https://chat.example.com/widget.js" strategy="lazyOnload" />
```
**When to use**: Non-critical widgets

### Pattern 3: Critical Script
```typescript
<Script src="https://example.com/critical.js" strategy="beforeInteractive" />
```
**When to use**: Scripts needed before page interactive

## ⚠️ Common Mistakes

### Mistake 1: Using Regular script Tag
```typescript
// ❌ Wrong: Regular script tag
<script src="https://example.com/script.js" />
// No optimization
```
**Why**: Regular script tags don't get Next.js optimizations.

```typescript
// ✅ Correct: Use next/script
import Script from 'next/script'
<Script src="https://example.com/script.js" />
```

### Mistake 2: Wrong Strategy
```typescript
// ❌ Wrong: beforeInteractive in page component
<Script src="https://example.com/script.js" strategy="beforeInteractive" />
// beforeInteractive only works in layout
```
**Why**: `beforeInteractive` only works in `_document` or root layout.

```typescript
// ✅ Correct: Use appropriate strategy
<Script src="https://example.com/script.js" strategy="afterInteractive" />
```

### Mistake 3: Missing ID for Inline Scripts
```typescript
// ❌ Wrong: No ID for inline script
<Script strategy="afterInteractive">
  {`console.log('test')`}
</Script>
```
**Why**: Inline scripts need an `id` prop.

```typescript
// ✅ Correct: Add ID
<Script id="inline-script" strategy="afterInteractive">
  {`console.log('test')`}
</Script>
```

## ✨ Best Practices

1. **Use next/script**: For all third-party scripts
2. **Choose right strategy**: Match strategy to script importance
3. **Add IDs**: For inline scripts, always add id prop
4. **Handle errors**: Use onError callback
5. **Monitor loading**: Use onLoad callback
6. **Avoid blocking**: Use lazyOnload for non-critical scripts

## 🔗 Related Concepts

- [Performance Optimization](../22-performance-optimization/README.md) - Performance

## 📚 Resources

### Official Documentation
- [Script Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)

## 🧪 Practice Exercises

### Exercise 1: Basic Script
**Difficulty**: Beginner  
**Goal**: Understand next/script basics  
**Instructions**:
1. Add a script using next/script
2. Test different strategies
3. Verify script loading
4. Check performance

### Exercise 2: Analytics Setup
**Difficulty**: Intermediate  
**Goal**: Practice analytics integration  
**Instructions**:
1. Add Google Analytics
2. Use appropriate strategy
3. Test tracking
4. Verify optimization

## 🎓 Key Takeaways

- Use `next/script` for third-party scripts
- Choose appropriate loading strategy
- `beforeInteractive` only works in layout
- Add ID for inline scripts
- Use callbacks for monitoring
- Avoid blocking critical rendering

## ❓ FAQ

### Q: What's the default strategy?
**A**: `afterInteractive` is the default strategy.

### Q: Can I use beforeInteractive in pages?
**A**: No, `beforeInteractive` only works in root layout or `_document`.

### Q: Do I need to add ID for external scripts?
**A**: No, ID is only required for inline scripts.

### Q: What's the difference between strategies?
**A**: `beforeInteractive` loads before page interactive, `afterInteractive` after, `lazyOnload` when browser is idle.

### Q: Can I use multiple scripts?
**A**: Yes, you can use multiple Script components.

---

**Next Steps**: 
- Review: [Performance Optimization](../22-performance-optimization/README.md) for performance
- Practice: Add scripts to your app
- Build: Optimize third-party scripts

