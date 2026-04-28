import logoTaabal from "@/assets/logo-taabal.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass border-b border-border/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl opacity-40 blur-md"
                style={{ background: "var(--gradient-brand)" }}
              />
              <img
                src={logoTaabal}
                alt="Taabal Cancún"
                className="relative h-9 w-auto object-contain"
                decoding="async"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Taabal Cancún
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Portal Interno
              </span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
