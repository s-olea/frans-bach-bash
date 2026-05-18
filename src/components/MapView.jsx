import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { VENUES, DAY_COLORS } from "../data";

function createIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:#ffffff;border:2px solid ${color};
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 0 10px ${color}44;
      font-size:14px;color:${color};font-weight:bold;
    ">📍</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

const DAYS = ["All", "Friday", "Saturday", "Sunday", "Monday"];

export default function MapView() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? VENUES
    : VENUES.filter((v) => v.day === filter || v.day === "all");

  const routePoints = filtered
    .filter((v) => v.day !== "all")
    .map((v) => [v.lat, v.lng]);

  return (
    <section id="map" className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h2 className="font-display text-3xl sm:text-5xl text-purple text-center mb-4 sm:mb-6">
        Map
      </h2>
      <div className="flex gap-1.5 sm:gap-2 justify-center mb-3 sm:mb-4 overflow-x-auto no-scrollbar">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setFilter(day)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
              filter === day
                ? "bg-pink/15 text-pink border border-pink/30"
                : "text-text/50 bg-card border border-border"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden border border-border h-[350px] sm:h-[500px]">
        <MapContainer
          center={[36.1250, -115.1700]}
          zoom={13}
          className="h-full w-full"
          scrollWheelZoom={true}
          dragging={true}
          tap={true}
          touchZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png"
          />
          {filtered.map((venue, i) => (
            <Marker
              key={i}
              position={[venue.lat, venue.lng]}
              icon={createIcon(DAY_COLORS[venue.day] || "#a855f7")}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold text-pink text-base mb-1">{venue.name}</p>
                  <p className="text-text/70 mb-1">{venue.category} · {venue.day}</p>
                  <p className="text-text/50 text-xs mb-2">{venue.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(venue.address || venue.name + " Las Vegas")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon text-xs py-1 inline-block"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
          {routePoints.length > 1 && (
            <Polyline
              positions={routePoints}
              pathOptions={{
                color: DAY_COLORS[filter] || "#a855f7",
                weight: 2,
                dashArray: "8 6",
                opacity: 0.5,
              }}
            />
          )}
        </MapContainer>
      </div>
      <div className="flex gap-3 sm:gap-4 justify-center mt-3 sm:mt-4 flex-wrap text-[11px] sm:text-xs text-text/50">
        {Object.entries(DAY_COLORS).filter(([k]) => k !== "all" && k !== "Recommendation").map(([day, color]) => (
          <span key={day} className="flex items-center gap-1.5">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ backgroundColor: color }} />
            {day}
          </span>
        ))}
      </div>
    </section>
  );
}
