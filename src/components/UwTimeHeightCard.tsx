import { useEffect, useState } from "react";
import type { WeatherLocation } from "../data/locations";
import { InfoCard } from "./InfoCard";

type UwState =
  | { status: "loading" }
  | { status: "ready"; imageUrl: string; pageUrl: string; runTag: string }
  | { status: "error"; message: string };

type UwTimeHeightCardProps = {
  location: WeatherLocation;
};

function formatRunTag(runTag: string) {
  const year = runTag.slice(0, 4);
  const month = runTag.slice(4, 6);
  const day = runTag.slice(6, 8);
  const hour = runTag.slice(8, 10);

  return `${year}-${month}-${day} ${hour}Z`;
}

function buildRunCandidates() {
  const now = new Date();
  const alignedDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      Math.floor(now.getUTCHours() / 6) * 6,
      0,
      0,
      0,
    ),
  );

  const candidates: string[] = [];

  for (let index = 0; index < 12; index += 1) {
    const candidate = new Date(alignedDate);
    candidate.setUTCHours(alignedDate.getUTCHours() - index * 6);

    const year = candidate.getUTCFullYear();
    const month = String(candidate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(candidate.getUTCDate()).padStart(2, "0");
    const hour = String(candidate.getUTCHours()).padStart(2, "0");

    candidates.push(`${year}${month}${day}${hour}`);
  }

  return candidates;
}

function loadImage(imageUrl: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Could not load ${imageUrl}`));
    image.src = imageUrl;
  });
}

export function UwTimeHeightCard({ location }: UwTimeHeightCardProps) {
  const uwConfig = location.uwTimeHeight;
  const [uwState, setUwState] = useState<UwState>({ status: "loading" });

  useEffect(() => {
    if (!uwConfig) {
      setUwState({
        status: "error",
        message: "This location does not have a UW time-height source configured.",
      });
      return;
    }

    const activeConfig = uwConfig;
    let cancelled = false;

    async function findLatestImage() {
      setUwState({ status: "loading" });

      const candidates = buildRunCandidates();

      for (const runTag of candidates) {
        const imageUrl = activeConfig.imagePathTemplate.replace("RUN_TAG", runTag);
        const pageUrl = activeConfig.pagePathTemplate.replace("RUN_TAG", runTag);

        try {
          await loadImage(imageUrl);

          if (!cancelled) {
            setUwState({
              status: "ready",
              imageUrl,
              pageUrl,
              runTag,
            });
          }
          return;
        } catch {
          continue;
        }
      }

      if (!cancelled) {
        setUwState({
          status: "error",
          message:
            "No recent UW time-height image could be reached. The upstream run may be late or the file path may need adjustment.",
        });
      }
    }

    void findLatestImage();

    return () => {
      cancelled = true;
    };
  }, [location.id, uwConfig]);

  if (!uwConfig) {
    return null;
  }

  return (
    <InfoCard
      title="UW time-height"
      kicker="Model cross-section"
      className="uw-card"
      actions={
        uwState.status === "ready" ? (
          <a
            className="link-button"
            href={uwState.pageUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open UW page
          </a>
        ) : null
      }
    >
      <p className="card-copy">
        Nearest reference: {uwConfig.stationName}. This is best used as a
        timing and structure tool alongside the NOAA and summit forecasts.
      </p>

      {uwState.status === "loading" ? (
        <div className="status-block">
          <p>Looking for the latest available UW model image...</p>
        </div>
      ) : null}

      {uwState.status === "error" ? (
        <div className="status-block error">
          <p>{uwState.message}</p>
        </div>
      ) : null}

      {uwState.status === "ready" ? (
        <>
          <div className="uw-image-shell">
            <img
              className="uw-image"
              src={uwState.imageUrl}
              alt={`UW time-height plot for ${uwConfig.stationName}`}
            />
            <div className="uw-overlay top-left">
              <span className="overlay-label">Latest run</span>
              <strong>{formatRunTag(uwState.runTag)}</strong>
            </div>
            <div className="uw-overlay top-right">
              <span className="overlay-label">Nearest point</span>
              <strong>{uwConfig.stationName}</strong>
            </div>
            <div className="uw-overlay bottom-left wide">
              <span className="overlay-label">Quick read</span>
              <p>
                Left to right is time. Vertical structure shows how wind,
                temperature, and moisture change with height. Use this to spot
                stronger-wind windows and freezing-level shifts.
              </p>
            </div>
          </div>

          <div className="guide-grid">
            {uwConfig.guideLines.map((guideLine) => (
              <article className="guide-card" key={guideLine}>
                <p>{guideLine}</p>
              </article>
            ))}
          </div>
        </>
      ) : null}
    </InfoCard>
  );
}
