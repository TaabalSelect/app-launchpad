export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--gradient-brand)" }}
          />
          <p>© {year} Taabal Cancún · Todos los derechos reservados</p>
        </div>
        <p className="uppercase tracking-[0.18em]">Portal de uso interno</p>
      </div>
    </footer>
  );
}
