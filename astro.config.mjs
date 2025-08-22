// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [react(), icon()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
