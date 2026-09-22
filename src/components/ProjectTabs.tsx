import { useEffect, useState } from "react";
import { FolderPlus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProjectItem } from "@/data/apps";

interface ProjectTabsProps {
  projects: ProjectItem[];
  activeProjectId: string;
  manageMode: boolean;
  onSelect: (id: string) => void;
  onCreate: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function ProjectTabs({ projects, activeProjectId, manageMode, onSelect, onCreate, onRename, onDelete }: ProjectTabsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectItem | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (dialogOpen) setName(editing?.name ?? "");
  }, [dialogOpen, editing]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    if (editing) onRename(editing.id, cleanName);
    else onCreate(cleanName);
    setDialogOpen(false);
  }

  return (
    <>
      <div className="project-tabs-scroll -mx-3 mb-8 overflow-x-auto px-3 pb-1 sm:mx-0 sm:mb-12 sm:px-0">
        <div className="mx-auto flex w-max min-w-full items-center justify-start gap-2 sm:justify-center">
          <Button type="button" size="sm" variant={activeProjectId === "all" ? "default" : "outline"} onClick={() => onSelect("all")} className="shrink-0 rounded-full px-4">
            Todas
          </Button>
          {projects.map((project) => (
            <div key={project.id} className="flex shrink-0 items-center rounded-full border border-border bg-background/70 p-0.5 backdrop-blur">
              <Button type="button" size="sm" variant={activeProjectId === project.id ? "default" : "ghost"} onClick={() => onSelect(project.id)} className="rounded-full px-4">
                {project.name}
              </Button>
              {manageMode ? (
                <div className="flex pr-1">
                  <Button type="button" size="icon" variant="ghost" onClick={() => { setEditing(project); setDialogOpen(true); }} aria-label={`Renombrar ${project.name}`} title={`Renombrar ${project.name}`} className="h-7 w-7 rounded-full"><Pencil /></Button>
                  <Button type="button" size="icon" variant="ghost" onClick={() => onDelete(project.id)} aria-label={`Eliminar ${project.name}`} title={`Eliminar ${project.name}`} className="h-7 w-7 rounded-full text-destructive hover:bg-destructive/15 hover:text-destructive"><Trash2 /></Button>
                </div>
              ) : null}
            </div>
          ))}
          {manageMode ? (
            <Button type="button" size="sm" variant="outline" onClick={() => { setEditing(null); setDialogOpen(true); }} className="shrink-0 rounded-full px-4"><FolderPlus />Nueva pestaña</Button>
          ) : null}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editing ? "Renombrar pestaña" : "Nueva pestaña"}</DialogTitle>
            <DialogDescription>Usa el nombre de una empresa o proyecto.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Nombre</Label>
              <Input id="project-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={40} placeholder="Empresa 1" autoFocus required />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button type="submit">{editing ? "Guardar" : "Crear pestaña"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}