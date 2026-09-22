import { useCallback, useEffect, useState } from "react";
import { defaultApps, type AppItem, type ProjectItem } from "@/data/apps";

const STORAGE_KEY = "taabal:apps:v1";
const PROJECTS_STORAGE_KEY = "taabal:projects:v1";

function loadFromStorage(): AppItem[] {
  if (typeof window === "undefined") return defaultApps;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultApps;
    const parsed = JSON.parse(raw) as AppItem[];
    if (!Array.isArray(parsed)) return defaultApps;
    return parsed;
  } catch {
    return defaultApps;
  }
}

function saveToStorage(apps: AppItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch {
    // ignore quota errors
  }
}

function loadProjects(): ProjectItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ProjectItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useApps() {
  // SSR-safe: arranca con defaults y rehidrata en el cliente.
  const [apps, setApps] = useState<AppItem[]>(defaultApps);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setApps(loadFromStorage());
    setProjects(loadProjects());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(apps);
  }, [apps, hydrated]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // ignore quota errors
    }
  }, [projects, hydrated]);

  const addApp = useCallback((data: Omit<AppItem, "id">) => {
    setApps((prev) => [
      ...prev,
      { ...data, id: `app-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
    ]);
  }, []);

  const updateApp = useCallback((id: string, data: Omit<AppItem, "id">) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...data, id } : a)));
  }, []);

  const removeApp = useCallback((id: string) => {
    setApps((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const resetApps = useCallback(() => {
    setApps(defaultApps);
    setProjects([]);
  }, []);

  const addProject = useCallback((name: string) => {
    const id = `project-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setProjects((prev) => [...prev, { id, name }]);
    return id;
  }, []);

  const renameProject = useCallback((id: string, name: string) => {
    setProjects((prev) => prev.map((project) => (project.id === id ? { ...project, name } : project)));
  }, []);

  const removeProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    setApps((prev) => prev.map((app) => (app.projectId === id ? { ...app, projectId: undefined } : app)));
  }, []);

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
