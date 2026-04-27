import { useEffect, useState } from "react";
import type { WeatherLocation } from "../data/locations";
import { InfoCard } from "./InfoCard";

type PointResponse = {
  properties: {
    forecast: string;
    forecastHourly: string;
    forecastOffice: string;
    gridId: string;
    gridX: number;
    gridY: number;
    relativeLocation?: {
      properties: {
        city: string;
        state: string;
      };
    };
  };
};

type ForecastPeriod = {
  number: number;
  name: string;
  startTime: string;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  shortForecast: string;
  detailedForecast: string;
  icon?: string;
};

type ForecastResponse = {
  properties: {
    updated: string;
    periods: ForecastPeriod[];
  };
};

type ForecastState =
  | { status: "loading" }
  | {
      status: "ready";
      point: PointResponse["properties"];
      forecast: ForecastResponse["properties"];
      hourly: ForecastResponse["properties"];
    }
  | { status: "error"; message: string };

type NoaaForecastCardProps = {
  location: WeatherLocation;
};

function formatPeriodTime(isoTimestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
  }).format(new Date(isoTimestamp));
}

function formatUpdated(isoTimestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoTimestamp));
}

export function NoaaForecastCard({ location }: NoaaForecastCardProps) {
  const [forecastState, setForecastState] = useState<ForecastState>({
    status: "loading",
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadForecast() {
      setForecastState({ status: "loading" });

      try {
        const pointResponse = await fetch(location.noaaApiPoint, {
          headers: {
            Accept: "application/geo+json",
          },
          signal: abortController.signal,
        });

        if (!pointResponse.ok) {
          throw new Error(`NOAA points request failed with ${pointResponse.status}`);
        }

        const pointData = (await pointResponse.json()) as PointResponse;
        const [forecastResponse, hourlyResponse] = await Promise.all([
          fetch(pointData.properties.forecast, {
            headers: { Accept: "application/geo+json" },
            signal: abortController.signal,
          }),
          fetch(pointData.properties.forecastHourly, {
            headers: { Accept: "application/geo+json" },
            signal: abortController.signal,
          }),
        ]);

        if (!forecastResponse.ok || !hourlyResponse.ok) {
          throw new Error("NOAA forecast endpoint did not return a usable response.");
        }

        const forecastData = (await forecastResponse.json()) as ForecastResponse;
        const hourlyData = (await hourlyResponse.json()) as ForecastResponse;

        setForecastState({
          status: "ready",
          point: pointData.properties,
          forecast: forecastData.properties,
          hourly: hourlyData.properties,
        });
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "NOAA data could not be loaded from the browser.";

        setForecastState({ status: "error", message });
      }
    }

    void loadForecast();

    return () => {
      abortController.abort();
    };
  }, [location.id, location.noaaApiPoint]);

  return (
    <InfoCard
      title="NOAA quick read"
      kicker="Live API view"
      className="noaa-card"
      actions={
        <div className="button-group">
          <a
            className="link-button"
            href={location.noaaPointUrl}
            target="_blank"
            rel="noreferrer"
          >
            Point page
          </a>
          <a
            className="link-button ghost"
            href={location.noaaGraphicalUrl}
            target="_blank"
            rel="noreferrer"
          >
            Graphical page
          </a>
        </div>
      }
    >
      {forecastState.status === "loading" ? (
        <div className="status-block">
          <p>Loading the latest NOAA forecast data for this point...</p>
        </div>
      ) : null}

      {forecastState.status === "error" ? (
        <div className="status-block error">
          <p>{forecastState.message}</p>
          <p>
            The direct NOAA links still work, even if the API call is blocked or
            rate-limited in the browser.
          </p>
        </div>
      ) : null}

      {forecastState.status === "ready" ? (
        <>
          <div className="summary-grid">
            <div className="summary-pill">
              <span className="summary-label">Relative location</span>
              <strong>
                {forecastState.point.relativeLocation?.properties.city},{" "}
                {forecastState.point.relativeLocation?.properties.state}
              </strong>
            </div>
            <div className="summary-pill">
              <span className="summary-label">Grid point</span>
              <strong>
                {forecastState.point.gridId} {forecastState.point.gridX},
                {forecastState.point.gridY}
              </strong>
            </div>
            <div className="summary-pill">
              <span className="summary-label">Updated</span>
              <strong>{formatUpdated(forecastState.forecast.updated)}</strong>
            </div>
          </div>

          <div className="forecast-strip">
            {forecastState.forecast.periods.slice(0, 5).map((period) => (
              <article className="forecast-chip" key={period.number}>
                <p className="forecast-chip-name">{period.name}</p>
                <div className="forecast-chip-temp">
                  <span>{period.temperature}</span>
                  <small>{period.temperatureUnit}</small>
                </div>
                <p className="forecast-chip-copy">{period.shortForecast}</p>
                <p className="forecast-chip-wind">
                  {period.windDirection} {period.windSpeed}
                </p>
              </article>
            ))}
          </div>

          <div className="hourly-block">
            <h3>Next few hours</h3>
            <div className="hourly-strip">
              {forecastState.hourly.periods.slice(0, 6).map((period) => (
                <div className="hourly-chip" key={period.number}>
                  <span>{formatPeriodTime(period.startTime)}</span>
                  <strong>
                    {period.temperature}
                    {period.temperatureUnit}
                  </strong>
                  <small>
                    {period.windDirection} {period.windSpeed}
                  </small>
                </div>
              ))}
            </div>
          </div>

          <div className="lead-forecast">
            <h3>{forecastState.forecast.periods[0]?.name}</h3>
            <p>{forecastState.forecast.periods[0]?.detailedForecast}</p>
          </div>
        </>
      ) : null}
    </InfoCard>
  );
}
