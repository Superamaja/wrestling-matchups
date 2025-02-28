import { useMemo } from "react";
import type { Matchup } from "../types/Matchup";
import {
  getCurrentAndNextMatch,
  groupMatchupsByDate,
} from "../services/matchupService";
import { TimelineDateGroup } from "./TimelineDateGroup";

interface TimelineViewProps {
  matchups: Matchup[];
}

export function TimelineView({ matchups }: TimelineViewProps) {
  // Group matchups by date using utility function
  const matchupsByDate = useMemo(
    () => groupMatchupsByDate(matchups),
    [matchups]
  );

  // Get dates in order
  const dates = Object.keys(matchupsByDate).sort();

  // Get current and next matches using utility function
  const { currentMatch, nextMatch } = useMemo(
    () => getCurrentAndNextMatch(matchups),
    [matchups]
  );

  return (
    <div className="space-y-8">
      {dates.map((date) => (
        <TimelineDateGroup
          key={date}
          date={date}
          matchups={matchupsByDate[date]}
          currentMatch={currentMatch}
          nextMatch={nextMatch}
        />
      ))}
    </div>
  );
}
