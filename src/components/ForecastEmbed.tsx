import { InfoCard } from "./InfoCard";

type ForecastEmbedProps = {
  title: string;
  description: string;
  url: string;
};

export function ForecastEmbed({
  title,
  description,
  url,
}: ForecastEmbedProps) {
  return (
    <InfoCard
      title={title}
      kicker="External source"
      actions={
        <a className="link-button" href={url} target="_blank" rel="noreferrer">
          Open source
        </a>
      }
    >
      <p className="card-copy">{description}</p>
      <div className="embed-shell">
        <iframe className="forecast-frame" loading="lazy" src={url} title={title} />
      </div>
      <p className="embed-note">
        If this panel stays blank, the source is blocking embeds in your
        browser. Use the open button above.
      </p>
    </InfoCard>
  );
}
