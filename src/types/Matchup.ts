import type { Wrestler } from "./Wrestler";

export interface Matchup {
  id: string;
  wrestler1: Wrestler;
  wrestler2: Wrestler;
  date: string;
  time: string;
  isCompleted: boolean;
  winner?: string;
  matchDescription?: string;
}
