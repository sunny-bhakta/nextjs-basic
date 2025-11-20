// Example 3: Custom Plugin
// Demonstrates creating custom Next.js plugins

// ============================================
// Example 1: Basic Custom Plugin
// File: plugins/basic-plugin.js
// ============================================

/*
module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    // Add custom configuration
    customOption: 'value',
  }
}
*/

// ============================================
// Example 2: Plugin with Webpack Configuration
// File: plugins/webpack-plugin.js
// ============================================

/*
module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack: (config, options) => {
      // Preserve existing webpack config
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }
      
      // Add custom webpack configuration
      config.plugins.push(
        new options.webpack.DefinePlugin({
          'process.env.CUSTOM_PLUGIN': JSON.stringify('enabled'),
        })
      )
      
      return config
    },
  }
}
*/

// ============================================
// Example 3: Plugin with Options
// File: plugins/configurable-plugin.js
// ============================================

/*
module.exports = (pluginOptions = {}) => {
  return (nextConfig = {}) => {
    const {
      enabled = true,
      customOption = 'default',
    } = pluginOptions
    
    if (!enabled) {
      return nextConfig
    }
    
    return {
      ...nextConfig,
      webpack: (config, options) => {
        if (typeof nextConfig.webpack === 'function') {
          config = nextConfig.webpack(config, options)
        }
        
        config.plugins.push(
          new options.webpack.DefinePlugin({
            'process.env.PLUGIN_OPTION': JSON.stringify(customOption),
          })
        )
        
        return config
      },
    }
  }
}

// Usage:
// const withPlugin = require('./plugins/configurable-plugin')({
//   enabled: true,
//   customOption: 'my-value',
// })
// module.exports = withPlugin({ reactStrictMode: true })
*/

// ============================================
// Example 4: Plugin with Environment Check
// File: plugins/environment-plugin.js
// ============================================

/*
module.exports = (nextConfig = {}) => {
  const isProduction = process.env.NODE_ENV === 'production'
  
  return {
    ...nextConfig,
    webpack: (config, options) => {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }
      
      // Only apply in production
      if (isProduction) {
        config.plugins.push(
          new options.webpack.DefinePlugin({
            'process.env.PRODUCTION_ONLY': JSON.stringify('true'),
          })
        )
      }
      
      return config
    },
  }
}
*/

// ============================================
// Example 5: Plugin with Custom Loader
// File: plugins/loader-plugin.js
// ============================================

/*
module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack: (config, options) => {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options)
      }
      
      // Add custom loader
      config.module.rules.push({
        test: /\.custom$/,
        use: [
          {
            loader: 'custom-loader',
            options: {
              option1: 'value1',
            },
          },
        ],
      })
      
      return config
    },
  }
}
*/

// ============================================
// Example 6: Complete Custom Plugin
// File: plugins/complete-plugin.js
// ============================================

/*
module.exports = (pluginOptions = {}) => {
  return (nextConfig = {}) => {
    const {
      enabled = true,
      featureFlag = false,
    } = pluginOptions
    
    if (!enabled) {
      return nextConfig
    }
    
    return {
      ...nextConfig,
      // Modify Next.js config
      reactStrictMode: nextConfig.reactStrictMode ?? true,
      
      // Custom webpack configuration
      webpack: (config, { webpack, isServer }) => {
        // Preserve existing webpack config
        if (typeof nextConfig.webpack === 'function') {
          config = nextConfig.webpack(config, { webpack, isServer })
        }
        
        // Add DefinePlugin
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.FEATURE_FLAG': JSON.stringify(featureFlag),
            'process.env.PLUGIN_ENABLED': JSON.stringify(true),
          })
        )
        
        // Add custom loader
        config.module.rules.push({
          test: /\.custom$/,
          use: ['custom-loader'],
        })
        
        // Modify resolve
        config.resolve.alias = {
          ...config.resolve.alias,
          '@custom': require('path').join(__dirname, 'custom'),
        }
        
        return config
      },
      
      // Custom headers
      async headers() {
        const existingHeaders = await (nextConfig.headers?.() || [])
        return [
          ...existingHeaders,
          {
            source: '/:path*',
            headers: [
              {
                key: 'X-Custom-Plugin',
                value: 'enabled',
              },
            ],
          },
        ]
      },
    }
  }
}

// Usage:
// const withPlugin = require('./plugins/complete-plugin')({
//   enabled: true,
//   featureFlag: true,
// })
// module.exports = withPlugin({ reactStrictMode: true })
*/

