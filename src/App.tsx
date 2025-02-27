import { Header } from "./components/Header";
import { MatchupCard } from "./components/MatchupCard";
import { matchups } from "./data/matchups";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import "./App.css";

function App() {
  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matchups.map((matchup) => (
            <div key={matchup.id} className="opacity-0 animate-slide-up-fade">
              <MatchupCard matchup={matchup} />
            </div>
          ))}
        </div>
      </main>
    </BackgroundBeamsWithCollision>
  );
}

export default App;
