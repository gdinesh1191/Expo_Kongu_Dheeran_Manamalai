import { Profile } from "@/constants/SampleProfile";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type DownloadsContextValue = {
  downloads: Profile[];
  isDownloaded: (id: string) => boolean;
  addDownload: (profile: Profile) => void;
  removeDownload: (id: string) => void;
};

const DownloadsContext = createContext<DownloadsContextValue | null>(null);

export function DownloadsProvider({ children }: { children: React.ReactNode }) {
  const [downloads, setDownloads] = useState<Profile[]>([]);

  const isDownloaded = useCallback(
    (id: string) => downloads.some((p) => p.id === id),
    [downloads],
  );

  const addDownload = useCallback((profile: Profile) => {
    setDownloads((list) =>
      list.some((p) => p.id === profile.id) ? list : [profile, ...list],
    );
  }, []);

  const removeDownload = useCallback((id: string) => {
    setDownloads((list) => list.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({ downloads, isDownloaded, addDownload, removeDownload }),
    [downloads, isDownloaded, addDownload, removeDownload],
  );

  return <DownloadsContext.Provider value={value}>{children}</DownloadsContext.Provider>;
}

export function useDownloads() {
  const ctx = useContext(DownloadsContext);
  if (!ctx) throw new Error("useDownloads must be used inside DownloadsProvider");
  return ctx;
}
