import type { WeatherLocation } from "../data/locations";
import type { ResolvedTheme, ThemeMode } from "../theme";

type SidebarProps = {
  locations: WeatherLocation[];
  selectedId: string;
  onSelect: (locationId: string) => void;
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  onThemeChange: (themeMode: ThemeMode) => void;
};

export function Sidebar({
  locations,
  selectedId,
  onSelect,
  themeMode,
  resolvedTheme,
  onThemeChange,
}: SidebarProps) {
  const themeOptions: ThemeMode[] = ["system", "light", "dark"];

  return (
    <aside className="sidebar">
      <div className="brand-block">
        <p className="eyebrow">Cascade Weather Desk</p>
        <h1>Mountain dashboard</h1>
        <p className="sidebar-copy">
          Pick a zone, compare sources, and keep one place open for your
          mountain planning flow.
        </p>
      </div>

      <div className="sidebar-section">
        <p className="section-label">Locations</p>
        <div className="location-list">
          {locations.map((location) => {
            const isSelected = location.id === selectedId;

            return (
              <button
                key={location.id}
                className={`location-button ${isSelected ? "selected" : ""}`}
                onClick={() => onSelect(location.id)}
                type="button"
              >
                <span className="location-name">{location.shortName}</span>
                <span className="location-region">{location.region}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sidebar-section">
        <p className="section-label">Theme</p>
        <div aria-label="Color theme" className="theme-toggle" role="group">
          {themeOptions.map((themeOption) => {
            const isActive = themeMode === themeOption;
            const label =
              themeOption === "system"
                ? "Auto"
                : themeOption[0].toUpperCase() + themeOption.slice(1);

            return (
              <button
                key={themeOption}
                aria-pressed={isActive}
                className={`theme-toggle-button ${isActive ? "active" : ""}`.trim()}
                onClick={() => onThemeChange(themeOption)}
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="theme-copy">
          {themeMode === "system"
            ? `Following your browser setting: ${resolvedTheme} mode.`
            : `Using ${resolvedTheme} mode.`}
        </p>
      </div>

      <div className="sidebar-section sidebar-tip">
        <p className="section-label">Add more later</p>
        <p>
          New mountains live in a single config file, so once you send the
          next places we can extend this without redesigning the app.
        </p>
      </div>
    </aside>
  );
}
