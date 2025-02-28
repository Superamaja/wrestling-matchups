type ViewType = "cards" | "timeline";

interface ViewToggleProps {
  viewType: ViewType;
  onViewTypeChange: (viewType: ViewType) => void;
}

export function ViewToggle({ viewType, onViewTypeChange }: ViewToggleProps) {
  return (
    <div className="inline-flex p-1 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/10 shadow-inner">
      <button
        onClick={() => onViewTypeChange("cards")}
        className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-all ${
          viewType === "cards"
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
            : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
        }`}
      >
        Cards View
      </button>
      <button
        onClick={() => onViewTypeChange("timeline")}
        className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-all ${
          viewType === "timeline"
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
            : "text-neutral-600 dark:text-neutral-300 hover:bg-white/10"
        }`}
      >
        Timeline
      </button>
    </div>
  );
}
