import { useCallback, useEffect, useState } from "react";
import { defaultApps, type AppItem } from "@/data/apps";

const STORAGE_KEY = "taabal:apps:v1";

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

export function useApps() {
  // SSR-safe: arranca con defaults y rehidrata en el cliente.
  const [apps, setApps] = useState<AppItem[]>(defaultApps);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setApps(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(apps);
  }, [apps, hydrated]);

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
  }, []);

  return { apps, hydrated, addApp, updateApp, removeApp, resetApps };
}
