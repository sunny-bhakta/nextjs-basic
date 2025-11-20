// Example 1: VS Code Debugging Configuration
// Demonstrates VS Code debugging setup for Next.js

// ============================================
// Example 1: Basic VS Code Debugging
// File: .vscode/launch.json
// ============================================

/*
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
*/

// ============================================
// Example 2: Full Stack Debugging
// File: .vscode/launch.json
// ============================================

/*
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
*/

// ============================================
// Example 3: Node.js Debugging
// File: .vscode/launch.json
// ============================================

/*
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
*/

// ============================================
// Example 4: Chrome Debugging with Source Maps
// File: .vscode/launch.json
// ============================================

/*
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack://_N_E/*": "${webRoot}/*"
      }
    }
  ]
}
*/

// ============================================
// Example 5: Attach to Running Process
// File: .vscode/launch.json
// ============================================

/*
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: attach to server",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: attach to Chrome",
      "type": "chrome",
      "request": "attach",
      "port": 9222,
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}

// To use attach mode, start Next.js with:
// NODE_OPTIONS='--inspect' npm run dev
*/

// ============================================
// Example 6: Compound Configuration
// File: .vscode/launch.json
// ============================================

/*
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ],
  "compounds": [
    {
      "name": "Next.js: debug full stack",
      "configurations": [
        "Next.js: debug server-side",
        "Next.js: debug client-side"
      ]
    }
  ]
}
*/

