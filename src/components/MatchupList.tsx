import { useState } from "react";
import { MatchupCard } from "./MatchupCard";
import { TimelineView } from "./TimelineView";
import { matchups as allMatchups } from "../data/matchups";
import { formatShortDate, formatShortWeekday } from "../utils/formatters";

type FilterType = "all" | "upcoming" | "completed";
type DayFilterType = "all" | "day1" | "day2";
type ViewType = "cards" | "timeline";

export function MatchupList() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [dayFilter, setDayFilter] = useState<DayFilterType>("all");
  const [viewType, setViewType] = useState<ViewType>("cards");

  // Extract unique dates from matchups
  const eventDates = [...new Set(allMatchups.map((m) => m.date))].sort();
  const day1 = eventDates[0] || "";
  const day2 = eventDates[1] || "";

  // Filter by status and day
  const filteredMatchups = allMatchups.filter((matchup) => {
    // First filter by completion status
    const statusFilter =
      filter === "all"
        ? true
        : filter === "upcoming"
        ? !matchup.isCompleted
        : matchup.isCompleted;

    // Then filter by day
    const dayFilterResult =
      dayFilter === "all"
        ? true
        : dayFilter === "day1"
        ? matchup.date === day1
        : matchup.date === day2;

    return statusFilter && dayFilterResult;
  });

  // Sort matchups by date and time
  const sortedMatchups = [...filteredMatchups].sort((a, b) => {
    if (filter === "completed") {
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

  return (
    <div className="space-y-10">
      {/* Status filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
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

        {/* View toggle */}
        <div className="inline-flex p-1 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/10 shadow-inner">
          <button
            onClick={() => setViewType("cards")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-all ${
              viewType === "cards"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
            }`}
          >
            Cards View
          </button>
          <button
            onClick={() => setViewType("timeline")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-all ${
              viewType === "timeline"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
            }`}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* Day filter */}
      <div className="flex justify-center mt-4">
        <div className="inline-flex p-1 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/10 shadow-inner">
          <button
            onClick={() => setDayFilter("all")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-all ${
              dayFilter === "all"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
            }`}
          >
            All Days
          </button>
          <button
            onClick={() => setDayFilter("day1")}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              dayFilter === "day1"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
            }`}
          >
            {formatShortWeekday(day1)}, {formatShortDate(day1)}
          </button>
          <button
            onClick={() => setDayFilter("day2")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-all ${
              dayFilter === "day2"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
            }`}
          >
            {formatShortWeekday(day2)}, {formatShortDate(day2)}
          </button>
        </div>
      </div>

      {/* Conditional view rendering */}
      {viewType === "cards" ? (
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
      ) : (
        <div className="max-w-4xl mx-auto">
          <TimelineView matchups={sortedMatchups} allMatchups={allMatchups} />
        </div>
      )}

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
