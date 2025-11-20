# Public Folder Structure

## Basic Structure

```
public/
  images/
    logo.png
    hero.jpg
    icons/
      icon-1.png
      icon-2.png
  fonts/
    custom-font.woff2
  icons/
    favicon.ico
    apple-touch-icon.png
  documents/
    guide.pdf
    terms.pdf
```

## Usage Examples

### Images

```typescript
// Direct usage
<img src="/images/logo.png" alt="Logo" />

// Next.js Image
import Image from 'next/image'
<Image src="/images/hero.jpg" alt="Hero" width={1200} height={600} />
```

### Icons

```typescript
// Favicon
<link rel="icon" href="/icons/favicon.ico" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
```

### Documents

```typescript
// PDF link
<a href="/documents/guide.pdf" download>Download Guide</a>
```

## Organized Structure

```
public/
  assets/
    images/
      logos/
        logo-light.png
        logo-dark.png
      backgrounds/
        hero-bg.jpg
      products/
        product-1.jpg
        product-2.jpg
    fonts/
      primary/
        font-regular.woff2
        font-bold.woff2
      secondary/
        font-regular.woff2
    icons/
      social/
        facebook.svg
        twitter.svg
      ui/
        arrow.svg
        check.svg
  static/
    documents/
      legal/
        terms.pdf
        privacy.pdf
      guides/
        user-guide.pdf
    data/
      config.json
```

