import { useState } from "react";
import type { Matchup } from "../data/matchups";

interface Props {
  matchup: Matchup;
}

export function MatchupCard({ matchup }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <h3 className="text-lg font-bold">{matchup.wrestler1.name}</h3>
            <p className="text-sm text-gray-600">
              {matchup.wrestler1.wins}W - {matchup.wrestler1.losses}L
            </p>
          </div>
          <div className="flex-shrink-0 px-4">
            <span className="text-2xl font-bold text-red-500">VS</span>
          </div>
          <div className="flex-1 text-center">
            <h3 className="text-lg font-bold">{matchup.wrestler2.name}</h3>
            <p className="text-sm text-gray-600">
              {matchup.wrestler2.wins}W - {matchup.wrestler2.losses}L
            </p>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-70"
          }`}
        >
          <p className="text-sm text-center text-gray-700">
            {new Date(matchup.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {matchup.matchDescription && (
            <p className="mt-2 text-sm text-center text-blue-600 font-semibold">
              {matchup.matchDescription}
            </p>
          )}
        </div>

        {matchup.isCompleted && matchup.winner && (
          <div className="mt-4 text-center">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Winner: {matchup.winner}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
