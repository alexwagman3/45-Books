import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sentry from '@sentry/astro';

export default defineConfig({
  output: 'static',
  site: 'https://45booksummaries.com',
  integrations: [
    mdx(),
    sentry({
      dsn: process.env.PUBLIC_SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: 'javascript',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
});
