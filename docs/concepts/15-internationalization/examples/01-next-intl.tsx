// Example 1: next-intl Setup
// Demonstrates setting up next-intl

// i18n.ts - Configuration
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['en', 'fr', 'de']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()
  
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})

// middleware.ts - Locale routing
import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/', '/(fr|de|en)/:path*']
}

// app/[locale]/page.tsx - Client component
'use client'

import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}

// app/[locale]/about/page.tsx - Server component
import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('AboutPage')
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}

// app/[locale]/components/LanguageSwitcher.tsx - Language switcher
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  
  const switchLocale = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
  }
  
  return (
    <div>
      <button onClick={() => switchLocale('en')}>English</button>
      <button onClick={() => switchLocale('fr')}>Français</button>
      <button onClick={() => switchLocale('de')}>Deutsch</button>
    </div>
  )
}

