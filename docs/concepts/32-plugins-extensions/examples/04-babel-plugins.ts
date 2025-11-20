// Example 4: Babel Plugins
// Demonstrates Babel plugin configuration in Next.js

// ============================================
// Example 1: Basic Babel Configuration
// File: .babelrc or babel.config.js
// ============================================

/*
module.exports = {
  presets: ['next/babel'],
  plugins: [],
}
*/

// ============================================
// Example 2: Babel Plugin with Options
// File: .babelrc
// ============================================

/*
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
*/

// ============================================
// Example 3: Multiple Babel Plugins
// File: babel.config.js
// ============================================

/*
module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'babel-plugin-styled-components',
  ],
}
*/

// ============================================
// Example 4: Conditional Babel Plugins
// File: babel.config.js
// ============================================

/*
module.exports = {
  presets: ['next/babel'],
  plugins: [
    // Only in development
    ...(process.env.NODE_ENV === 'development'
      ? ['babel-plugin-react-require']
      : []),
    // Always include
    'babel-plugin-styled-components',
  ],
}
*/

// ============================================
// Example 5: Babel Plugin for Code Transformation
// File: babel.config.js
// ============================================

/*
module.exports = {
  presets: ['next/babel'],
  plugins: [
    // Transform imports
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './',
          '@components': './components',
          '@utils': './utils',
        },
      },
    ],
    // Remove console in production
    ...(process.env.NODE_ENV === 'production'
      ? [['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]]
      : []),
  ],
}
*/

// ============================================
// Example 6: Babel Plugin in next.config.js
// File: next.config.js
// ============================================

/** @type {import('next').NextConfig} */
const babelConfig = {
  // Note: Babel config is typically in .babelrc
  // But you can also configure it here
  // However, Next.js uses SWC by default, not Babel
  // To use Babel, you need to disable SWC minification:
  
  swcMinify: false, // Disable SWC to use Babel
  
  // Babel config should be in .babelrc or babel.config.js
}

// module.exports = babelConfig

// ============================================
// Example 7: styled-components Babel Plugin
// File: babel.config.js
// ============================================

/*
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
}
*/

// ============================================
// Example 8: Import Plugin for Tree Shaking
// File: babel.config.js
// ============================================

/*
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
}
*/

