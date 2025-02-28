import { cn } from "../lib/utils";
import { Matchup } from "../types/Matchup";
import { WrestlerAvatar } from "./WrestlerAvatar";
import { MatchStatus, MatchStatusType } from "./MatchStatus";

interface TimelineItemProps {
  matchup: Matchup;
  statusType: MatchStatusType;
  isCurrentMatch: boolean;
  isNextMatch: boolean;
}

export function TimelineItem({
  matchup,
  statusType,
  isCurrentMatch,
  isNextMatch,
}: TimelineItemProps) {
  return (
    <div
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
          <MatchStatus status={statusType} compact={true} />

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
            <WrestlerAvatar
              wrestler={matchup.wrestler1}
              size="sm"
              isWinner={
                matchup.isCompleted && matchup.winner === matchup.wrestler1.name
              }
              showStats={true}
            />
          </div>

          {/* VS */}
          <div className="flex-shrink-0 mx-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              VS
            </div>
          </div>

          {/* Wrestler 2 */}
          <div className="flex-1 text-center">
            <WrestlerAvatar
              wrestler={matchup.wrestler2}
              size="sm"
              isWinner={
                matchup.isCompleted && matchup.winner === matchup.wrestler2.name
              }
              showStats={true}
              gradientDirection="reverse"
            />
          </div>
        </div>

        {/* Match result */}
        {matchup.isCompleted && matchup.winner && (
          <div className="mt-3 text-center">
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 py-1 px-3 rounded-full">
              Winner: <span className="font-bold">{matchup.winner}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
