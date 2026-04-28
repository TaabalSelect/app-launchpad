# Portal Interno — Taabal Cancún

Dashboard interno con accesos a las aplicaciones de Taabal (Cotizador TC, Gestión de Facturas, etc.).

Construido con **TanStack Start + React 19 + Tailwind v4** en [Lovable](https://lovable.dev).

---

## ➕ Cómo agregar una nueva tarjeta (app)

Toda la lista de aplicaciones vive en un único archivo:

📄 `src/data/apps.ts`

Para añadir una nueva tarjeta:

1. Abre `src/data/apps.ts`.
2. Si necesitas un icono nuevo, añádelo al `import` de `lucide-react`
   (catálogo: <https://lucide.dev/icons>).
3. Añade un nuevo objeto al array `apps`:

   ```ts
   {
     id: "nombre-unico",
     title: "Nombre de la app",
     description: "Descripción corta de la herramienta.",
     href: "https://url-de-la-app.com",
     icon: MiIcono,
     badge: "Categoría", // opcional
   }
   ```

4. Guarda. La tarjeta aparecerá automáticamente en el dashboard.

No hay que tocar componentes, JSX ni estilos.

---

## 🚀 Despliegue en GitHub Pages

El proyecto está configurado para desplegarse **automáticamente** en GitHub Pages
en cada push a la rama `main`.

### Configuración inicial (una sola vez)

1. **Conectar Lovable ↔ GitHub**
   En el editor de Lovable: **Connectors → GitHub → Connect project**, autoriza
   la GitHub App de Lovable y crea el repositorio.

2. **Activar GitHub Pages**
   En GitHub: **Settings → Pages → Source: GitHub Actions**.
   No hace falta elegir branch ni carpeta — el workflow se encarga.

3. **(Si renombras el repo)**
   El workflow detecta el nombre del repo automáticamente y configura el
   `base` correcto. No tienes que tocar nada.

### Cómo funciona

- En cada push a `main`, el workflow `.github/workflows/deploy.yml`:
  1. Instala dependencias con Bun.
  2. Detecta el nombre del repositorio para fijar `VITE_BASE_PATH`.
  3. Construye un bundle SPA estático con `vite.pages.config.ts`.
  4. Genera `404.html` (copia de `index.html`) para soportar deep links.
  5. Publica `dist/` en GitHub Pages.

- URL final: `https://<usuario>.github.io/<nombre-del-repo>/`

### Build local del bundle de Pages (opcional)

```bash
bun install
VITE_BASE_PATH="/nombre-del-repo/" bunx vite build --config vite.pages.config.ts
# resultado en ./dist
```

---

## 🛠️ Desarrollo en Lovable

Mientras tanto, **Lovable sigue funcionando con su flujo normal** (preview,
publicación a `.lovable.app`, etc.). El setup de GitHub Pages es paralelo:

- `vite.config.ts` → usado por Lovable y `bun run dev` (TanStack Start + SSR).
- `vite.pages.config.ts` → usado SOLO por el workflow de GitHub Pages (SPA estático).

Ambos consumen el mismo código fuente (`src/`), así que cualquier cambio se
refleja en los dos destinos.

---

## 📦 Stack

- TanStack Start v1 (router file-based)
- React 19
- Vite 7
- Tailwind CSS v4
- shadcn/ui + lucide-react
