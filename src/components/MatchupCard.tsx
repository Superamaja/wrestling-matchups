import { useState } from "react";
import type { Matchup } from "../data/matchups";
import { cn } from "../lib/utils";

interface Props {
  matchup: Matchup;
}

export function MatchupCard({ matchup }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const isPast = new Date(matchup.date) < new Date();
  const isToday =
    new Date(matchup.date).toDateString() === new Date().toDateString();

  // Calculate win percentage for each wrestler
  const wrestler1WinRate = Math.round(
    (matchup.wrestler1.wins /
      (matchup.wrestler1.wins + matchup.wrestler1.losses)) *
      100
  );
  const wrestler2WinRate = Math.round(
    (matchup.wrestler2.wins /
      (matchup.wrestler2.wins + matchup.wrestler2.losses)) *
      100
  );

  return (
    <div
      className={cn(
        "group relative backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300",
        "border border-white/10 dark:border-neutral-800/30",
        "hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/20",
        isHovered ? "transform scale-[1.02]" : "",
        matchup.isCompleted
          ? "bg-white/25 dark:bg-neutral-900/50"
          : isToday
          ? "bg-gradient-to-br from-white/30 to-indigo-50/30 dark:from-neutral-900/70 dark:to-indigo-950/50"
          : "bg-white/15 dark:bg-neutral-900/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator */}
      <div className="absolute top-4 left-4 z-20">
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            matchup.isCompleted
              ? "bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300"
              : isToday
              ? "bg-gradient-to-r from-indigo-500/70 to-purple-500/70 text-white animate-pulse"
              : "bg-emerald-500/70 text-white"
          )}
        >
          {matchup.isCompleted ? "Completed" : isToday ? "Today" : "Upcoming"}
        </div>
      </div>

      {/* Date ribbon */}
      <div className="absolute -right-10 top-6 transform rotate-45 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white px-10 py-1 text-xs font-bold shadow-lg">
        {new Date(matchup.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
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
            <div
              className={cn(
                "relative h-24 w-24 mx-auto mb-3 rounded-full overflow-hidden border-4",
                matchup.isCompleted && matchup.winner === matchup.wrestler1.name
                  ? "border-yellow-400 shadow-lg shadow-yellow-400/20"
                  : "border-white/20"
              )}
            >
              {matchup.wrestler1.imageUrl ? (
                <img
                  src={matchup.wrestler1.imageUrl}
                  alt={matchup.wrestler1.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                  {matchup.wrestler1.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-neutral-800 dark:text-white transition-transform group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {matchup.wrestler1.name}
              </h3>
              <div className="mt-1 flex items-center justify-center space-x-2">
                <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 py-0.5 px-2 rounded-full">
                  {matchup.wrestler1.wins}W
                </span>
                <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 py-0.5 px-2 rounded-full">
                  {matchup.wrestler1.losses}L
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-neutral-200/50 dark:bg-neutral-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${wrestler1WinRate}%` }}
                />
              </div>
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
            <div
              className={cn(
                "relative h-24 w-24 mx-auto mb-3 rounded-full overflow-hidden border-4",
                matchup.isCompleted && matchup.winner === matchup.wrestler2.name
                  ? "border-yellow-400 shadow-lg shadow-yellow-400/20"
                  : "border-white/20"
              )}
            >
              {matchup.wrestler2.imageUrl ? (
                <img
                  src={matchup.wrestler2.imageUrl}
                  alt={matchup.wrestler2.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
                  {matchup.wrestler2.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-neutral-800 dark:text-white transition-transform group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {matchup.wrestler2.name}
              </h3>
              <div className="mt-1 flex items-center justify-center space-x-2">
                <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 py-0.5 px-2 rounded-full">
                  {matchup.wrestler2.wins}W
                </span>
                <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 py-0.5 px-2 rounded-full">
                  {matchup.wrestler2.losses}L
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-neutral-200/50 dark:bg-neutral-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  style={{ width: `${wrestler2WinRate}%` }}
                />
              </div>
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
        {new Date(matchup.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}
