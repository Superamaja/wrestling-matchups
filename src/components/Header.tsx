export function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4 animate-fade-in">
          Wrestling Matchups
        </h1>
        <p className="text-xl text-center text-red-100 max-w-2xl mx-auto opacity-0 animate-slide-up">
          Experience the ultimate showdown between friends
        </p>
      </div>
    </header>
  );
}
