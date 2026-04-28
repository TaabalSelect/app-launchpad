/**
 * Listado por defecto de aplicaciones internas del Portal Taabal.
 *
 * Estas son las tarjetas "de fábrica". El usuario puede agregar, editar
 * o eliminar tarjetas desde la propia interfaz (botón "Administrar").
 * Los cambios se guardan en el navegador (localStorage).
 *
 * Si quieres dejar tarjetas adicionales fijas en código, añádelas aquí
 * siguiendo el formato. El nombre del icono debe existir en
 * `src/data/iconCatalog.ts`.
 */

export interface AppItem {
  id: string;
  title: string;
  description: string;
  href: string;
  /** Nombre del icono dentro de `iconCatalog` (ver iconCatalog.ts). */
  iconName: string;
  badge?: string;
}

export const defaultApps: AppItem[] = [
  {
    id: "cotizador-tc",
    title: "Cotizador TC",
    description:
      "Acceso directo al sistema de cotizaciones. Genera, edita y comparte propuestas comerciales en segundos.",
    href: "https://taabalcotizador.lovable.app/",
    iconName: "Calculator",
    badge: "Ventas",
  },
  {
    id: "gestion-facturas",
    title: "Gestión de Facturas",
    description:
      "Sistema de facturación interna de Taabal Group. Control y seguimiento de toda la operación administrativa.",
    href: "https://taabalgf.lovable.app/",
    iconName: "FileText",
    badge: "Administración",
  },
];
