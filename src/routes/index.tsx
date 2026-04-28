import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Settings2, RotateCcw, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AppTile } from "@/components/AppTile";
import { AppFormDialog } from "@/components/AppFormDialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApps } from "@/hooks/useApps";
import type { AppItem } from "@/data/apps";
import { toast } from "sonner";

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
  const { apps, addApp, updateApp, removeApp, resetApps } = useApps();
  const [manageMode, setManageMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AppItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AppItem | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(app: AppItem) {
    setEditing(app);
    setDialogOpen(true);
  }

  function handleSubmit(data: Omit<AppItem, "id">) {
    if (editing) {
      updateApp(editing.id, data);
      toast.success("Aplicación actualizada.");
    } else {
      addApp(data);
      toast.success("Aplicación añadida.");
    }
  }

  function handleDelete() {
    if (!confirmDelete) return;
    removeApp(confirmDelete.id);
    toast.success(`"${confirmDelete.title}" eliminada.`);
    setConfirmDelete(null);
  }

  return (
    <div className="relative flex min-h-screen flex-col text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 grid-bg" />

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="sr-only">Aplicaciones internas Taabal Cancún</h1>

        {/* Toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-end gap-2 sm:mb-10">
          {manageMode ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmReset(true)}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Restablecer
              </Button>
              <Button size="sm" onClick={openCreate} className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva aplicación
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setManageMode(false)}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                Listo
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setManageMode(true)}
              className="gap-2"
            >
              <Settings2 className="h-4 w-4" />
              Administrar
            </Button>
          )}
        </div>

        <section
          aria-label="Aplicaciones disponibles"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        >
          {apps.map((app, i) => (
            <AppTile
              key={app.id}
              index={i}
              title={app.title}
              description={app.description}
              href={app.href}
              iconName={app.iconName}
              badge={app.badge}
              manageMode={manageMode}
              onEdit={() => openEdit(app)}
              onDelete={() => setConfirmDelete(app)}
            />
          ))}

          {manageMode ? (
            <button
              type="button"
              onClick={openCreate}
              className="group flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border/70 bg-card/30 p-6 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-card/50 hover:text-foreground"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 text-white transition-transform duration-300 group-hover:scale-110"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Plus className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <span className="text-base font-semibold">Añadir aplicación</span>
              <span className="text-xs uppercase tracking-[0.16em]">
                Crea una nueva tarjeta
              </span>
            </button>
          ) : null}
        </section>

        {apps.length === 0 && !manageMode ? (
          <div className="mt-12 text-center text-sm text-muted-foreground">
            No hay aplicaciones todavía.{" "}
            <button
              type="button"
              onClick={() => setManageMode(true)}
              className="text-foreground underline underline-offset-4"
            >
              Activar modo administración
            </button>
          </div>
        ) : null}
      </main>

      <SiteFooter />

      <AppFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={confirmDelete !== null}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta aplicación?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará la tarjeta &quot;{confirmDelete?.title}&quot;. Puedes restablecer las
              tarjetas por defecto en cualquier momento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restablecer tarjetas por defecto</AlertDialogTitle>
            <AlertDialogDescription>
              Se descartarán todos los cambios y se volverán a mostrar únicamente las
              aplicaciones originales.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetApps();
                toast.success("Aplicaciones restablecidas.");
              }}
            >
              Restablecer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
