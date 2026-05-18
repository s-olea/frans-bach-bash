import { useState } from "react";
import { ITINERARY } from "../data";

function EventCard({ event, dayColor }) {
  return (
    <div
      className={`group relative bg-card rounded-xl p-3.5 sm:p-5 transition-all active:scale-[0.99] border ${
        event.optional
          ? "border-dashed border-border/60"
          : "border-border"
      }`}
    >
      {event.optional && (
        <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-text/40 bg-text/5 px-1.5 sm:px-2 py-0.5 rounded-full">
          Optional
        </span>
      )}
      <div className="flex items-start gap-2.5 sm:gap-3">
        <span className="text-xl sm:text-2xl mt-0.5 shrink-0">{event.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span
              className="text-[11px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 rounded-full"
              style={{ backgroundColor: dayColor + "20", color: dayColor }}
            >
              {event.time}
            </span>
            {event.reservationHolder && (
              <span className="text-[9px] sm:text-[10px] text-pink/70 bg-gold/10 px-1.5 sm:px-2 py-0.5 rounded-full">
                Res: {event.reservationHolder}
              </span>
            )}
          </div>
          <h3 className="text-text font-semibold mt-1.5 text-[15px] sm:text-base leading-snug">
            {event.name}
          </h3>
          {event.venue && (
            <p className="text-text/50 text-xs sm:text-sm mt-0.5">{event.venue}</p>
          )}
          {event.address && (
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon/70 text-[11px] sm:text-xs hover:text-neon transition-colors mt-0.5 inline-block py-0.5"
            >
              📍 {event.address} ↗
            </a>
          )}
          <p className="text-text/60 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">
            {event.notes}
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 flex-wrap">
            <span className="text-[11px] sm:text-xs text-text/40 bg-text/5 px-1.5 sm:px-2 py-0.5 rounded-full">
              👥 {event.who}
            </span>
            {event.departures?.map((name) => (
              <span
                key={name}
                className="text-[11px] sm:text-xs text-red/80 bg-red/10 px-1.5 sm:px-2 py-0.5 rounded-full"
              >
                🛫 {name} departs
              </span>
            ))}
            {event.reservationHolder && !event.reservationLink && (
              <span className="text-[11px] sm:text-xs text-text/30 bg-text/5 px-1.5 sm:px-2 py-0.5 rounded-full">
                🔗 Link pending
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Itinerary() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="itinerary" className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h2 className="font-display text-3xl sm:text-5xl text-center mb-4 sm:mb-6">
        Itinerary
      </h2>
      {/* Horizontally scrollable day tabs on mobile */}
      <div className="flex gap-2 justify-start sm:justify-center mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 no-scrollbar">
        {ITINERARY.map((day, i) => (
          <button
            key={day.day}
            onClick={() => setActiveDay(i)}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              activeDay === i
                ? "text-bg shadow-lg"
                : "text-text/60 bg-card border border-border"
            }`}
            style={
              activeDay === i
                ? { backgroundColor: day.color }
                : {}
            }
          >
            {day.day}
            <span className="ml-1.5 text-xs opacity-70">{day.date}</span>
          </button>
        ))}
      </div>
      <div className="space-y-2.5 sm:space-y-3">
        {ITINERARY[activeDay].events.map((event, i) => (
          <EventCard
            key={i}
            event={event}
            dayColor={ITINERARY[activeDay].color}
          />
        ))}
      </div>
    </section>
  );
}
