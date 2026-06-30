// @ts-check

import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
  site: "https://alpiconstroi.com",
  adapter: node({ mode: "standalone" }),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      CONTACT_TO: envField.string({ context: "server", access: "secret" }),
      CONTACT_FROM: envField.string({ context: "server", access: "secret" }),
    },
  },
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
