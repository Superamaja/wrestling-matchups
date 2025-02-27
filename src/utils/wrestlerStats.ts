import type { Matchup } from "../types/Matchup";

export function getWrestlerStats(wrestlerName: string, matchups: Matchup[]) {
  const completedMatches = matchups.filter((matchup) => matchup.isCompleted);

  const wins = completedMatches.filter(
    (matchup) => matchup.winner === wrestlerName
  ).length;

  const losses = completedMatches.filter(
    (matchup) =>
      (matchup.wrestler1.name === wrestlerName ||
        matchup.wrestler2.name === wrestlerName) &&
      matchup.winner &&
      matchup.winner !== wrestlerName
  ).length;

  const winRate =
    wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  return { wins, losses, winRate };
}
