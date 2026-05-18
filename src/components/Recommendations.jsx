import { useState } from "react";
import { RECOMMENDATIONS } from "../data";

const CATEGORIES = ["All", "Dinner", "Bar & Club", "Gentlemen's Club"];

function CostBadge({ cost }) {
  return (
    <span className="text-gold font-mono text-xs sm:text-sm">
      {"$".repeat(cost)}
      <span className="text-text/20">{"$".repeat(4 - cost)}</span>
    </span>
  );
}

function Stars({ rating }) {
  return (
    <span className="text-xs sm:text-sm">
      <span className="text-gold">{"★".repeat(Math.floor(rating))}</span>
      {rating % 1 >= 0.5 && <span className="text-gold/50">½</span>}
      <span className="text-text/40 ml-1 text-[10px] sm:text-xs">{rating}</span>
    </span>
  );
}

export default function Recommendations() {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = RECOMMENDATIONS
    .filter((r) => category === "All" || r.category === category)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "cost-asc") return a.cost - b.cost;
      if (sortBy === "cost-desc") return b.cost - a.cost;
      return 0;
    });

  return (
    <section id="recommendations" className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h2 className="font-display text-3xl sm:text-5xl text-gold text-center mb-4 sm:mb-6">
        Recommendations
      </h2>
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center mb-4 sm:mb-6">
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all shrink-0 ${
                category === cat
                  ? "bg-pink/15 text-pink border border-pink/30"
                  : "text-text/50 bg-card border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-text/70 focus:outline-none focus:border-gold/40"
        >
          <option value="rating">Sort: Rating ↓</option>
          <option value="cost-asc">Sort: Cost ↑</option>
          <option value="cost-desc">Sort: Cost ↓</option>
        </select>
      </div>
      <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
        {filtered.map((rec) => (
          <a
            key={rec.name}
            href={rec.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-xl p-3.5 sm:p-4 active:scale-[0.98] transition-all group block"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-text font-semibold text-[15px] sm:text-base group-active:text-neon transition-colors truncate">
                  {rec.name}
                </h3>
                <span className="text-text/40 text-[11px] sm:text-xs">{rec.category}</span>
              </div>
              <div className="flex flex-col items-end gap-0.5 sm:gap-1 shrink-0">
                <CostBadge cost={rec.cost} />
                <Stars rating={rec.rating} />
              </div>
            </div>
            <p className="text-text/60 text-xs sm:text-sm mt-1.5 sm:mt-2">{rec.notes}</p>
            <span className="text-neon/70 text-[11px] sm:text-xs mt-1.5 sm:mt-2 inline-block">
              Google Maps ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
