import { cn } from "../lib/utils";
import type { Wrestler } from "../types/Wrestler";
import { getWrestlerStats } from "../utils/wrestlerStats";
import { matchups } from "../data/matchups";

interface WrestlerAvatarProps {
  wrestler: Wrestler;
  size?: "sm" | "md" | "lg";
  isWinner?: boolean;
  showStats?: boolean;
  gradientDirection?: "default" | "reverse";
}

export function WrestlerAvatar({
  wrestler,
  size = "md",
  isWinner = false,
  showStats = false,
  gradientDirection = "default",
}: WrestlerAvatarProps) {
  // Calculate size classes based on prop
  const sizeClasses = {
    sm: "h-10 w-10 text-base",
    md: "h-16 w-16 text-xl",
    lg: "h-24 w-24 text-2xl",
  };

  // Calculate gradient based on direction
  const gradientClasses = {
    default: "from-indigo-500 to-purple-500",
    reverse: "from-purple-500 to-indigo-500",
  };

  // Get stats if needed
  const stats = showStats ? getWrestlerStats(wrestler.name, matchups) : null;

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-white font-bold",
          sizeClasses[size],
          `bg-gradient-to-br ${gradientClasses[gradientDirection]}`,
          isWinner && "ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20"
        )}
      >
        {wrestler.imageUrl ? (
          <img
            src={wrestler.imageUrl}
            alt={wrestler.name}
            className="rounded-full h-full w-full object-cover"
          />
        ) : (
          <span>{wrestler.name.charAt(0)}</span>
        )}
      </div>

      {/* Name is always displayed */}
      <p
        className={cn(
          "mt-2 font-bold text-white",
          size === "lg" ? "text-lg" : size === "md" ? "text-base" : "text-sm"
        )}
      >
        {wrestler.name}
      </p>

      {/* Stats are conditionally displayed */}
      {showStats && stats && (
        <>
          <div className="mt-1 flex items-center justify-center space-x-2">
            <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 py-0.5 px-2 rounded-full">
              {stats.wins}W
            </span>
            <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 py-0.5 px-2 rounded-full">
              {stats.losses}L
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-neutral-200/50 dark:bg-neutral-700/50 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full",
                gradientDirection === "default"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-gradient-to-r from-purple-500 to-indigo-500"
              )}
              style={{ width: `${stats.winRate}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
