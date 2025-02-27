import { useState } from "react";
import type { Matchup } from "../data/matchups";

interface Props {
  matchup: Matchup;
}

export function MatchupCard({ matchup }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative backdrop-blur-sm bg-white/50 dark:bg-neutral-950/50 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 border border-neutral-200/50 dark:border-neutral-800/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: "0 0 1rem rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
              {matchup.wrestler1.name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {matchup.wrestler1.wins}W - {matchup.wrestler1.losses}L
            </p>
          </div>
          <div className="flex-shrink-0 px-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              VS
            </span>
          </div>
          <div className="flex-1 text-center">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
              {matchup.wrestler2.name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {matchup.wrestler2.wins}W - {matchup.wrestler2.losses}L
            </p>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-70"
          }`}
        >
          <p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
            {new Date(matchup.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {matchup.matchDescription && (
            <p className="mt-2 text-sm text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {matchup.matchDescription}
            </p>
          )}
        </div>

        {matchup.isCompleted && matchup.winner && (
          <div className="mt-4 text-center">
            <span className="inline-block px-3 py-1 rounded-full text-sm bg-gradient-to-r from-indigo-600/10 to-purple-600/10 text-indigo-600 dark:text-indigo-400 font-medium">
              Winner: {matchup.winner}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
