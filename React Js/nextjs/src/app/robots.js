export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-panel/','/control-panel/'],
    },
    sitemap: 'https://acme.com/sitemap.xml',
  }
}