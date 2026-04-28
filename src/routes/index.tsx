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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section className="mb-10 text-center sm:mb-14">
          <p
            className="mb-3 inline-block bg-clip-text text-xs font-semibold uppercase tracking-[0.2em] text-transparent"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Dashboard interno
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Aplicaciones Internas
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Selecciona la herramienta a la que deseas acceder. Cada aplicación se abrirá en una
            nueva pestaña.
          </p>
        </section>

        <section
          aria-label="Aplicaciones disponibles"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
        >
          <AppTile
            title="Cotizador TC"
            description="Acceso directo al sistema de cotizaciones."
            href="https://taabalcotizador.lovable.app/"
            icon={Calculator}
          />
          <AppTile
            title="Gestión de Facturas Taabal Group"
            description="Acceso al sistema de facturación interna."
            href="https://taabalcotizador.lovable.app/"
            icon={FileText}
          />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
