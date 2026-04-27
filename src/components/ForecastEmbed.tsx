import { InfoCard } from "./InfoCard";

type ForecastEmbedProps = {
  title: string;
  description: string;
  url: string;
  displayMode?: "iframe" | "link";
  logoUrl?: string;
  linkNote?: string;
};

export function ForecastEmbed({
  title,
  description,
  url,
  displayMode = "iframe",
  logoUrl,
  linkNote,
}: ForecastEmbedProps) {
  return (
    <InfoCard
      title={title}
      actions={
        <a className="link-button" href={url} target="_blank" rel="noreferrer">
          Open source
        </a>
      }
    >
      <p className="card-copy">{description}</p>
      {displayMode === "iframe" ? (
        <>
          <div className="embed-shell">
            <iframe
              className="forecast-frame"
              loading="lazy"
              referrerPolicy="no-referrer"
              src={url}
              title={title}
            />
          </div>
          <p className="embed-note">
            If a panel stays blank, that source is likely blocking framing in the
            browser. The open button above still takes you there directly.
          </p>
        </>
      ) : (
        <div className="resource-preview">
          <div className="resource-header">
            {logoUrl ? (
              <img className="resource-logo" src={logoUrl} alt={`${title} logo`} />
            ) : null}
            <div className="resource-meta">
              <p className="resource-title">Open directly</p>
              <p className="resource-copy">
                {linkNote ??
                  "This source works more reliably as a direct link than an embedded panel."}
              </p>
            </div>
          </div>
        </div>
      )}
    </InfoCard>
  );
}
