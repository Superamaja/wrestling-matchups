import { useState } from "react";
import { MatchupCard } from "./MatchupCard";
import { matchups as allMatchups } from "../data/matchups";

type FilterType = "all" | "upcoming" | "completed";

export function MatchupList() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredMatchups = allMatchups.filter((matchup) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return !matchup.isCompleted;
    if (filter === "completed") return matchup.isCompleted;
    return true;
  });

  // Sort matchups by date and time
  const sortedMatchups = [...filteredMatchups].sort((a, b) => {
    if (filter === "completed") {
      // Most recent completed matches first
      const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
      const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
      return dateTimeB - dateTimeA;
    }
    // Upcoming matches by date and time
    const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
    const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
    return dateTimeA - dateTimeB;
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/10 shadow-inner">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
            }`}
          >
            All Matchups
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              filter === "upcoming"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-all ${
              filter === "completed"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sortedMatchups.map((matchup, index) => (
          <div
            key={matchup.id}
            className="opacity-0 animate-slide-up-fade"
            style={{ "--index": index } as React.CSSProperties}
          >
            <MatchupCard matchup={matchup} />
          </div>
        ))}
      </div>

      {filteredMatchups.length === 0 && (
        <div className="text-center py-10">
          <p className="text-neutral-500 dark:text-neutral-400">
            No matchups found
          </p>
        </div>
      )}
    </div>
  );
}
