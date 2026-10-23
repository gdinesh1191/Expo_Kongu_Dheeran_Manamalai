import { Profile } from "@/constants/SampleProfile";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type LikedProfilesContextValue = {
  liked: Profile[];
  isLiked: (id: string) => boolean;
  like: (profile: Profile) => void;
  unlike: (id: string) => void;
  toggleLike: (profile: Profile) => void;
};

const LikedProfilesContext = createContext<LikedProfilesContextValue | null>(null);

export function LikedProfilesProvider({ children }: { children: React.ReactNode }) {
  const [liked, setLiked] = useState<Profile[]>([]);

  const isLiked = useCallback((id: string) => liked.some((p) => p.id === id), [liked]);

  const like = useCallback((profile: Profile) => {
    setLiked((list) => (list.some((p) => p.id === profile.id) ? list : [profile, ...list]));
  }, []);

  const unlike = useCallback((id: string) => {
    setLiked((list) => list.filter((p) => p.id !== id));
  }, []);

  const toggleLike = useCallback((profile: Profile) => {
    setLiked((list) =>
      list.some((p) => p.id === profile.id)
        ? list.filter((p) => p.id !== profile.id)
        : [profile, ...list],
    );
  }, []);

  const value = useMemo(
    () => ({ liked, isLiked, like, unlike, toggleLike }),
    [liked, isLiked, like, unlike, toggleLike],
  );

  return <LikedProfilesContext.Provider value={value}>{children}</LikedProfilesContext.Provider>;
}

export function useLikedProfiles() {
  const ctx = useContext(LikedProfilesContext);
  if (!ctx) throw new Error("useLikedProfiles must be used inside LikedProfilesProvider");
  return ctx;
}
