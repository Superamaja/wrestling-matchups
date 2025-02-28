import { formatShortDate, formatShortWeekday } from "../utils/formatters";

type DayFilterType = "all" | "day1" | "day2";

interface DayFilterProps {
  dayFilter: DayFilterType;
  onDayFilterChange: (dayFilter: DayFilterType) => void;
  day1: string;
  day2: string;
}

export function DayFilter({
  dayFilter,
  onDayFilterChange,
  day1,
  day2,
}: DayFilterProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex p-1 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/10 shadow-inner">
        <button
          onClick={() => onDayFilterChange("all")}
          className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-all ${
            dayFilter === "all"
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
              : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
          }`}
        >
          All Days
        </button>
        <button
          onClick={() => onDayFilterChange("day1")}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            dayFilter === "day1"
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
              : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
          }`}
        >
          {formatShortWeekday(day1)}, {formatShortDate(day1)}
        </button>
        <button
          onClick={() => onDayFilterChange("day2")}
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
  );
}
