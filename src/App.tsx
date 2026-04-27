import { useState } from "react";
import { ForecastEmbed } from "./components/ForecastEmbed";
import { NoaaForecastCard } from "./components/NoaaForecastCard";
import { Sidebar } from "./components/Sidebar";
import { UwTimeHeightCard } from "./components/UwTimeHeightCard";
import { locations } from "./data/locations";

function formatCoordinate(value: number, positiveDirection: string, negativeDirection: string) {
  return `${Math.abs(value).toFixed(2)}° ${value >= 0 ? positiveDirection : negativeDirection}`;
}

export default function App() {
  const [selectedLocationId, setSelectedLocationId] = useState(locations[0].id);

  const selectedLocation =
    locations.find((location) => location.id === selectedLocationId) ?? locations[0];

  return (
    <div className="app-shell">
      <Sidebar
        locations={locations}
        selectedId={selectedLocation.id}
        onSelect={setSelectedLocationId}
      />

      <main className="main-content">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">{selectedLocation.region}</p>
            <h2>{selectedLocation.name}</h2>
            <p className="hero-description">{selectedLocation.description}</p>
          </div>

          <div className="hero-stats">
            <div className="stat-badge">
              <span>Elevation</span>
              <strong>
                {selectedLocation.elevationFt.toLocaleString()} ft /{" "}
                {selectedLocation.elevationM.toLocaleString()} m
              </strong>
            </div>
            <div className="stat-badge">
              <span>Coordinates</span>
              <strong>
                {formatCoordinate(selectedLocation.lat, "N", "S")} /{" "}
                {formatCoordinate(selectedLocation.lon, "E", "W")}
              </strong>
            </div>
          </div>
        </section>

        <NoaaForecastCard location={selectedLocation} />

        <section className="notes-row">
          {selectedLocation.notes.map((note) => (
            <article className="note-card" key={note}>
              <p>{note}</p>
            </article>
          ))}
        </section>

        <section className="panel-grid">
          {selectedLocation.panels.map((panel) => (
            <ForecastEmbed
              key={panel.id}
              title={panel.title}
              description={panel.description}
              url={panel.url}
            />
          ))}
        </section>

        {selectedLocation.uwTimeHeight ? (
          <UwTimeHeightCard location={selectedLocation} />
        ) : null}
      </main>
    </div>
  );
}
