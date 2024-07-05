import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), UnoCSS()],
});
