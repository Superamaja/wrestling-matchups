import type { Matchup } from "../types/Matchup";

/**
 * Sorts matchups by date and time
 * @param matchups - The matchups to sort
 * @param reverseOrder - Whether to sort in reverse order (for completed matches)
 */
export function sortMatchups(
  matchups: Matchup[],
  reverseOrder = false
): Matchup[] {
  return [...matchups].sort((a, b) => {
    // First, compare by date
    const dateComparison = a.date.localeCompare(b.date);
    if (dateComparison !== 0) {
      return reverseOrder ? -dateComparison : dateComparison;
    }

    // If same date, compare by time
    return reverseOrder
      ? b.time.localeCompare(a.time)
      : a.time.localeCompare(b.time);
  });
}

/**
 * Groups matchups by date
 * @param matchups - The matchups to group
 */
export function groupMatchupsByDate(
  matchups: Matchup[]
): Record<string, Matchup[]> {
  return matchups.reduce((acc, matchup) => {
    if (!acc[matchup.date]) {
      acc[matchup.date] = [];
    }
    acc[matchup.date].push(matchup);
    return acc;
  }, {} as Record<string, Matchup[]>);
}

/**
 * Finds the current and next matches based on the current time
 * @param matchups - All available matchups
 * @param now - Current date/time (defaults to now)
 */
export function getCurrentAndNextMatch(matchups: Matchup[], now = new Date()) {
  // Filter to only upcoming matches
  const upcomingMatches = matchups
    .filter((match) => !match.isCompleted)
    .sort((a, b) => {
      // Sort by date, then by time
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;
      return a.time.localeCompare(b.time);
    });

  // Find the "current" match using the simple algorithm:
  // If we are past the start time and it is not completed, it is live
  const currentMatch = upcomingMatches.find((match) => {
    const matchDate = new Date(`${match.date}T${match.time}:00`);
    return matchDate <= now && !match.isCompleted;
  });

  // Find the next match (the first one after the current match, or the first upcoming if no current)
  const currentIndex = currentMatch
    ? upcomingMatches.findIndex((m) => m.id === currentMatch.id)
    : -1;
  const nextMatch =
    currentIndex >= 0 && currentIndex < upcomingMatches.length - 1
      ? upcomingMatches[currentIndex + 1]
      : currentIndex === -1 && upcomingMatches.length > 0
      ? upcomingMatches[0]
      : undefined;

  // Calculate time until next match
  let timeUntilNext = "";
  if (nextMatch) {
    const matchDate = new Date(`${nextMatch.date}T${nextMatch.time}:00`);
    const todayDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const matchDayDate = new Date(
      matchDate.getFullYear(),
      matchDate.getMonth(),
      matchDate.getDate()
    );

    // Calculate days difference
    const daysDiff = Math.floor(
      (matchDayDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0) {
      // Same day calculation
      const [hours, minutes] = nextMatch.time.split(":").map(Number);
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const minutesDiff =
        hours * 60 + minutes - (currentHour * 60 + currentMinute);

      if (minutesDiff <= 60) {
        timeUntilNext =
          `${minutesDiff} minute` + (minutesDiff !== 1 ? "s" : "");
      } else {
        timeUntilNext = `${Math.floor(minutesDiff / 60)} hours`;
      }
    } else if (daysDiff === 1) {
      timeUntilNext = "tomorrow";
    } else {
      timeUntilNext = `${daysDiff} days`;
    }
  }

  return { currentMatch, nextMatch, timeUntilNext };
}

/**
 * Filters matchups based on completion status and date
 * @param matchups - All available matchups
 * @param statusFilter - Filter by matchup status
 * @param dateFilter - Filter by specific date
 */
export function filterMatchups(
  matchups: Matchup[],
  statusFilter: "all" | "upcoming" | "completed" = "all",
  dateFilter?: string
): Matchup[] {
  return matchups.filter((matchup) => {
    // Filter by completion status
    const passesStatusFilter =
      statusFilter === "all"
        ? true
        : statusFilter === "upcoming"
        ? !matchup.isCompleted
        : matchup.isCompleted;

    // Filter by date if specified
    const passesDateFilter =
      !dateFilter || dateFilter === "all" ? true : matchup.date === dateFilter;

    return passesStatusFilter && passesDateFilter;
  });
}
