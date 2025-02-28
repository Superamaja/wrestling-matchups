# Wrestling Matchups

A React web application for tracking wrestling events among friends with interactive UI and real-time match tracking.

<!-- ![Wrestling Matchups Screenshot](public/screenshot.mp4 "Wrestling Matchups App") -->

## Overview

Wrestling Matchups is an interactive web application built with React and TypeScript that allows you to track and showcase wrestling matchups between friends. The app features a sleek, modern interface with animations, and provides multiple view modes to display matches in an engaging way.

## Features

- **Real-time Match Tracking**: See which matches are currently live and what's coming up next
- **Multiple View Modes**:
  - Cards View: Displays matches in a grid of cards with detailed information
  - Timeline View: Shows matches in a chronological timeline format
- **Filtering Options**:
  - Filter by status (all, upcoming, completed)
  - Filter by day to focus on specific event dates
- **Wrestler Stats**: View win/loss records for each wrestler
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Glass morphism effects, animations, and interactive elements
- **Dark Mode Support**: Automatically adapts to system preferences

## Tech Stack

- [React 19](https://react.dev/) - Latest version of React
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [clsx](https://github.com/lukeed/clsx) and [tailwind-merge](https://github.com/dcastil/tailwind-merge) - For conditional class composition

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- pnpm (recommended) or npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Superamaja/wrestling-matchups.git
   cd wrestling-matchups
   ```

2. Install dependencies

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Customization

### Adding New Wrestlers

To add new wrestlers, edit the `src/data/matchups.ts` file and add new entries to the matchups array with their details.

## Deployment

To build the application for production:

```bash
pnpm build
# or
npm run build
```

This will generate a `dist` directory with optimized static files that can be deployed to any static hosting provider like Netlify, Vercel, GitHub Pages, etc.

## Credits

- Project created by Connor Lin
- Wolf logo from Microsoft 3D Fluent emojis

## License

This project is licensed under the MIT License - see the LICENSE file for details.
