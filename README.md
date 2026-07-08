# Alpi Constroi Landing Page

A static landing page for Alpi Constroi built with [Astro](https://astro.build). Features a responsive design with multiple sections including hero, about, services, differentiators, and a contact form.

## Features

- **Static Site Generation** — Built with Astro for optimal performance
- **Contact Form** — Integrates with [Resend](https://resend.com) for email delivery via a PHP endpoint
- **Responsive Design** — Mobile-first approach with Tailwind CSS
- **Multi-language Support** — Portuguese language picker included
- **SEO Optimized** — Includes sitemap generation and meta tags

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Available Commands

| Command         | Description                                      |
| :-------------- | :----------------------------------------------- |
| `pnpm dev`      | Starts local dev server at `localhost:4321`      |
| `pnpm build`    | Build production site to `./dist/`               |
| `pnpm preview`  | Preview build locally, before deploying          |
| `pnpm lint`     | Run Biome linter on `src/` directory             |
| `pnpm format`   | Format code with Biome                           |
| `pnpm check`    | Run Biome checks                                 |

## Project Structure

```text
src/
├── components/          # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── LanguagePicker.astro
│   └── sections/        # Page section components
│       ├── Hero.astro
│       ├── About.astro
│       ├── Services.astro
│       ├── Differentiators.astro
│       └── Contact.astro
├── layouts/
│   └── Layout.astro     # Main layout wrapper
├── pages/
│   └── index.astro      # Homepage
└── assets/              # Images and static files
```

## Deployment

For deployment instructions to cPanel, including contact form configuration with Resend, see [DEPLOY.md](./DEPLOY.md).

## Technologies

- [Astro](https://astro.build) — Static site builder
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Resend](https://resend.com) — Email delivery API
- [Biome](https://biomejs.dev) — Linter and formatter

## Requirements

- Node.js >= 22.12.0
- pnpm >= 11.9.0
