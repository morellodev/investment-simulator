import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    createHtmlPlugin({
      inject: {
        data: {
          deployUrl: process.env.VERCEL_URL,
        },
      },
    }),
  ],
});
