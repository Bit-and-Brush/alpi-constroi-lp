// @ts-check

import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
  site: "https://alpiconstroi.com",
  adapter: node({ mode: "middleware" }),
  env: {
    // optional: true para o endpoint poder tratar a ausência de forma graciosa.
    // Sem isto, o astro:env valida os segredos de forma eager no load do módulo
    // e lança AstroError se faltarem (ex.: esquecidos no Setup Node.js App).
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      CONTACT_TO: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      CONTACT_FROM: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
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
