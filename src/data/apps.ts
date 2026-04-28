import { Calculator, FileText, type LucideIcon } from "lucide-react";

export interface AppItem {
  /** Identificador único, útil para keys de React y analítica futura. */
  id: string;
  /** Título principal mostrado en la tarjeta. */
  title: string;
  /** Descripción corta debajo del título. */
  description: string;
  /** URL absoluta a la que apunta la tarjeta. Se abre en nueva pestaña. */
  href: string;
  /** Icono de lucide-react. Importa más iconos arriba si necesitas otros. */
  icon: LucideIcon;
  /** Etiqueta opcional que aparece arriba a la derecha (ej: "Ventas"). */
  badge?: string;
}

/**
 * Listado de aplicaciones internas del Portal Taabal.
 *
 * Para AGREGAR una nueva tarjeta:
 *   1. Importa el icono que quieras desde "lucide-react" arriba
 *      (ver catálogo: https://lucide.dev/icons).
 *   2. Añade un nuevo objeto al array `apps` siguiendo el formato existente.
 *   3. Guarda el archivo. La tarjeta aparecerá automáticamente en el dashboard.
 *
 * No hay que tocar ningún componente para añadir, quitar o reordenar tarjetas.
 */
export const apps: AppItem[] = [
  {
    id: "cotizador-tc",
    title: "Cotizador TC",
    description:
      "Acceso directo al sistema de cotizaciones. Genera, edita y comparte propuestas comerciales en segundos.",
    href: "https://taabalcotizador.lovable.app/",
    icon: Calculator,
    badge: "Ventas",
  },
  {
    id: "gestion-facturas",
    title: "Gestión de Facturas",
    description:
      "Sistema de facturación interna de Taabal Group. Control y seguimiento de toda la operación administrativa.",
    href: "https://taabalcotizador.lovable.app/",
    icon: FileText,
    badge: "Administración",
  },
];
