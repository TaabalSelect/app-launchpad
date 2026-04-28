import { ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { getIcon } from "@/data/iconCatalog";

interface AppTileProps {
  title: string;
  description: string;
  href: string;
  iconName: string;
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
  badge,
  index = 0,
  manageMode = false,
  onEdit,
  onDelete,
}: AppTileProps) {
  const Icon = getIcon(iconName);
  return (
    <div className="relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={manageMode}
        onClick={(e) => {
          if (manageMode) e.preventDefault();
        }}
        tabIndex={manageMode ? -1 : 0}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-xl outline-none transition-all duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-8"
        style={{
          boxShadow: "var(--shadow-card)",
          animation: `fadeUp 0.7s ${index * 0.1}s both ease-out`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-card)";
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--x, 50%) var(--y, 0%), color-mix(in oklab, var(--brand-blue) 18%, transparent), transparent 40%)",
          }}
        />

        <span
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-px opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "var(--gradient-brand)" }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-90"
              style={{ background: "var(--gradient-brand)" }}
            />
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 text-white shadow-inner"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Icon className="h-7 w-7" strokeWidth={1.75} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {badge ? (
              <span className="rounded-full border border-border/80 bg-background/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
                {badge}
              </span>
            ) : null}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/40 text-muted-foreground transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/10 group-hover:text-foreground">
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="relative mt-8 flex flex-1 flex-col">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {description}
          </p>

          <div className="mt-10 flex items-center gap-3 border-t border-border/60 pt-5">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground">
              {manageMode ? "Modo edición" : "Abrir aplicación"}
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 origin-left scale-x-50 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: "var(--gradient-brand)" }}
            />
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </a>

      {manageMode ? (
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Editar ${title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:border-primary/60 hover:bg-primary/10"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Eliminar ${title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-destructive/60 bg-background/90 text-destructive shadow-md backdrop-blur transition-colors hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

