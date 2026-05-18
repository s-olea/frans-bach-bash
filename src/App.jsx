import { useState, useEffect } from "react";
import Header from "./components/Header";
import Itinerary from "./components/Itinerary";
import MapView from "./components/MapView";
import Recommendations from "./components/Recommendations";
import ExpenseTracker from "./components/ExpenseTracker";
import { ROOMS } from "./data";

function Hero() {
  return (
    <div className="relative overflow-hidden py-8 sm:py-16 px-4 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-pink/6 via-purple/4 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.08)_0%,_transparent_60%)]" />
      <div className="relative z-10">
        <p className="text-purple/60 text-xs sm:text-sm font-heading tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
          Las Vegas · May 22–25, 2026
        </p>
        <div className="bulb-border inline-block px-4 sm:px-8 py-3 sm:py-5 mb-4 sm:mb-5">
          <h1 className="font-display text-5xl sm:text-8xl font-normal tracking-wide text-pink">
            Fran's Bach Bash
          </h1>
        </div>
        <p className="text-text/40 text-sm sm:text-lg mb-6 sm:mb-8">
          🎰 Fontainebleau Las Vegas
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center gap-2 sm:gap-3 max-w-md sm:max-w-none mx-auto">
          {ROOMS.map((r) => (
            <div key={r.room} className="bg-card border border-border rounded-lg px-2.5 sm:px-3 py-2 text-xs neon-box">
              <span className="text-pink/70 font-semibold">Room {r.room}</span>
              <p className="text-text/60 mt-0.5 truncate">{r.guests.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Countdown() {
  const [diff, setDiff] = useState({});

  useEffect(() => {
    const target = new Date("2026-05-22T12:00:00-07:00");
    const update = () => {
      const now = new Date();
      const ms = target - now;
      if (ms <= 0) { setDiff(null); return; }
      setDiff({
        days: Math.floor(ms / 86400000),
        hours: Math.floor((ms % 86400000) / 3600000),
        minutes: Math.floor((ms % 3600000) / 60000),
        seconds: Math.floor((ms % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!diff) return null;

  const colors = ["text-neon", "text-pink", "text-purple", "text-gold"];

  return (
    <div className="flex gap-3 sm:gap-4 justify-center py-4 sm:py-6">
      {Object.entries(diff).map(([label, val], i) => (
        <div key={label} className="text-center">
          <p className={`font-mono text-xl sm:text-4xl font-bold ${colors[i]}`}>
            {String(val).padStart(2, "0")}
          </p>
          <p className="text-text/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-0.5 sm:mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("itinerary");

  const handleNavigate = (section) => {
    setActive(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-60px 0px -40% 0px" }
    );
    ["itinerary", "map", "recommendations", "expenses"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg pb-16 sm:pb-0">
      <Header active={active} onNavigate={handleNavigate} />
      <Hero />
      <Countdown />
      <div className="border-t border-border" />
      <Itinerary />
      <div className="border-t border-border" />
      <MapView />
      <div className="border-t border-border" />
      <Recommendations />
      <div className="border-t border-border" />
      <ExpenseTracker />
      <footer className="text-center py-6 sm:py-8 text-text/20 text-xs border-t border-border">
        <p>Fran's Bach Bash 2026 · Made with 🤍 by Santi</p>
      </footer>
    </div>
  );
}
