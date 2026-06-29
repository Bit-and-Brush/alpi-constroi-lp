// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
  site: "https://alpiconstroi.com",

  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
    routing: { prefixDefaultLocale: false },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Poppins",
      cssVariable: "--font-primary",
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },

  integrations: [sitemap()],
});
