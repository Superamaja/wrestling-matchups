// Updated App.tsx
import { Header } from "./components/Header";
import { MatchupList } from "./components/MatchupList";
import { NowPlayingWidget } from "./components/NowPlayingWidget";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import { matchups } from "./data/matchups";
import "./App.css";

function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <BackgroundBeamsWithCollision />
      </div>

      <div className="relative z-10 h-screen overflow-y-auto scroll-smooth">
        <Header />
        <main className="container mx-auto px-4 py-8 pb-24">
          {/* Now Playing Widget - only shown if there are matchups */}
          <NowPlayingWidget matchups={matchups} />

          {/* Matchup List with all our new features */}
          <MatchupList />
        </main>
      </div>
    </div>
  );
}

export default App;
