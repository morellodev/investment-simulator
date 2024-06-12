import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import path from "node:path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
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
