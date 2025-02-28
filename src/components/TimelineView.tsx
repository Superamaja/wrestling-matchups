import { useMemo } from "react";
import type { Matchup } from "../types/Matchup";
import { cn } from "../lib/utils";
import { getWrestlerStats } from "../utils/wrestlerStats";
import { formatMediumDate } from "../utils/formatters";

interface TimelineViewProps {
  matchups: Matchup[];
  allMatchups: Matchup[];
}

export function TimelineView({ matchups, allMatchups }: TimelineViewProps) {
  // Group matchups by date
  const matchupsByDate = useMemo(() => {
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
  }, [matchups]);

  // Get dates in order
  const dates = Object.keys(matchupsByDate).sort();

  // Check if a matchup is happening now or is the next match
  const getCurrentAndNextMatch = () => {
    const now = new Date();
    let currentMatch: Matchup | null = null;
    let nextMatch: Matchup | null = null;

    // Sort all matchups chronologically
    const chronologicalMatchups = [...matchups].sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
      const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
      return dateTimeA - dateTimeB;
    });

    // Find current and next match
    for (let i = 0; i < chronologicalMatchups.length; i++) {
      const matchup = chronologicalMatchups[i];
      const matchupDateTime = new Date(`${matchup.date}T${matchup.time}`);

      if (matchupDateTime <= now) {
        currentMatch = matchup;
        nextMatch = chronologicalMatchups[i + 1] || null;
        break;
      } else if (matchupDateTime > now) {
        nextMatch = matchup;
        break;
      }
    }

    return { currentMatch, nextMatch };
  };

  const { currentMatch, nextMatch } = getCurrentAndNextMatch();

  return (
    <div className="space-y-8">
      {dates.map((date) => (
        <div key={date} className="space-y-4">
          <div className="sticky top-16 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-3 rounded-lg shadow">
            <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {formatMediumDate(date)}
            </h2>
          </div>

          <div className="relative border-l-2 border-indigo-300 dark:border-indigo-800 pl-6 ml-4 space-y-0">
            {matchupsByDate[date].map((matchup) => {
              const isCurrentMatch = currentMatch?.id === matchup.id;
              const isNextMatch = nextMatch?.id === matchup.id;

              // Get stats for each wrestler
              const wrestler1Stats = getWrestlerStats(
                matchup.wrestler1.name,
                allMatchups
              );
              const wrestler2Stats = getWrestlerStats(
                matchup.wrestler2.name,
                allMatchups
              );

              return (
                <div
                  key={matchup.id}
                  className={cn(
                    "relative mb-6 transition-all duration-300 hover:transform hover:scale-[1.01]",
                    isCurrentMatch ? "animate-pulse" : ""
                  )}
                >
                  {/* Time marker */}
                  <div className="absolute -left-10 top-6 flex items-center justify-center">
                    <div
                      className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold",
                        matchup.isCompleted
                          ? "bg-neutral-200 dark:bg-neutral-700"
                          : isCurrentMatch
                          ? "bg-red-500 animate-pulse"
                          : isNextMatch
                          ? "bg-green-500"
                          : "bg-indigo-500"
                      )}
                    >
                      {isCurrentMatch ? "◉" : isNextMatch ? "→" : "•"}
                    </div>
                  </div>

                  {/* Time - Fixed positioning */}
                  <div className="absolute -left-24 top-5 w-14 flex justify-end">
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {matchup.time}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "p-4 rounded-lg transition-all duration-300",
                      "border shadow-sm",
                      matchup.isCompleted
                        ? "bg-white/40 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700"
                        : isCurrentMatch
                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-indigo-300 dark:border-indigo-700 shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                        : isNextMatch
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-300 dark:border-green-700"
                        : "bg-white/70 dark:bg-neutral-800/70 border-white/20 dark:border-neutral-700/50"
                    )}
                  >
                    {/* Status indicator */}
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center space-x-1",
                          matchup.isCompleted
                            ? "bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300"
                            : isCurrentMatch
                            ? "bg-gradient-to-r from-red-500/70 to-orange-500/70 text-white animate-pulse"
                            : isNextMatch
                            ? "bg-gradient-to-r from-green-500/70 to-emerald-500/70 text-white"
                            : "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                        )}
                      >
                        <span>
                          {matchup.isCompleted
                            ? "Completed"
                            : isCurrentMatch
                            ? "Live Now"
                            : isNextMatch
                            ? "Up Next"
                            : "Upcoming"}
                        </span>
                      </div>

                      {matchup.matchDescription && (
                        <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                          {matchup.matchDescription}
                        </span>
                      )}
                    </div>

                    {/* Matchup content */}
                    <div className="flex items-center justify-between">
                      {/* Wrestler 1 */}
                      <div className="flex-1 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-full flex items-center justify-center",
                              "bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold",
                              matchup.isCompleted &&
                                matchup.winner === matchup.wrestler1.name &&
                                "ring-2 ring-yellow-400"
                            )}
                          >
                            {matchup.wrestler1.name.charAt(0)}
                          </div>
                          <div className="text-left">
                            <h3 className="text-sm font-bold text-white">
                              {matchup.wrestler1.name}
                            </h3>
                            <div className="flex items-center space-x-1 mt-0.5">
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-1 rounded">
                                {wrestler1Stats.wins}W
                              </span>
                              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-1 rounded">
                                {wrestler1Stats.losses}L
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* VS */}
                      <div className="flex-shrink-0 mx-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          VS
                        </div>
                      </div>

                      {/* Wrestler 2 */}
                      <div className="flex-1 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="text-right">
                            <h3 className="text-sm font-bold text-white">
                              {matchup.wrestler2.name}
                            </h3>
                            <div className="flex items-center space-x-1 mt-0.5 justify-end">
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-1 rounded">
                                {wrestler2Stats.wins}W
                              </span>
                              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-1 rounded">
                                {wrestler2Stats.losses}L
                              </span>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "h-10 w-10 rounded-full flex items-center justify-center",
                              "bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-bold",
                              matchup.isCompleted &&
                                matchup.winner === matchup.wrestler2.name &&
                                "ring-2 ring-yellow-400"
                            )}
                          >
                            {matchup.wrestler2.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Match result */}
                    {matchup.isCompleted && matchup.winner && (
                      <div className="mt-3 text-center">
                        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 py-1 px-3 rounded-full">
                          Winner:{" "}
                          <span className="font-bold">{matchup.winner}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
