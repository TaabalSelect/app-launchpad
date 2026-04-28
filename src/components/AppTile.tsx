import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface AppTileProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function AppTile({ title, description, href, icon: Icon }: AppTileProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 text-card-foreground outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-8"
      style={{ boxShadow: "var(--shadow-card)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      }}
    >
      {/* Borde superior con gradiente del logo */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 opacity-80 transition-opacity group-hover:opacity-100"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-sm sm:h-14 sm:w-14"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
        </div>
        <ArrowUpRight
          className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>

        <div className="mt-8 flex items-center gap-2 pt-2">
          <span
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-[1.02] sm:text-base"
            style={{ background: "var(--gradient-brand)" }}
          >
            Abrir aplicación
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}
