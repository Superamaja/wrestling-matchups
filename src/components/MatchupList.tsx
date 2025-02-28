import { useState } from "react";
import { MatchupCard } from "./MatchupCard";
import { TimelineView } from "./TimelineView";
import { matchups as allMatchups } from "../data/matchups";
import { filterMatchups, sortMatchups } from "../services/matchupService";
import { FilterControls } from "./FilterControls";
import { ViewToggle } from "./ViewToggle";
import { DayFilter } from "./DayFilter";

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

  // Use matchup service to filter matchups
  const filteredMatchups = filterMatchups(
    allMatchups,
    filter,
    dayFilter === "all" ? undefined : dayFilter === "day1" ? day1 : day2
  );

  // Use centralized sorting utility
  const sortedMatchups = sortMatchups(filteredMatchups, filter === "completed");

  return (
    <div className="space-y-10">
      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <FilterControls filter={filter} onFilterChange={setFilter} />
        <ViewToggle viewType={viewType} onViewTypeChange={setViewType} />
      </div>

      {/* Day filter */}
      <div className="flex justify-center mt-4">
        <DayFilter
          dayFilter={dayFilter}
          onDayFilterChange={setDayFilter}
          day1={day1}
          day2={day2}
        />
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
          <TimelineView matchups={sortedMatchups} />
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
