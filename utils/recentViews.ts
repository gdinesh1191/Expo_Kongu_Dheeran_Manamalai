import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_VIEWS_KEY = "home_feed_recent_view_ids";

// Oldest view first, newest last — the same order Instagram uses for stories
// you have already watched.
let memory: string[] | null = null;
let queue: Promise<void> = Promise.resolve();

export async function loadRecentViewIds(): Promise<string[]> {
  if (memory) return memory;
  try {
    const raw = await AsyncStorage.getItem(RECENT_VIEWS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    memory = Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    memory = [];
  }
  return memory;
}

export function rememberRecentView(id: string) {
  const current = memory ?? [];
  if (current[current.length - 1] === id) return;
  memory = [...current.filter((item) => item !== id), id];
  const snapshot = memory;
  queue = queue
    .catch(() => undefined)
    .then(() => AsyncStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(snapshot)).then(() => undefined));
}

// Unseen posts stay in their original order at the front. Posts already
// seen sink to the back, oldest view first, just like an Instagram feed.
export function orderByRecentViews<T extends { id: string }>(items: T[], viewedIds: string[]): T[] {
  const byId = new Map(items.map((item) => [item.id, item]));
  const seenIds = new Set(viewedIds);
  const unseen = items.filter((item) => !seenIds.has(item.id));
  const seen = viewedIds
    .map((id) => byId.get(id))
    .filter((item): item is T => item != null);
  return [...unseen, ...seen];
}
