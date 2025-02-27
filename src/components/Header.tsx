export function Header() {
  return (
    <header className="relative z-10">
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Wrestling Matchups
        </h1>
        <p className="text-xl text-center text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto opacity-0 animate-slide-up">
          The ultimate showdown between Alpha Science Male members
        </p>
      </div>
    </header>
  );
}
