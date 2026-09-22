import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultApps, type AppItem, type ProjectItem } from "@/data/apps";

type AppRow = {
  id: string;
  title: string;
  description: string | null;
  href: string;
  icon_name: string;
  icon_image: string | null;
  badge: string | null;
  project_id: string | null;
  position: number;
};

type ProjectRow = { id: string; name: string; position: number };

function toApp(row: AppRow): AppItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    href: row.href,
    iconName: row.icon_name,
    iconImage: row.icon_image ?? undefined,
    badge: row.badge ?? undefined,
    projectId: row.project_id ?? undefined,
  };
}

function toRow(data: Omit<AppItem, "id">) {
  return {
    title: data.title,
    description: data.description ?? "",
    href: data.href,
    icon_name: data.iconName,
    icon_image: data.iconImage ?? null,
    badge: data.badge ?? null,
    project_id: data.projectId ?? null,
  };
}

/**
 * Datos compartidos del portal: todo se guarda en la nube, así los cambios
 * que hace una persona se ven en todos los dispositivos.
 */
export function useApps() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(async () => {
    const [appsRes, projectsRes] = await Promise.all([
      supabase.from("apps").select("*").order("position").order("created_at"),
      supabase.from("projects").select("*").order("position").order("created_at"),
    ]);
    if (!appsRes.error && appsRes.data) setApps((appsRes.data as AppRow[]).map(toApp));
    if (!projectsRes.error && projectsRes.data) {
      setProjects((projectsRes.data as ProjectRow[]).map((p) => ({ id: p.id, name: p.name })));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    void refresh();

    const channel = supabase
      .channel("portal-apps")
      .on("postgres_changes", { event: "*", schema: "public", table: "apps" }, () => {
        void refresh();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "projects" }, () => {
        void refresh();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [refresh]);

  const addApp = useCallback(
    async (data: Omit<AppItem, "id">) => {
      await supabase.from("apps").insert({ ...toRow(data), position: Date.now() % 2147483647 });
      await refresh();
    },
    [refresh],
  );

  const updateApp = useCallback(
    async (id: string, data: Omit<AppItem, "id">) => {
      await supabase.from("apps").update(toRow(data)).eq("id", id);
      await refresh();
    },
    [refresh],
  );

  const removeApp = useCallback(
    async (id: string) => {
      await supabase.from("apps").delete().eq("id", id);
      await refresh();
    },
    [refresh],
  );

  const resetApps = useCallback(async () => {
    await supabase.from("apps").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("apps").insert(
      defaultApps.map((app, index) => ({ ...toRow(app), position: index })),
    );
    await refresh();
  }, [refresh]);

  const addProject = useCallback(
    async (name: string) => {
      const { data } = await supabase
        .from("projects")
        .insert({ name, position: Date.now() % 2147483647 })
        .select("id")
        .single();
      await refresh();
      return data?.id ?? "";
    },
    [refresh],
  );

  const renameProject = useCallback(
    async (id: string, name: string) => {
      await supabase.from("projects").update({ name }).eq("id", id);
      await refresh();
    },
    [refresh],
  );

  const removeProject = useCallback(
    async (id: string) => {
      await supabase.from("projects").delete().eq("id", id);
      await refresh();
    },
    [refresh],
  );

  return {
    apps,
    projects,
    hydrated,
    addApp,
    updateApp,
    removeApp,
    resetApps,
    addProject,
    renameProject,
    removeProject,
  };
}
