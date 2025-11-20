// Example 3: E2E Tests
// Demonstrates E2E testing with Playwright

import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Next.js/)
  })

  test('should navigate to about page', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.click('text=About')
    await expect(page).toHaveURL('http://localhost:3000/about')
  })
})

test.describe('User Flow', () => {
  test('should complete user registration', async ({ page }) => {
    await page.goto('http://localhost:3000/register')
    
    // Fill form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="password"]', 'password123')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Wait for success message
    await expect(page.locator('text=Registration successful')).toBeVisible()
  })

  test('should handle form validation', async ({ page }) => {
    await page.goto('http://localhost:3000/register')
    
    // Try to submit empty form
    await page.click('button[type="submit"]')
    
    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible()
    await expect(page.locator('text=Email is required')).toBeVisible()
  })
})

test.describe('API Interactions', () => {
  test('should fetch and display data', async ({ page }) => {
    // Mock API response
    await page.route('**/api/products', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: '1', name: 'Product 1', price: 100 },
          { id: '2', name: 'Product 2', price: 200 }
        ])
      })
    })

    await page.goto('http://localhost:3000/products')
    
    // Wait for products to load
    await expect(page.locator('text=Product 1')).toBeVisible()
    await expect(page.locator('text=Product 2')).toBeVisible()
  })
})

test.describe('Authentication Flow', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    
    await page.fill('input[name="email"]', 'user@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Wait for redirect
    await expect(page).toHaveURL('http://localhost:3000/dashboard')
  })

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    
    await page.fill('input[name="email"]', 'wrong@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=Invalid credentials')).toBeVisible()
  })
})

// playwright.config.ts - Playwright configuration
/*
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
*/

