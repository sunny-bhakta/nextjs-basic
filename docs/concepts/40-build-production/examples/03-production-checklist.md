# Production Checklist

## Pre-Deployment

- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm start`
- [ ] Check for console errors
- [ ] Verify all environment variables are set
- [ ] Test all critical user flows
- [ ] Check bundle size
- [ ] Verify API endpoints work
- [ ] Test error handling

## Performance

- [ ] Optimize images (use Next.js Image)
- [ ] Enable compression
- [ ] Check Core Web Vitals
- [ ] Minimize bundle size
- [ ] Enable caching
- [ ] Test on slow networks
- [ ] Check Lighthouse score

## Security

- [ ] Set security headers
- [ ] Verify environment variables are secure
- [ ] Check for exposed secrets
- [ ] Enable HTTPS
- [ ] Review dependencies for vulnerabilities
- [ ] Set up error tracking
- [ ] Configure CORS properly

## Monitoring

- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure analytics
- [ ] Set up performance monitoring
- [ ] Configure logging
- [ ] Set up alerts
- [ ] Monitor API usage

## Testing

- [ ] Run all tests
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test accessibility
- [ ] Test keyboard navigation
- [ ] Verify SEO meta tags

