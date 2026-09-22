export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto hidden border-t border-border/40 sm:block">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground lg:px-8">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="brand-gradient h-1.5 w-1.5 rounded-full"
          />
          <p>© {year} Taabal Cancún · Todos los derechos reservados</p>
        </div>
        <p className="uppercase">Portal de uso interno</p>
      </div>
    </footer>
  );
}
