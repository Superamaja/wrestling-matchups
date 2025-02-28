import { cn } from "../lib/utils";

export type MatchStatusType =
  | "completed"
  | "live"
  | "today"
  | "upcoming"
  | "next";

interface MatchStatusProps {
  status: MatchStatusType;
  className?: string;
  animate?: boolean;
  compact?: boolean;
}

export function MatchStatus({
  status,
  className,
  animate = true,
  compact = false,
}: MatchStatusProps) {
  const getStatusLabel = () => {
    switch (status) {
      case "completed":
        return "Completed";
      case "live":
        return "Live Now";
      case "today":
        return "Today";
      case "upcoming":
        return "Upcoming";
      case "next":
        return "Up Next";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center space-x-1",
        // Status-specific styles
        status === "completed"
          ? "bg-neutral-200/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300"
          : status === "live"
          ? "bg-gradient-to-r from-red-500/70 to-orange-500/70 text-white"
          : status === "today"
          ? "bg-gradient-to-r from-indigo-500/70 to-purple-500/70 text-white"
          : status === "next"
          ? "bg-gradient-to-r from-green-500/70 to-emerald-500/70 text-white"
          : "bg-emerald-500/70 text-white",
        // Animation
        animate && (status === "live" || status === "today")
          ? "animate-pulse"
          : "",
        // Size adjustments
        !compact ? "px-3 py-1" : "",
        // Apply custom classes
        className
      )}
    >
      {!compact && status === "live" && (
        <span className="h-2 w-2 rounded-full bg-white mr-1 animate-pulse"></span>
      )}
      <span>{getStatusLabel()}</span>
    </div>
  );
}
