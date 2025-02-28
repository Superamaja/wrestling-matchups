import { MatchStatusType } from "../components/MatchStatus";
import { Matchup } from "../types/Matchup";

/**
 * Determine the status type of a matchup
 */
export function determineMatchupStatus(
  matchup: Matchup,
  currentMatch?: Matchup | null,
  nextMatch?: Matchup | null
): MatchStatusType {
  if (matchup.isCompleted) return "completed";
  if (currentMatch?.id === matchup.id) return "live";
  if (nextMatch?.id === matchup.id) return "next";

  // Check if matchup is today
  const today = new Date().toISOString().split("T")[0];
  const matchupDate = new Date(matchup.date).toISOString().split("T")[0];

  if (today === matchupDate) return "today";
  return "upcoming";
}
