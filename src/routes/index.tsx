import { createFileRoute } from "@tanstack/react-router";
import { Calculator, FileText } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AppTile } from "@/components/AppTile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal Interno — Taabal Cancún" },
      {
        name: "description",
        content:
          "Lanzador de aplicaciones internas de Taabal Cancún: Cotizador TC y Gestión de Facturas.",
      },
      { property: "og:title", content: "Portal Interno — Taabal Cancún" },
      {
        property: "og:description",
        content: "Acceso rápido a las herramientas internas de Taabal Cancún.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="relative flex min-h-screen flex-col text-foreground">
      {/* Capa de cuadrícula sutil */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 grid-bg" />

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h1 className="sr-only">Aplicaciones internas Taabal Cancún</h1>

        <section
          aria-label="Aplicaciones disponibles"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        >
          <AppTile
            index={0}
            title="Cotizador TC"
            description="Acceso directo al sistema de cotizaciones. Genera, edita y comparte propuestas comerciales en segundos."
            href="https://taabalcotizador.lovable.app/"
            icon={Calculator}
            badge="Ventas"
          />
          <AppTile
            index={1}
            title="Gestión de Facturas"
            description="Sistema de facturación interna de Taabal Group. Control y seguimiento de toda la operación administrativa."
            href="https://taabalcotizador.lovable.app/"
            icon={FileText}
            badge="Administración"
          />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
