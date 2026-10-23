import { vehicles } from './app/data/vehicles'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  // Flatten component directories so components can be used as <AppHeader />,
  // <VehicleCard /> and so on, regardless of their folder.
  components: [{ path: '~/components', pathPrefix: false }],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en-NG' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#111315' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/images/branding/apple-touch-icon.png' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/manrope-latin.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/sora-latin.woff2', crossorigin: 'anonymous' },
      ],
    },
  },

  image: {
    quality: 82,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
    },
  },

  site: {
    url: 'https://vantagemotors.example',
    name: 'Vantage Motors',
    description: 'A curated selection of new and pre-owned vehicles, presented with transparent pricing and straightforward enquiries.',
    defaultLocale: 'en-NG',
  },

  sitemap: {
    urls: () => {
      const staticRoutes = [
        '/',
        '/cars',
        '/new-arrivals',
        '/sell-your-car',
        '/about',
        '/contact',
        '/test-drive',
        '/faq',
        '/privacy-policy',
        '/terms',
      ].map((loc) => ({
        loc,
        changefreq: 'weekly' as const,
        priority: (loc === '/' ? 1 : 0.7) as 1 | 0.7,
      }))

      const vehicleRoutes = vehicles.map((vehicle) => ({
        loc: `/cars/${vehicle.slug}`,
        lastmod: vehicle.createdAt,
        changefreq: 'weekly' as const,
        priority: 0.8 as const,
      }))

      return [...staticRoutes, ...vehicleRoutes]
    },
  },

  robots: {
    allow: '/',
    sitemap: '/sitemap.xml',
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://vantagemotors.example',
    },
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})
