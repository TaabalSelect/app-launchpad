// Configuración Vite **independiente** que se usa SOLO para construir el
// bundle estático que se publica en GitHub Pages.
//
// La configuración por defecto del proyecto (vite.config.ts) usa el preset
// de Lovable, que empaqueta SSR para Cloudflare. GitHub Pages solo sirve
// archivos estáticos, así que aquí construimos un SPA cliente puro.
//
// Uso:
//   VITE_BASE_PATH="/<nombre-del-repo>/" vite build --config vite.pages.config.ts
//
// El workflow .github/workflows/deploy.yml ya hace esto automáticamente.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      // Después de construir, copia index.html a 404.html para que el SPA
      // fallback de GitHub Pages funcione en deep links y refresh.
      name: "spa-fallback-404",
      closeBundle() {
        const indexPath = resolve(__dirname, "dist/index.html");
        const notFoundPath = resolve(__dirname, "dist/404.html");
        if (existsSync(indexPath)) {
          copyFileSync(indexPath, notFoundPath);
        }
      },
    },
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
