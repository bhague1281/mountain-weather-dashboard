import type { WeatherLocation } from "../data/locations";

type SidebarProps = {
  locations: WeatherLocation[];
  selectedId: string;
  onSelect: (locationId: string) => void;
};

export function Sidebar({
  locations,
  selectedId,
  onSelect,
}: SidebarProps) {
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
