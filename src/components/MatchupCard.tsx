import { useState } from "react";
import type { Matchup } from "../types/Matchup";
import { cn } from "../lib/utils";
import { formatShortDate, formatFullDate, isToday } from "../utils/formatters";
import { WrestlerAvatar } from "./WrestlerAvatar";
import { MatchStatus } from "./MatchStatus";

interface Props {
  matchup: Matchup;
}

export function MatchupCard({ matchup }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // Use the isToday utility function instead of inline implementation
  const isTodayMatch = isToday(matchup.date);

  return (
    <div
      className={cn(
        "group relative backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300",
        "border border-white/10 dark:border-neutral-800/30",
        "hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/20",
        isHovered ? "transform scale-[1.02]" : "",
        matchup.isCompleted
          ? "bg-white/25 dark:bg-neutral-900/50"
          : isTodayMatch
          ? "bg-gradient-to-br from-white/30 to-indigo-50/30 dark:from-neutral-900/70 dark:to-indigo-950/50"
          : "bg-white/15 dark:bg-neutral-900/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator */}
      <div className="absolute top-4 left-4 z-20">
        <MatchStatus
          status={
            matchup.isCompleted
              ? "completed"
              : isTodayMatch
              ? "today"
              : "upcoming"
          }
        />
      </div>

      {/* Date and time ribbon */}
      <div className="absolute -right-10 top-6 transform rotate-45 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white px-10 py-1 text-xs font-bold shadow-lg">
        {formatShortDate(matchup.date)} {matchup.time}
      </div>

      {/* Card content */}
      <div className="p-6 pt-12">
        {/* Match description */}
        {matchup.matchDescription && (
          <div className="mb-4 text-center">
            <span className="inline-block text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {matchup.matchDescription}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between space-x-2">
          {/* Wrestler 1 */}
          <div className="flex-1">
            <div className="mx-auto mb-2">
              <WrestlerAvatar
                wrestler={matchup.wrestler1}
                size="lg"
                isWinner={
                  matchup.isCompleted &&
                  matchup.winner === matchup.wrestler1.name
                }
                showStats={true}
                gradientDirection="default"
              />
            </div>
          </div>

          {/* VS Badge */}
          <div className="flex-shrink-0 relative">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transform transition-all duration-300",
                "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg",
                "shadow-lg",
                isHovered ? "scale-110 shadow-indigo-500/30" : ""
              )}
            >
              VS
            </div>
          </div>

          {/* Wrestler 2 */}
          <div className="flex-1">
            <div className="mx-auto mb-2">
              <WrestlerAvatar
                wrestler={matchup.wrestler2}
                size="lg"
                isWinner={
                  matchup.isCompleted &&
                  matchup.winner === matchup.wrestler2.name
                }
                showStats={true}
                gradientDirection="reverse"
              />
            </div>
          </div>
        </div>

        {/* Match result */}
        {matchup.isCompleted && matchup.winner && (
          <div className="mt-6 text-center">
            <div className="py-2 px-4 rounded-lg backdrop-blur-md bg-white/30 dark:bg-black/30 inline-block">
              <span className="text-base font-medium text-indigo-700 dark:text-indigo-400">
                Winner: <span className="font-bold">{matchup.winner}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card footer - date and time */}
      <div className="py-3 px-6 bg-black/5 dark:bg-white/5 text-center text-xs text-neutral-600 dark:text-neutral-400 font-medium">
        {formatFullDate(matchup.date)}
        {" • "}
        {matchup.time}
      </div>
    </div>
  );
}
