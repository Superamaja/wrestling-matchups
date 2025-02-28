import { useEffect, useState } from "react";
import type { Matchup } from "../types/Matchup";
import { cn } from "../lib/utils";
import { formatShortDate } from "../utils/formatters";
import { getCurrentAndNextMatch } from "../services/matchupService";
import { WrestlerAvatar } from "./WrestlerAvatar";
import { MatchStatus } from "./MatchStatus";

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

  // Use centralized utility to find current and next match
  const { currentMatch, nextMatch, timeUntilNext } = getCurrentAndNextMatch(
    matchups,
    now
  );

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
    const statusType = isCurrentMatch ? "live" : "next";

    return (
      <div className={cn(isCurrentMatch && nextMatch ? "mb-6" : "")}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MatchStatus status={statusType} className="py-0.5" />
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
            <WrestlerAvatar wrestler={match.wrestler1} size="md" />

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
            <WrestlerAvatar
              wrestler={match.wrestler2}
              size="md"
              gradientDirection="reverse"
            />
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
