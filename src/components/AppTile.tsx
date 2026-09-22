import { Pencil, Trash2 } from "lucide-react";
import { getIcon } from "@/data/iconCatalog";
import { Button } from "@/components/ui/button";

interface AppTileProps {
  title: string;
  description: string;
  href: string;
  iconName: string;
  iconImage?: string;
  badge?: string;
  index?: number;
  manageMode?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AppTile({
  title,
  description,
  href,
  iconName,
  iconImage,
  badge,
  index = 0,
  manageMode = false,
  onEdit,
  onDelete,
}: AppTileProps) {
  const Icon = getIcon(iconName);
  return (
    <div
      className="app-launcher-item group relative flex min-w-0 flex-col items-center"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={manageMode}
        onClick={(e) => {
          if (manageMode) e.preventDefault();
        }}
        tabIndex={manageMode ? -1 : 0}
        aria-label={`Abrir ${title}`}
        className="flex w-full min-w-0 flex-col items-center outline-none"
      >
        <div className="app-icon-shell relative grid place-items-center overflow-hidden">
          {iconImage ? (
            <img src={iconImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="app-icon-gradient grid h-full w-full place-items-center text-primary-foreground">
              <Icon className="app-icon-glyph" strokeWidth={1.65} aria-hidden="true" />
            </div>
          )}
          <span aria-hidden="true" className="app-icon-shine" />
        </div>

        <div className="mt-2.5 w-full min-w-0 text-center sm:mt-4">
          <h2 className="app-name mx-auto line-clamp-2 font-medium text-foreground">{title}</h2>
          {badge ? (
            <p className="mt-1 hidden truncate text-[11px] uppercase text-muted-foreground sm:block">
              {badge}
            </p>
          ) : null}
          <p className="sr-only">{description}</p>
        </div>
      </a>

      {manageMode ? (
        <div className="absolute -right-1 -top-2 z-10 flex gap-1 sm:right-0 sm:top-0">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={onEdit}
            aria-label={`Editar ${title}`}
            title={`Editar ${title}`}
            className="h-7 w-7 rounded-full border border-border shadow-lg sm:h-8 sm:w-8"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onDelete}
            aria-label={`Eliminar ${title}`}
            title={`Eliminar ${title}`}
            className="h-7 w-7 rounded-full shadow-lg sm:h-8 sm:w-8"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

