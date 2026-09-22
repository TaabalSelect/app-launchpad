CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Portal abierto: proyectos" ON public.projects FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  href TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'FileText',
  icon_image TEXT,
  badge TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.apps TO anon, authenticated;
GRANT ALL ON public.apps TO service_role;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Portal abierto: apps" ON public.apps FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.apps;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;

INSERT INTO public.apps (title, description, href, icon_name, badge, position) VALUES
('Cotizador TC', 'Acceso directo al sistema de cotizaciones. Genera, edita y comparte propuestas comerciales en segundos.', 'https://taabalcotizador.lovable.app/', 'Calculator', 'Ventas', 0),
('Gestión de Facturas', 'Sistema de facturación interna de Taabal Group. Control y seguimiento de toda la operación administrativa.', 'https://taabalgf.lovable.app/', 'FileText', 'Administración', 1);