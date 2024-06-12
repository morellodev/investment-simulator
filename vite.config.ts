import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import sitemap from "vite-plugin-sitemap";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    createHtmlPlugin({
      inject: {
        data: {
          deployUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL,
        },
      },
    }),
    sitemap({
      hostname: "https://money.morello.dev",
    }),
  ],
});
