export interface Matchup {
  id: string;
  wrestler1: string;
  wrestler2: string;
  date: string;
  time: string;
  isCompleted: boolean;
  winner?: string;
  matchDescription?: string;
}
