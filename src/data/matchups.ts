import type { Matchup } from "../types/Matchup";

export const matchups: Matchup[] = [
  {
    id: "1",
    wrestler1: {
      name: "The Mountain",
      wins: 5,
      losses: 1,
    },
    wrestler2: {
      name: "Thunder Strike",
      wins: 4,
      losses: 2,
    },
    date: "2024-03-20",
    isCompleted: false,
    matchDescription: "Championship Match",
  },
  {
    id: "2",
    wrestler1: {
      name: "Quick Silver",
      wins: 3,
      losses: 2,
    },
    wrestler2: {
      name: "Steel Shadow",
      wins: 2,
      losses: 3,
    },
    date: "2024-03-22",
    isCompleted: true,
    winner: "Quick Silver",
    matchDescription: "Grudge Match",
  },
  {
    id: "3",
    wrestler1: {
      name: "Night Hawk",
      wins: 6,
      losses: 0,
    },
    wrestler2: {
      name: "Red Dragon",
      wins: 4,
      losses: 1,
    },
    date: "2024-03-25",
    isCompleted: false,
    matchDescription: "Title Contender Match",
  },
  {
    id: "4",
    wrestler1: {
      name: "Storm Breaker",
      wins: 2,
      losses: 4,
    },
    wrestler2: {
      name: "Iron Will",
      wins: 3,
      losses: 2,
    },
    date: "2024-03-18",
    isCompleted: true,
    winner: "Iron Will",
    matchDescription: "Comeback Fight",
  },
  {
    id: "5",
    wrestler1: {
      name: "Golden Phoenix",
      wins: 7,
      losses: 1,
    },
    wrestler2: {
      name: "Silver Wolf",
      wins: 5,
      losses: 2,
    },
    date: "2024-03-30",
    isCompleted: false,
    matchDescription: "Main Event",
  },
];
