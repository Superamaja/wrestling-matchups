import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-center animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 pb-2">
            Wrestling Matchups
          </h1>

          <div
            className={`transition-all duration-500 ${
              scrolled ? "h-0 opacity-0" : "h-auto opacity-100"
            }`}
          >
            <p className="mt-2 text-lg text-center text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto animate-slide-up">
              The ultimate showdown between Alpha Science Male members
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
