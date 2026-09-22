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

      <main className="relative mx-auto w-full max-w-7xl flex-1 px-3 pb-10 pt-5 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <h1 className="sr-only">Aplicaciones internas Taabal Cancún</h1>

        {/* Toolbar */}
        <div className="mb-7 flex min-h-8 flex-wrap items-center justify-end gap-2 sm:mb-12">
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
          className="launcher-grid mx-auto grid w-full grid-cols-3 gap-x-3 gap-y-7 min-[360px]:grid-cols-4 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-12 md:grid-cols-5 lg:grid-cols-6"
        >
          {apps.map((app, i) => (
            <AppTile
              key={app.id}
              index={i}
              title={app.title}
              description={app.description}
              href={app.href}
              iconName={app.iconName}
              iconImage={app.iconImage}
              badge={app.badge}
              manageMode={manageMode}
              onEdit={() => openEdit(app)}
              onDelete={() => setConfirmDelete(app)}
            />
          ))}

          {manageMode ? (
            <Button
              type="button"
              variant="ghost"
              onClick={openCreate}
              className="group h-auto min-w-0 flex-col items-center justify-start gap-0 bg-transparent p-0 text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground"
            >
              <div className="add-app-icon grid place-items-center border-2 border-dashed border-border bg-card/50 transition-all group-hover:border-primary/70 group-hover:bg-card">
                <Plus className="h-7 w-7 sm:h-10 sm:w-10" strokeWidth={1.5} />
              </div>
              <span className="app-name mt-2.5 line-clamp-2 font-medium sm:mt-4">Añadir aplicación</span>
            </Button>
          ) : null}
        </section>

        {apps.length === 0 && !manageMode ? (
          <div className="mt-12 text-center text-sm text-muted-foreground">
            No hay aplicaciones todavía.{" "}
            <Button type="button" variant="link" onClick={() => setManageMode(true)}>
              Activar modo administración
            </Button>
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
