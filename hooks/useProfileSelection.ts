import { Profile } from "@/constants/SampleProfile";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useProfileSelection(profiles: Profile[]) {
  const [selecting, setSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selected = useMemo(
    () => profiles.filter((p) => selectedIds.includes(p.id)),
    [profiles, selectedIds],
  );
  const allSelected = profiles.length > 0 && selected.length === profiles.length;

  const cancel = useCallback(() => {
    setSelecting(false);
    setSelectedIds([]);
  }, []);

  useEffect(() => {
    if (profiles.length === 0) cancel();
  }, [profiles.length, cancel]);

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds],
  );

  const start = useCallback((id?: string) => {
    setSelecting(true);
    setSelectedIds(id ? [id] : []);
  }, []);

  const toggle = useCallback((id: string) => {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedIds(allSelected ? [] : profiles.map((p) => p.id));
  }, [allSelected, profiles]);

  return {
    selecting,
    selected,
    allSelected,
    isSelected,
    start,
    toggle,
    toggleAll,
    cancel,
  };
}
