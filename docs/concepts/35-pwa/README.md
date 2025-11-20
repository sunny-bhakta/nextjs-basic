# Progressive Web App (PWA)

> **Category**: Advanced | **Priority**: 🟢 Low | **Difficulty**: Intermediate-Advanced  
> **Related Concepts**: [Configuration](../31-configuration/README.md), [Plugins & Extensions](../32-plugins-extensions/README.md)  
> **Status**: ✅ In Progress

## Overview

Converting Next.js applications into Progressive Web Apps with offline support, installability, and native app-like features.

## Key Topics

- [PWA Guide](./pwa-guide.md) - Comprehensive PWA guide
- Service Workers - Offline functionality
- App Manifest - PWA manifest file
- Offline Support - Caching for offline use
- Install Prompts - Making apps installable
- Push Notifications - Browser notifications
- Background Sync - Sync data when online

## Documentation

### Detailed Guides

1. **[PWA Guide](./pwa-guide.md)**
   - Service worker implementation
   - PWA manifest configuration
   - Offline support and caching
   - Install prompts
   - Push notifications

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-service-worker.ts` - Service worker setup
- `02-manifest.ts` - PWA manifest
- `03-offline-support.tsx` - Offline functionality
- `04-push-notifications.ts` - Push notifications

## Quick Start

### Using next-pwa

```typescript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  reactStrictMode: true,
})
```

### Manifest File

```json
// public/manifest.json
{
  "name": "My PWA",
  "short_name": "PWA",
  "description": "My Progressive Web App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## Resources

- [PWA Guide](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)

---

**Previous**: [Monorepo Support](../34-monorepo-support/README.md) | **Next**: [Accessibility](../36-accessibility/README.md)

