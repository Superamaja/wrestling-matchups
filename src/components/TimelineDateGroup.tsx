import { Matchup } from "../types/Matchup";
import { formatMediumDate } from "../utils/formatters";
import { TimelineItem } from "./TimelineItem";
import { determineMatchupStatus } from "../utils/TimelineUtils";

interface TimelineDateGroupProps {
  date: string;
  matchups: Matchup[];
  currentMatch?: Matchup | null;
  nextMatch?: Matchup | null;
}

export function TimelineDateGroup({
  date,
  matchups,
  currentMatch,
  nextMatch,
}: TimelineDateGroupProps) {
  return (
    <div className="space-y-4">
      <div className="sticky top-16 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-3 rounded-lg shadow">
        <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          {formatMediumDate(date)}
        </h2>
      </div>

      <div className="relative border-l-2 border-indigo-300 dark:border-indigo-800 pl-6 ml-4 space-y-0">
        {matchups.map((matchup) => {
          const isCurrentMatch = currentMatch?.id === matchup.id;
          const isNextMatch = nextMatch?.id === matchup.id;
          const statusType = determineMatchupStatus(
            matchup,
            currentMatch,
            nextMatch
          );

          return (
            <TimelineItem
              key={matchup.id}
              matchup={matchup}
              statusType={statusType}
              isCurrentMatch={isCurrentMatch}
              isNextMatch={isNextMatch}
            />
          );
        })}
      </div>
    </div>
  );
}
