# Dashboard Interno — Lanzador de Aplicaciones Taabal

Página de inicio interna, limpia y responsive, con el logo de Taabal Cancún en la cabecera y dos tarjetas grandes que abren las aplicaciones internas en una pestaña nueva. Todo el texto en español.

## Diseño visual

**Paleta basada en el logo (gradiente azul → morado → rosa)**
- Fondo: blanco hueso / slate muy claro.
- Cabecera: blanca con borde inferior sutil.
- Tarjetas: blancas, esquinas redondeadas, sombra suave, borde 1px gris claro.
- Acento principal: azul corporativo (tomado del extremo izquierdo del logo).
- Acento secundario: detalle con gradiente azul→morado→rosa en bordes superiores de tarjeta y en hover de los botones, recogiendo la identidad del logo.
- Tipografía: sans-serif del sistema, jerarquía clara, espaciado generoso.

**Estructura de la página**
- **Cabecera fija**: logo de Taabal a la izquierda (altura ~40–48px), título "Portal Interno" a la derecha en pantallas grandes.
- **Hero corto**: título "Aplicaciones Internas" y subtítulo "Selecciona la herramienta a la que deseas acceder".
- **Grid de tarjetas**: 2 columnas en escritorio (≥ md), 1 columna en móvil.
- **Pie de página**: "© Taabal Cancún" + año dinámico.

**Tarjeta 1 — Cotizador TC**
- Icono de calculadora/cotización.
- Título: "Cotizador TC".
- Descripción: "Acceso directo al sistema de cotizaciones".
- Botón "Abrir aplicación" → https://taabalcotizador.lovable.app/
- `target="_blank"` y `rel="noopener noreferrer"`.
- Tarjeta completa también clickeable.

**Tarjeta 2 — Gestión de Facturas Taabal Group**
- Icono de documento/factura.
- Título: "Gestión de Facturas Taabal Group".
- Descripción: "Acceso al sistema de facturación interna".
- Botón "Abrir aplicación" → https://taabalcotizador.lovable.app/ (misma URL que diste; avísame cuando tengas la real y la cambio).

**Interacciones**
- Hover en tarjeta: ligero levantamiento, sombra más marcada, borde superior con gradiente del logo.
- Foco accesible visible (outline azul) en botones y tarjetas.
- Totalmente responsive: probado mentalmente para 360px, 768px y 1280px.

## Logo

- Copio `user-uploads://WhatsApp_Image_2025-10-26_at_12.11.22_AM.jpeg` a `src/assets/logo-taabal.jpg`.
- Lo importo como módulo ES6 en el componente de cabecera (`import logo from "@/assets/logo-taabal.jpg"`).
- `alt="Taabal Cancún"` para accesibilidad.

## Notas técnicas

- Stack del proyecto: **TanStack Start (React + Vite)**. La página de inicio vive en `src/routes/index.tsx`, no en un `index.html` suelto.
- Tailwind v4 ya está configurado; ajustaré los tokens de acento en `src/styles.css` al azul del logo.
- Sin dependencias nuevas, sin backend, sin base de datos.

### Despliegue en GitHub Pages

Como la fuente no es un único `index.html`, el flujo es:

1. Añadir `base: "/<nombre-del-repo>/"` en `vite.config.ts` (constante claramente marcada para que la edites una vez).
2. Configurar `bun run build` para producir un `dist/` 100% estático (cliente, sin SSR).
3. Generar `404.html` como copia de `index.html` en el build, para que las rutas profundas funcionen en Pages (fallback SPA).
4. Conectar el proyecto a GitHub desde Lovable (Connectors → GitHub).
5. Añadir un workflow `.github/workflows/deploy.yml` que en cada push a `main` haga build y publique a GitHub Pages automáticamente.
6. Activar GitHub Pages en el repo (Settings → Pages → Source: GitHub Actions).

Resultado: `https://<usuario>.github.io/<repo>/` funcionando.

> Nota: publicar con el botón de Lovable es más simple y no requiere nada de lo anterior, pero mantengo la ruta de GitHub Pages que pediste.

## Archivos a crear / modificar

- `src/assets/logo-taabal.jpg` — logo copiado desde el upload.
- `src/routes/index.tsx` — reemplazar placeholder por el dashboard.
- `src/components/SiteHeader.tsx` — cabecera con logo.
- `src/components/AppTile.tsx` — tarjeta reutilizable para las dos apps.
- `src/components/SiteFooter.tsx` — pie minimalista.
- `src/styles.css` — ajustar tokens de acento al azul del logo.
- `vite.config.ts` — añadir `base` para GitHub Pages.
- `.github/workflows/deploy.yml` — workflow de build y deploy a Pages.

## Fuera de alcance (por ahora)

- Autenticación / control de acceso (la página será pública una vez desplegada).
- Analítica, búsqueda, favoritos o estado por usuario.
- Cambiar el enlace de "Gestión de Facturas" — apunta a la misma URL que diste; mándame la URL real y la actualizo.
