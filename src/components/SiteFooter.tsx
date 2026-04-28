export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-background/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>© {year} Taabal Cancún. Todos los derechos reservados.</p>
        <p>Portal de uso interno</p>
      </div>
    </footer>
  );
}
