// Example 2: Webpack Plugins
// Demonstrates integrating Webpack plugins in Next.js

// ============================================
// Example 1: DefinePlugin
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const definePluginConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CUSTOM_VAR': JSON.stringify('value'),
        'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
      })
    )
    return config
  },
}

// module.exports = definePluginConfig

// ============================================
// Example 2: Bundle Analyzer Plugin
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const bundleAnalyzerConfig = {
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
        })
      )
    }
    return config
  },
}

// module.exports = bundleAnalyzerConfig

// ============================================
// Example 3: ProvidePlugin
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const providePluginConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      })
    )
    return config
  },
}

// module.exports = providePluginConfig

// ============================================
// Example 4: IgnorePlugin
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const ignorePluginConfig = {
  webpack: (config) => {
    config.plugins.push(
      new config.webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    )
    return config
  },
}

// module.exports = ignorePluginConfig

// ============================================
// Example 5: NormalModuleReplacementPlugin
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const replacementPluginConfig = {
  webpack: (config) => {
    config.plugins.push(
      new config.webpack.NormalModuleReplacementPlugin(
        /^\.\/environment$/,
        (resource) => {
          if (process.env.NODE_ENV === 'production') {
            resource.request = resource.request.replace(
              /\.\/environment$/,
              './environment.production'
            )
          }
        }
      )
    )
    return config
  },
}

// module.exports = replacementPluginConfig

// ============================================
// Example 6: Multiple Webpack Plugins
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const multiplePluginsConfig = {
  webpack: (config, { webpack, isServer }) => {
    // DefinePlugin
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.IS_SERVER': JSON.stringify(isServer),
      })
    )
    
    // IgnorePlugin for server-side only
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/server-only$/,
        })
      )
    }
    
    // ProvidePlugin
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      })
    )
    
    return config
  },
}

// module.exports = multiplePluginsConfig

