// Example 2: Webpack Configuration
// Demonstrates customizing Webpack in Next.js

// ============================================
// Example 1: Basic Webpack Customization
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const basicWebpackConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom webpack plugin
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CUSTOM_BUILD_ID': JSON.stringify(buildId),
      })
    )
    
    return config
  },
}

// module.exports = basicWebpackConfig

// ============================================
// Example 2: SVG Loader
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const svgLoaderConfig = {
  webpack: (config) => {
    // Find the rule that handles SVG files
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )
    
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      }
    )
    
    // Modify the file loader rule to ignore *.svg
    fileLoaderRule.exclude = /\.svg$/i
    
    return config
  },
}

// module.exports = svgLoaderConfig

// ============================================
// Example 3: Custom Loaders
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const customLoaderConfig = {
  webpack: (config) => {
    // Add custom loader for specific file types
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    })
    
    // Add loader for YAML files
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })
    
    return config
  },
}

// module.exports = customLoaderConfig

// ============================================
// Example 4: Webpack Plugins
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const webpackPluginsConfig = {
  webpack: (config, { webpack, isServer }) => {
    // Add Bundle Analyzer (requires next-bundle-analyzer)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      )
    }
    
    // Add custom DefinePlugin
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.IS_SERVER': JSON.stringify(isServer),
        'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
      })
    )
    
    // Ignore specific modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    return config
  },
}

// module.exports = webpackPluginsConfig

// ============================================
// Example 5: Advanced Webpack Configuration
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const advancedWebpackConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modify existing rules
    config.module.rules.forEach((rule: any) => {
      if (rule.test && rule.test.toString().includes('tsx')) {
        rule.use = rule.use || []
        if (Array.isArray(rule.use)) {
          rule.use.push({
            loader: 'custom-loader',
            options: {
              customOption: true,
            },
          })
        }
      }
    })
    
    // Add alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': require('path').join(__dirname, 'components'),
      '@utils': require('path').join(__dirname, 'utils'),
    }
    
    // Add externals (for server-side only)
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        'canvas': 'commonjs canvas',
      })
    }
    
    // Modify optimization
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      }
    }
    
    return config
  },
}

// module.exports = advancedWebpackConfig

