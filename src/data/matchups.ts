export interface Wrestler {
  name: string;
  wins: number;
  losses: number;
  imageUrl?: string;
}

export interface Matchup {
  id: string;
  wrestler1: Wrestler;
  wrestler2: Wrestler;
  date: string;
  isCompleted: boolean;
  winner?: string;
  matchDescription?: string;
}

export const matchups: Matchup[] = [
  {
    id: "1",
    wrestler1: {
      name: "John Doe",
      wins: 2,
      losses: 1,
    },
    wrestler2: {
      name: "Mike Smith",
      wins: 1,
      losses: 2,
    },
    date: "2024-03-20",
    isCompleted: false,
    matchDescription: "Championship Match",
  },
  // Add more matchups here
];
