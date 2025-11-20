# PWA Examples

This directory contains practical code examples demonstrating Progressive Web App features in Next.js.

## Examples

### 1. Service Worker (`01-service-worker.ts`)
Demonstrates service worker implementation:
- Basic service worker setup
- Cache first strategy
- Network first strategy
- Stale while revalidate
- Offline fallback
- Background sync
- Service worker registration

### 2. PWA Manifest (`02-manifest.ts`)
Shows manifest configuration:
- Basic manifest
- Complete manifest with all options
- Linking manifest in layout
- Dynamic manifest (Next.js 13+)
- Manifest with categories

### 3. Offline Support (`03-offline-support.tsx`)
Demonstrates offline functionality:
- Offline detection
- Offline page
- Offline data storage with IndexedDB
- Offline-aware API client
- Offline hook

### 4. Push Notifications (`04-push-notifications.ts`)
Shows push notification implementation:
- Request notification permission
- Show local notifications
- Push subscription
- Service worker push handler
- Push notification API route
- Send push notifications (server)
- Notification actions

## How to Use

1. **Install next-pwa**: `npm install next-pwa`
2. **Configure next.config.js**: Add withPWA plugin
3. **Create manifest.json**: Add to public directory
4. **Register service worker**: Add registration code
5. **Test offline**: Use Chrome DevTools

## Key Concepts

### Service Worker
- Runs in background
- Handles caching
- Enables offline functionality
- Intercepts network requests

### Manifest
- Defines app metadata
- Makes app installable
- Sets theme and icons
- Configures display mode

### Offline Support
- Cache resources
- Store data locally
- Queue requests for sync
- Provide offline fallback

### Push Notifications
- Request user permission
- Subscribe to push service
- Handle push events
- Show notifications

## Best Practices

1. **Use next-pwa**: Simplifies PWA setup
2. **Test offline**: Always test offline functionality
3. **Cache selectively**: Don't cache everything
4. **Update strategy**: Handle service worker updates
5. **Manifest icons**: Provide all required sizes
6. **Offline fallback**: Provide offline page
7. **Push permissions**: Request permission appropriately
8. **Notification actions**: Provide useful actions

