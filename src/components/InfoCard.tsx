import type { PropsWithChildren, ReactNode } from "react";

type InfoCardProps = PropsWithChildren<{
  title: string;
  kicker?: string;
  actions?: ReactNode;
  className?: string;
}>;

export function InfoCard({
  title,
  kicker,
  actions,
  className = "",
  children,
}: InfoCardProps) {
  return (
    <section className={`info-card ${className}`.trim()}>
      <header className="card-header">
        <div>
          {kicker ? <p className="card-kicker">{kicker}</p> : null}
          <h2>{title}</h2>
        </div>
        {actions ? <div className="card-actions">{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}
