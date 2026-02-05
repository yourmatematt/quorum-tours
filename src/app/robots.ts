import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/operator', '/profile', '/api'],
      },
    ],
    sitemap: 'https://quorumtours.com/sitemap.xml',
  };
}
