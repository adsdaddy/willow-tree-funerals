import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep node_modules in separate vendor chunks
          if (id.includes("node_modules")) {
            if (id.includes("lucide-react")) return "lucide";
            if (
              id.includes("@radix-ui") ||
              id.includes("@floating-ui") ||
              id.includes("cmdk") ||
              id.includes("vaul")
            ) return "radix-ui";
            if (
              id.includes("@trpc") ||
              id.includes("@tanstack")
            ) return "trpc-vendor";
            if (id.includes("react-dom") || id.includes("/react/")) return "react-vendor";
          }
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
