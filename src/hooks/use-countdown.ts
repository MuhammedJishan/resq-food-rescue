import { useEffect, useState } from "react";

/** Re-render tick for countdown UIs. */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function formatCountdown(endsAt: number, now: number) {
  const ms = Math.max(0, endsAt - now);
  const totalMin = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  if (totalMin >= 60) {
    return `${Math.floor(totalMin / 60)}h ${String(totalMin % 60).padStart(2, "0")}m`;
  }
  return `${totalMin}:${String(s).padStart(2, "0")}`;
}

export function formatCountdownLabel(endsAt: number, now: number) {
  const ms = Math.max(0, endsAt - now);
  if (ms <= 0) return "Ended";
  const totalMin = Math.floor(ms / 60000);
  if (totalMin >= 60) return `${Math.floor(totalMin / 60)}h ${totalMin % 60}m left`;
  return `${totalMin} min left`;
}
