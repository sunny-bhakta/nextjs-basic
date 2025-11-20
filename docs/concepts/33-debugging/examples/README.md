# Debugging Examples

This directory contains practical code examples demonstrating debugging techniques in Next.js.

## Examples

### 1. VS Code Debugging (`01-vscode-debugging.ts`)
Demonstrates VS Code debugging setup:
- Basic server and client debugging
- Full stack debugging
- Node.js debugging configuration
- Chrome debugging with source maps
- Attach to running process
- Compound configurations

### 2. Source Maps (`02-source-maps.ts`)
Shows source maps configuration:
- Enable source maps in production
- Webpack source map configuration
- Environment-specific source maps
- Different source map types
- Source maps for API routes
- Source map exclusions

### 3. Logging Strategies (`03-logging-strategies.ts`)
Demonstrates logging patterns:
- Basic logging utility
- Structured logging with context
- Performance logging
- Conditional logging
- Sanitized logging for security

### 4. Network Debugging (`04-network-debugging.tsx`)
Shows API debugging:
- Debug fetch wrapper
- Network interceptor component
- API client with debugging
- React hook for API debugging

## How to Use

1. **VS Code Debugging**: Copy launch.json to `.vscode/` directory
2. **Source Maps**: Configure in `next.config.js`
3. **Logging**: Import logger utilities in your code
4. **Network Debugging**: Use debug fetch or API client

## Key Concepts

### VS Code Debugging
- Configure in `.vscode/launch.json`
- Supports server and client debugging
- Can debug full stack simultaneously
- Attach to running processes

### Source Maps
- Enable readable stack traces
- Configure in next.config.js
- Different types for different needs
- Can be enabled in production

### Logging
- Structured logging for better debugging
- Sanitize sensitive data
- Conditional logging by environment
- Performance logging for optimization

### Network Debugging
- Intercept fetch calls
- Log request/response details
- Track API call performance
- Debug API errors

## Best Practices

1. **Use VS Code debugger**: Set up proper debugging configuration
2. **Enable source maps**: For readable production errors
3. **Structured logging**: Use consistent log format
4. **Sanitize logs**: Never log sensitive data
5. **Network debugging**: Log API calls and responses
6. **Performance logging**: Track slow operations
7. **Conditional logging**: Only log in development

