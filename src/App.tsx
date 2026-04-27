import { useEffect, useState } from "react";
import { ForecastEmbed } from "./components/ForecastEmbed";
import { Sidebar } from "./components/Sidebar";
import { UwTimeHeightCard } from "./components/UwTimeHeightCard";
import { locations } from "./data/locations";
import {
  applyTheme,
  getStoredThemeMode,
  getSystemTheme,
  persistThemeMode,
  type ResolvedTheme,
  type ThemeMode,
} from "./theme";

export default function App() {
  const [selectedLocationId, setSelectedLocationId] = useState(locations[0].id);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getStoredThemeMode());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());

  const selectedLocation =
    locations.find((location) => location.id === selectedLocationId) ?? locations[0];
  const resolvedTheme = themeMode === "system" ? systemTheme : themeMode;
  const panelGroups = selectedLocation.panels.reduce<
    Array<typeof selectedLocation.panels>
  >((groups, panel) => {
    const lastGroup = groups[groups.length - 1];
    const firstGroupPanel = lastGroup?.[0];

    if (
      panel.cellGroup &&
      lastGroup &&
      firstGroupPanel?.cellGroup === panel.cellGroup
    ) {
      lastGroup.push(panel);
      return groups;
    }

    groups.push([panel]);
    return groups;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    persistThemeMode(themeMode);
    applyTheme(themeMode, resolvedTheme);
  }, [resolvedTheme, themeMode]);

  return (
    <div className="app-shell">
      <Sidebar
        locations={locations}
        onThemeChange={setThemeMode}
        selectedId={selectedLocation.id}
        onSelect={setSelectedLocationId}
        resolvedTheme={resolvedTheme}
        themeMode={themeMode}
      />

      <main className="main-content">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">{selectedLocation.region}</p>
            <h2>{selectedLocation.name}</h2>
            <div className="hero-nearby">
              <p className="section-label">Nearby Peaks</p>
              <div className="hero-nearby-list">
                {selectedLocation.nearbyPeaks.map((nearbyPeak) => (
                  <p className="hero-nearby-item" key={nearbyPeak}>
                    {nearbyPeak}
                  </p>
                ))}
              </div>
            </div>
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
              <span>Map & beta</span>
              <div className="button-group">
                <a
                  className="stat-link"
                  href={selectedLocation.caltopoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="stat-link-logo"
                    src={selectedLocation.caltopoLogoUrl}
                    alt="CalTopo logo"
                  />
                  Open Caltopo
                </a>
                <a
                  className="stat-link"
                  href={selectedLocation.mountainProjectUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="stat-link-logo"
                    src={selectedLocation.mountainProjectLogoUrl}
                    alt="Mountain Project logo"
                  />
                  Open Mountain Project
                </a>
              </div>
            </div>
          </div>
        </section>

        <ForecastEmbed
          title="NOAA Point Forecast Page"
          description="The standard NOAA point click page with text forecast and nearby conditions."
          displayMode="iframe"
          url={selectedLocation.noaaPointUrl}
        />

        {selectedLocation.notes.length > 0 ? (
          <section className="notes-row">
            {selectedLocation.notes.map((note) => (
              <article className="note-card" key={note}>
                <p>{note}</p>
              </article>
            ))}
          </section>
        ) : null}

        <section className="panel-grid">
          {panelGroups.map((panelGroup) => (
            <div
              className={`panel-cell ${panelGroup.length > 1 ? "panel-stack" : ""}`.trim()}
              key={panelGroup.map((panel) => panel.id).join(":")}
            >
              {panelGroup.map((panel) => (
                <ForecastEmbed
                  key={panel.id}
                  title={panel.title}
                  description={panel.description}
                  displayMode={panel.displayMode}
                  logoUrl={panel.logoUrl}
                  linkNote={panel.linkNote}
                  url={panel.url}
                />
              ))}
            </div>
          ))}
        </section>

        {selectedLocation.uwTimeHeight ? (
          <UwTimeHeightCard location={selectedLocation} />
        ) : null}
      </main>
    </div>
  );
}
