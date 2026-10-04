// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';
import remarkPreserveIndent from './src/lib/remark-preserve-indent.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://openstreetmap-japan.github.io',
  integrations: [react()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkBreaks, remarkPreserveIndent],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['maplibre-gl'],
    },
    server: {
      watch: {
        usePolling: true,
        interval: 500,
      },
    },
  },
});
