import logoTaabal from "@/assets/logo-taabal.jpg";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src={logoTaabal}
            alt="Taabal Cancún"
            className="h-9 w-auto sm:h-10"
            decoding="async"
          />
          <span className="sr-only">Taabal Cancún</span>
        </div>
        <span className="hidden text-sm font-medium tracking-wide text-muted-foreground sm:inline">
          Portal Interno
        </span>
      </div>
      <div
        aria-hidden="true"
        className="h-[2px] w-full"
        style={{ background: "var(--gradient-brand)" }}
      />
    </header>
  );
}
