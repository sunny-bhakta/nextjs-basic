// Example 2: Source Maps Configuration
// Demonstrates source maps setup for debugging

// ============================================
// Example 1: Enable Source Maps in Production
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const sourceMapsConfig = {
  // Enable source maps in production
  productionBrowserSourceMaps: true,
}

// module.exports = sourceMapsConfig

// ============================================
// Example 2: Source Maps with Webpack
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const webpackSourceMapsConfig = {
  productionBrowserSourceMaps: true,
  
  webpack: (config, { dev, isServer }) => {
    // Custom source map configuration
    if (!dev && !isServer) {
      config.devtool = 'source-map'
    }
    
    return config
  },
}

// module.exports = webpackSourceMapsConfig

// ============================================
// Example 3: Environment-Specific Source Maps
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const envSourceMapsConfig = {
  // Only enable in development or when DEBUG is set
  productionBrowserSourceMaps: 
    process.env.NODE_ENV === 'development' || 
    process.env.DEBUG === 'true',
}

// module.exports = envSourceMapsConfig

// ============================================
// Example 4: Source Map Types
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const sourceMapTypesConfig = {
  productionBrowserSourceMaps: true,
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 'source-map' - Full source maps (slower, more accurate)
      // 'cheap-module-source-map' - Faster, less accurate
      // 'hidden-source-map' - Source maps but not referenced
      config.devtool = 'source-map'
    }
    
    return config
  },
}

// module.exports = sourceMapTypesConfig

// ============================================
// Example 5: Source Maps for API Routes
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const apiSourceMapsConfig = {
  productionBrowserSourceMaps: true,
  
  webpack: (config, { dev, isServer }) => {
    // Enable source maps for server-side code
    if (!dev && isServer) {
      config.devtool = 'source-map'
    }
    
    return config
  },
}

// module.exports = apiSourceMapsConfig

// ============================================
// Example 6: Source Map Exclusions
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const excludedSourceMapsConfig = {
  productionBrowserSourceMaps: true,
  
  webpack: (config) => {
    // Exclude node_modules from source maps
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: /node_modules/,
    })
    
    return config
  },
}

// module.exports = excludedSourceMapsConfig

