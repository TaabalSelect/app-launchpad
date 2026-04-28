import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { iconCatalog, iconNames, getIcon } from "@/data/iconCatalog";
import type { AppItem } from "@/data/apps";
import { toast } from "sonner";

export interface AppFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: AppItem | null;
  onSubmit: (data: Omit<AppItem, "id">) => void;
}

const empty: Omit<AppItem, "id"> = {
  title: "",
  description: "",
  href: "",
  iconName: "FileText",
  badge: "",
};

export function AppFormDialog({ open, onOpenChange, initial, onSubmit }: AppFormDialogProps) {
  const [form, setForm] = useState<Omit<AppItem, "id">>(empty);

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              title: initial.title,
              description: initial.description,
              href: initial.href,
              iconName: initial.iconName,
              badge: initial.badge ?? "",
            }
          : empty,
      );
    }
  }, [open, initial]);

  const PreviewIcon = getIcon(form.iconName);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const title = form.title.trim();
    const description = form.description.trim();
    const href = form.href.trim();
    const badge = form.badge?.trim() ?? "";

    if (!title || title.length > 60) {
      toast.error("El título es obligatorio (máx 60 caracteres).");
      return;
    }
    if (!description || description.length > 240) {
      toast.error("La descripción es obligatoria (máx 240 caracteres).");
      return;
    }
    try {
      const url = new URL(href);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("protocolo");
    } catch {
      toast.error("La URL debe comenzar con http:// o https://");
      return;
    }
    if (!iconCatalog[form.iconName]) {
      toast.error("Selecciona un icono válido.");
      return;
    }
    if (badge.length > 24) {
      toast.error("La etiqueta es demasiado larga (máx 24 caracteres).");
      return;
    }

    onSubmit({
      title,
      description,
      href,
      iconName: form.iconName,
      badge: badge || undefined,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? "Editar aplicación" : "Nueva aplicación"}</DialogTitle>
          <DialogDescription>
            Completa los datos de la tarjeta. Los cambios se guardan en este navegador.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={form.title}
              maxLength={60}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Cotizador TC"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={form.description}
              maxLength={240}
              rows={3}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Acceso directo al sistema de cotizaciones..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="href">URL *</Label>
            <Input
              id="href"
              type="url"
              value={form.href}
              onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
              placeholder="https://ejemplo.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="badge">Etiqueta (opcional)</Label>
              <Input
                id="badge"
                value={form.badge ?? ""}
                maxLength={24}
                onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                placeholder="Ventas"
              />
            </div>

            <div className="space-y-2">
              <Label>Icono *</Label>
              <Select
                value={form.iconName}
                onValueChange={(v) => setForm((f) => ({ ...f, iconName: v }))}
              >
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <PreviewIcon className="h-4 w-4" />
                      <span>{form.iconName}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {iconNames.map((name) => {
                    const Ic = iconCatalog[name];
                    return (
                      <SelectItem key={name} value={name}>
                        <div className="flex items-center gap-2">
                          <Ic className="h-4 w-4" />
                          <span>{name}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{initial ? "Guardar cambios" : "Crear aplicación"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
