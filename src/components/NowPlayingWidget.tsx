import { useMemo, useEffect, useState } from "react";
import type { Matchup } from "../types/Matchup";
import { cn } from "../lib/utils";
import { formatShortDate } from "../utils/formatters";

interface NowPlayingWidgetProps {
  matchups: Matchup[];
}

export function NowPlayingWidget({ matchups }: NowPlayingWidgetProps) {
  const [now, setNow] = useState(new Date());

  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Find current and next match
  const { currentMatch, nextMatch, timeUntilNext } = useMemo(() => {
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
          const nextMatchTime = new Date(`${nextMatch.date}T${nextMatch.time}`);
          const minutesUntilNext = Math.floor(
            (nextMatchTime.getTime() - now.getTime()) / 60000
          );
          timeUntilNext = `${minutesUntilNext} min`;
        }

        break;
      } else if (matchupDateTime > now) {
        nextMatch = matchup;

        const minutesUntilNext = Math.floor(
          (matchupDateTime.getTime() - now.getTime()) / 60000
        );
        if (minutesUntilNext < 60) {
          timeUntilNext = `${minutesUntilNext} min`;
        } else {
          const hoursUntilNext = Math.floor(minutesUntilNext / 60);
          const remainingMinutes = minutesUntilNext % 60;
          timeUntilNext = `${hoursUntilNext}h ${remainingMinutes}m`;
        }

        break;
      }
    }

    return { currentMatch, nextMatch, timeUntilNext };
  }, [matchups, now]);

  if (!currentMatch && !nextMatch) {
    return null;
  }

  // Reusable function to render a match
  const renderMatch = (
    match: Matchup,
    status: "current" | "next",
    timeInfo?: string
  ) => {
    const isCurrentMatch = status === "current";

    return (
      <div className={cn(isCurrentMatch && nextMatch ? "mb-6" : "")}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                isCurrentMatch ? "bg-red-500 animate-pulse" : "bg-green-500"
              )}
            ></div>
            <span
              className={cn(
                "text-sm font-semibold",
                isCurrentMatch ? "text-red-500" : "text-green-500"
              )}
            >
              {isCurrentMatch
                ? "LIVE NOW"
                : currentMatch
                ? "UP NEXT"
                : "STARTING SOON"}
            </span>
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {timeInfo && (
              <span className="inline-block px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium">
                {timeInfo}
              </span>
            )}
            {match.matchDescription && (
              <span className="inline-block px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium ml-2">
                {match.matchDescription}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Wrestler 1 */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {match.wrestler1.name.charAt(0)}
              </div>
              <p className="mt-2 font-bold text-white">
                {match.wrestler1.name}
              </p>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <div className="uppercase font-black text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                VS
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {formatShortDate(match.date)} {match.time}
              </div>
            </div>

            {/* Wrestler 2 */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                {match.wrestler2.name.charAt(0)}
              </div>
              <p className="mt-2 font-bold text-white">
                {match.wrestler2.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 overflow-hidden rounded-xl shadow-lg border border-white/10 backdrop-blur-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
      <div className="p-4 border-b border-white/10 bg-black/5">
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {currentMatch ? "Now Wrestling!" : "Coming Up Next"}
        </h2>
      </div>

      <div className="p-4">
        {currentMatch && renderMatch(currentMatch, "current")}

        {nextMatch && (
          <div
            className={cn(currentMatch ? "pt-4 border-t border-white/10" : "")}
          >
            {renderMatch(
              nextMatch,
              "next",
              timeUntilNext ? `Starts in ${timeUntilNext}` : ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}
