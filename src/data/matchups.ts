import type { Matchup } from "../types/Matchup";

export const matchups: Matchup[] = [
  {
    id: "1",
    wrestler1: {
      name: "The Mountain",
    },
    wrestler2: {
      name: "Thunder Strike",
    },
    date: "2024-04-15",
    time: "19:00",
    isCompleted: false,
    matchDescription: "Championship Match",
  },
  {
    id: "2",
    wrestler1: {
      name: "Quick Silver",
    },
    wrestler2: {
      name: "Steel Shadow",
    },
    date: "2024-04-15",
    time: "20:30",
    isCompleted: true,
    winner: "Quick Silver",
    matchDescription: "Grudge Match",
  },
  {
    id: "3",
    wrestler1: {
      name: "Night Hawk",
    },
    wrestler2: {
      name: "Red Dragon",
    },
    date: "2024-04-15",
    time: "21:45",
    isCompleted: false,
    matchDescription: "Title Contender Match",
  },
  {
    id: "4",
    wrestler1: {
      name: "Storm Breaker",
    },
    wrestler2: {
      name: "Iron Will",
    },
    date: "2024-04-10",
    time: "19:30",
    isCompleted: true,
    winner: "Iron Will",
    matchDescription: "Comeback Fight",
  },
  {
    id: "5",
    wrestler1: {
      name: "Golden Phoenix",
    },
    wrestler2: {
      name: "Quick Silver",
    },
    date: "2024-04-22",
    time: "20:00",
    isCompleted: false,
    matchDescription: "Main Event",
  },
];
