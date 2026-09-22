import { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
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
import type { AppItem, ProjectItem } from "@/data/apps";
import { toast } from "sonner";

export interface AppFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: AppItem | null;
  onSubmit: (data: Omit<AppItem, "id">) => void;
  projects: ProjectItem[];
}

const empty: Omit<AppItem, "id"> = {
  title: "",
  description: "",
  href: "",
  iconName: "FileText",
  badge: "",
  iconImage: undefined,
  projectId: undefined,
};

const MAX_ICON_BYTES = 2 * 1024 * 1024;

async function prepareIcon(file: File): Promise<string> {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    throw new Error('format');
  }
  if (file.size > MAX_ICON_BYTES) throw new Error('size');

  const source = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('read'));
    reader.readAsDataURL(file);
  });
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image'));
    img.src = source;
  });
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('canvas');
  const side = Math.min(image.naturalWidth, image.naturalHeight);
  const sx = (image.naturalWidth - side) / 2;
  const sy = (image.naturalHeight - side) / 2;
  context.drawImage(image, sx, sy, side, side, 0, 0, 256, 256);
  return canvas.toDataURL('image/webp', 0.86);
}

export function AppFormDialog({ open, onOpenChange, initial, onSubmit, projects }: AppFormDialogProps) {
  const [form, setForm] = useState<Omit<AppItem, "id">>(empty);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              title: initial.title,
              description: initial.description,
              href: initial.href,
              iconName: initial.iconName,
              iconImage: initial.iconImage,
              projectId: initial.projectId,
              badge: initial.badge ?? "",
            }
          : empty,
      );
    }
  }, [open, initial]);

  const PreviewIcon = getIcon(form.iconName);

  async function handleIconFile(file?: File) {
    if (!file) return;
    try {
      const iconImage = await prepareIcon(file);
      setForm((current) => ({ ...current, iconImage }));
    } catch (error) {
      toast.error(error instanceof Error && error.message === 'size'
        ? 'La imagen debe pesar menos de 2 MB.'
        : 'Usa una imagen PNG, JPG o WebP válida.');
    }
  }

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
      iconImage: form.iconImage,
      projectId: form.projectId,
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          <div className="space-y-2">
            <Label>Empresa o proyecto</Label>
            <Select
              value={form.projectId ?? "none"}
              onValueChange={(value) => setForm((current) => ({
                ...current,
                projectId: value === "none" ? undefined : value,
              }))}
            >
              <SelectTrigger><SelectValue placeholder="Sin asignar" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin asignar</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {projects.length === 0 ? <p className="text-xs text-muted-foreground">Crea una pestaña desde Administrar para poder asignarla.</p> : null}
          </div>

          <div className="space-y-2">
            <Label>Icono personalizado (opcional)</Label>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
              <div className="app-icon-preview grid h-16 w-16 shrink-0 place-items-center overflow-hidden">
                {form.iconImage ? (
                  <img src={form.iconImage} alt="Vista previa del icono" className="h-full w-full object-cover" />
                ) : (
                  <PreviewIcon className="h-7 w-7 text-primary-foreground" />
                )}
              </div>
              <div className="flex min-w-0 flex-wrap gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  onChange={(event) => void handleIconFile(event.target.files?.[0])}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  {form.iconImage ? <Upload /> : <ImagePlus />}
                  {form.iconImage ? 'Reemplazar' : 'Subir imagen'}
                </Button>
                {form.iconImage ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setForm((current) => ({ ...current, iconImage: undefined }));
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <Trash2 />
                    Quitar
                  </Button>
                ) : null}
                <p className="w-full text-xs text-muted-foreground">PNG, JPG o WebP · máximo 2 MB</p>
              </div>
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
