import logoTaabal from "@/assets/logo-taabal.png";

export function SiteHeader() {
  return (
    <header className="relative z-40 w-full sm:sticky sm:top-0">
      <div className="desktop-bar border-b border-border/50">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:h-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <span
                aria-hidden="true"
              className="brand-glow absolute inset-0 rounded-xl opacity-40 blur-md"
                style={{ background: "var(--gradient-brand)" }}
              />
              <img
                src={logoTaabal}
                alt="Taabal Cancún"
                className="relative h-10 w-auto object-contain sm:h-8"
                decoding="async"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-foreground">
                Taabal Cancún
              </span>
              <span className="text-[10px] uppercase text-muted-foreground">
                Portal Interno
              </span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
