/**
 * Utility functions for matchup status and calculations
 */

import type { Matchup } from "../types/Matchup";
import { isToday } from "./formatters";

/**
 * Finds the current match and the next upcoming match from a list of matchups
 * @param matchups Array of all matchups
 * @param now Current time (defaults to new Date())
 * @returns Object containing currentMatch, nextMatch and timeUntilNext
 */
export function getCurrentAndNextMatch(matchups: Matchup[], now = new Date()) {
  let currentMatch: Matchup | null = null;
  let nextMatch: Matchup | null = null;
  let timeUntilNext: string = "";

  // Sort all matchups chronologically
  const upcomingMatchups = matchups
    .filter((m) => !m.isCompleted)
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
      const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
      return dateTimeA - dateTimeB;
    });

  // Find current and next match
  for (let i = 0; i < upcomingMatchups.length; i++) {
    const matchup = upcomingMatchups[i];
    const matchupDateTime = new Date(`${matchup.date}T${matchup.time}`);

    if (matchupDateTime <= now) {
      currentMatch = matchup;
      nextMatch = upcomingMatchups[i + 1] || null;

      if (nextMatch) {
        timeUntilNext = getTimeUntilMatch(nextMatch, now);
      }

      break;
    } else if (matchupDateTime > now) {
      nextMatch = matchup;
      timeUntilNext = getTimeUntilMatch(nextMatch, now);
      break;
    }
  }

  return { currentMatch, nextMatch, timeUntilNext };
}

/**
 * Calculate the time until a matchup (e.g., "45 min" or "2h 30m")
 * @param matchup The matchup to calculate time until
 * @param now Current time (defaults to new Date())
 * @returns Formatted string with time until matchup
 */
export function getTimeUntilMatch(matchup: Matchup, now = new Date()): string {
  const matchupDateTime = new Date(`${matchup.date}T${matchup.time}`);

  // If the match has already passed
  if (matchupDateTime <= now) {
    return "Live now";
  }

  const minutesUntilMatch = Math.floor(
    (matchupDateTime.getTime() - now.getTime()) / 60000
  );

  if (minutesUntilMatch < 60) {
    return `${minutesUntilMatch} min`;
  } else {
    const hoursUntilMatch = Math.floor(minutesUntilMatch / 60);
    const remainingMinutes = minutesUntilMatch % 60;
    return `${hoursUntilMatch}h ${remainingMinutes}m`;
  }
}

/**
 * Get the status of a matchup (completed, live, next, upcoming)
 * @param matchup The matchup to check
 * @param currentMatch The current live match if any
 * @param nextMatch The next scheduled match if any
 * @returns The status of the matchup
 */
export function getMatchupStatus(
  matchup: Matchup,
  currentMatch: Matchup | null,
  nextMatch: Matchup | null
): "completed" | "live" | "next" | "today" | "upcoming" {
  if (matchup.isCompleted) {
    return "completed";
  }

  if (currentMatch && matchup.id === currentMatch.id) {
    return "live";
  }

  if (nextMatch && matchup.id === nextMatch.id) {
    return "next";
  }

  if (isToday(matchup.date)) {
    return "today";
  }

  return "upcoming";
}

/**
 * Sort matchups by date and time
 * @param matchups Array of matchups to sort
 * @param sortCompletedFirst Whether to show completed matches first (true) or last (false)
 * @returns Sorted array of matchups
 */
export function sortMatchups(
  matchups: Matchup[],
  sortCompletedFirst = false
): Matchup[] {
  return [...matchups].sort((a, b) => {
    if (sortCompletedFirst) {
      // Most recent completed matches first
      return (
        new Date(`${b.date}T${b.time}`).getTime() -
        new Date(`${a.date}T${a.time}`).getTime()
      );
    }
    // Upcoming matches by date and time
    return (
      new Date(`${a.date}T${a.time}`).getTime() -
      new Date(`${b.date}T${b.time}`).getTime()
    );
  });
}

/**
 * Group matchups by date
 * @param matchups Array of matchups to group
 * @returns Object with dates as keys and arrays of matchups as values
 */
export function groupMatchupsByDate(
  matchups: Matchup[]
): Record<string, Matchup[]> {
  const grouped = matchups.reduce((acc, matchup) => {
    if (!acc[matchup.date]) {
      acc[matchup.date] = [];
    }
    acc[matchup.date].push(matchup);
    return acc;
  }, {} as Record<string, Matchup[]>);

  // Sort by time within each date group
  Object.keys(grouped).forEach((date) => {
    grouped[date].sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
  });

  return grouped;
}
