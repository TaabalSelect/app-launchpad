import {
  Calculator,
  FileText,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  ChartLine,
  ClipboardList,
  Cloud,
  Code,
  CreditCard,
  Database,
  DollarSign,
  Folder,
  Globe,
  Headphones,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  PieChart,
  Receipt,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Catálogo de iconos disponibles para asignar a las tarjetas.
 * Para añadir más iconos: impórtalos arriba desde "lucide-react"
 * (catálogo completo: https://lucide.dev/icons) y agrégalos al objeto.
 */
export const iconCatalog: Record<string, LucideIcon> = {
  Calculator,
  FileText,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  ChartLine,
  ClipboardList,
  Cloud,
  Code,
  CreditCard,
  Database,
  DollarSign,
  Folder,
  Globe,
  Headphones,
  ImageIcon,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  PieChart,
  Receipt,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
  Wrench,
  Zap,
};

export const iconNames = Object.keys(iconCatalog);

export function getIcon(name: string | undefined): LucideIcon {
  if (!name) return FileText;
  return iconCatalog[name] ?? FileText;
}
