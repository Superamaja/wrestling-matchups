type FilterType = "all" | "upcoming" | "completed";

interface FilterControlsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterControls({
  filter,
  onFilterChange,
}: FilterControlsProps) {
  return (
    <div className="inline-flex p-1 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/10 shadow-inner">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-all ${
          filter === "all"
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
            : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
        }`}
      >
        All Matchups
      </button>
      <button
        onClick={() => onFilterChange("upcoming")}
        className={`px-4 py-2 text-sm font-medium transition-all ${
          filter === "upcoming"
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
            : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
        }`}
      >
        Upcoming
      </button>
      <button
        onClick={() => onFilterChange("completed")}
        className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-all ${
          filter === "completed"
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
            : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
        }`}
      >
        Completed
      </button>
    </div>
  );
}
