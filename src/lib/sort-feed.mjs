// Keep today's events in the upcoming group, using the Japanese calendar day.
export function sortFeed(items, getTime, now = new Date()) {
  const today = now.toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" });
  const cutoff = new Date(`${today}T00:00:00+09:00`).getTime();
  const group = (item) => item.kind === "page" ? 2 : getTime(item) >= cutoff ? 0 : 1;

  return [...items].sort((a, b) => {
    const aGroup = group(a);
    const bGroup = group(b);
    if (aGroup !== bGroup) return aGroup - bGroup;
    return aGroup === 0 ? getTime(a) - getTime(b) : getTime(b) - getTime(a);
  });
}
