const NAV_ITEMS = [
  { key: "itinerary", label: "Itinerary", icon: "📋" },
  { key: "map", label: "Map", icon: "🗺️" },
  { key: "recommendations", label: "Recs", icon: "⭐" },
  { key: "expenses", label: "Expenses", icon: "💰" },
];

export default function Header({ active, onNavigate }) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center gap-4 sm:gap-6">
          <h1
            className="font-display text-xl sm:text-2xl cursor-pointer whitespace-nowrap"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Fran's Bach Bash 🎰
          </h1>
          <span className="hidden sm:block text-purple/50 text-sm font-heading tracking-widest uppercase">
            Las Vegas · May 22–25
          </span>
          <nav className="hidden sm:flex gap-2 ml-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  active === item.key
                    ? "bg-pink/10 text-pink border border-pink/25"
                    : "text-text/50 hover:text-text hover:bg-purple/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-md border-t border-border safe-bottom">
        <div className="flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 pt-2.5 transition-all ${
                active === item.key
                  ? "text-pink"
                  : "text-text/35 active:text-text/60"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
