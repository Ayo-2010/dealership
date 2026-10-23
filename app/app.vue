<script setup lang="ts">
import dealership from '~/config/dealership'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/$/, '')

useHead(() => ({
  titleTemplate: (title?: string) => (title ? `${title} · ${dealership.name}` : dealership.seo.defaultTitle),
  link: [{ rel: 'canonical', href: `${siteUrl}${route.path === '/' ? '' : route.path}` }],
  script: [
    {
      key: 'vantage-website-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: dealership.name,
        url: siteUrl,
        description: dealership.seo.defaultDescription,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/cars?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],
}))

useSeoMeta({
  description: dealership.seo.defaultDescription,
  ogType: 'website',
  ogSiteName: dealership.name,
  ogImage: `${siteUrl}${dealership.seo.ogImage}`,
  ogImageAlt: 'Illustrative automotive photography for Vantage Motors',
  twitterCard: 'summary_large_image',
  twitterTitle: dealership.seo.defaultTitle,
  twitterDescription: dealership.seo.defaultDescription,
  twitterImage: `${siteUrl}${dealership.seo.ogImage}`,
  robots: dealership.demoMode ? 'noindex, nofollow' : 'index, follow',
})
</script>

<template>
  <UApp>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <NuxtRouteAnnouncer />
    <AnnouncementBar />
    <AppHeader />
    <main id="main-content">
      <NuxtPage />
    </main>
    <AppFooter />
  </UApp>
</template>
