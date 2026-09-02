import type { Assessment } from "@/content/site";
import type { Payload } from "./script";

const ASSESSMENT_STYLES: Record<Assessment, string> = {
  "Very strong": "text-green border-green/40 bg-green/10",
  Strong: "text-cyan border-cyan/40 bg-cyan/10",
  "Gap to validate": "text-amber border-amber/40 bg-amber/10",
};

function Frame({
  label,
  children,
  tone = "neutral",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "neutral" | "amber" | "cyan";
}) {
  const border = {
    neutral: "border-line",
    amber: "border-amber/30",
    cyan: "border-cyan/30",
  }[tone];
  const labelColor = {
    neutral: "text-text-low",
    amber: "text-amber",
    cyan: "text-cyan",
  }[tone];

  return (
    <div className={`rounded-lg border ${border} bg-ink/60`}>
      <p
        className={`border-b ${border} px-4 py-2 font-mono text-[0.62rem] uppercase tracking-wider ${labelColor}`}
      >
        {label}
      </p>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function PayloadView({ payload }: { payload: Payload }) {
  switch (payload.kind) {
    case "request":
      return (
        <Frame label="Requisition intake" tone="cyan">
          <p className="font-mono text-sm leading-relaxed text-text-hi">
            <span aria-hidden className="mr-2 text-cyan">
              &gt;
            </span>
            {payload.text}
          </p>
        </Frame>
      );

    case "structured":
      return (
        <Frame label="Structured requirements">
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {payload.fields.map((field) => (
              <div key={field.label} className="flex flex-col gap-0.5">
                <dt className="font-mono text-[0.62rem] uppercase tracking-wider text-text-low">
                  {field.label}
                </dt>
                <dd className="text-sm text-text-hi">{field.value}</dd>
              </div>
            ))}
          </dl>
        </Frame>
      );

    case "knowledge":
      return (
        <Frame label="Retrieved — permission-scoped">
          <ul className="space-y-2.5">
            {payload.docs.map((doc) => (
              <li key={doc.name} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 gate-node size-2 shrink-0 bg-indigo"
                />
                <span>
                  <span className="block text-sm text-text-hi">{doc.name}</span>
                  <span className="block font-mono text-[0.62rem] text-text-low">
                    {doc.meta}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Frame>
      );

    case "jd":
      return (
        <Frame label="JD draft v1">
          <p className="text-sm font-semibold text-text-hi">{payload.heading}</p>
          <ul className="mt-3 space-y-2">
            {payload.lines.map((line) => (
              <li
                key={line}
                className="flex gap-2.5 text-sm leading-relaxed text-text-mid"
              >
                <span aria-hidden className="text-line">
                  —
                </span>
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-4 inline-flex items-center gap-2 rounded border border-dashed border-line px-2.5 py-1.5 font-mono text-[0.62rem] text-text-low">
            <span aria-hidden className="text-cyan">
              ⌗
            </span>
            {payload.restriction}
          </p>
        </Frame>
      );

    case "policy":
      return (
        <Frame label="Policy evaluation" tone="amber">
          <ul className="space-y-3">
            {payload.checks.map((check) => {
              const blocked = check.result === "block";
              return (
                <li key={check.rule} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 font-mono text-[0.58rem] tracking-wider ${
                      blocked
                        ? "bg-amber/15 text-amber"
                        : "bg-green/10 text-green"
                    }`}
                  >
                    {blocked ? "BLOCK" : "PASS"}
                  </span>
                  <span>
                    <span className="block font-mono text-[0.68rem] text-text-hi">
                      {check.rule}
                    </span>
                    <span
                      className={`mt-1 block text-sm leading-relaxed ${blocked ? "text-amber" : "text-text-mid"}`}
                    >
                      {check.detail}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Frame>
      );

    case "revision":
      return (
        <Frame label="Revision loop" tone="amber">
          <p className="font-mono text-sm leading-relaxed text-text-hi">
            <span aria-hidden className="mr-2 text-amber">
              &gt;
            </span>
            {payload.comment}
          </p>
          <ul className="mt-4 space-y-2 border-t border-line pt-4">
            {payload.changes.map((change) => (
              <li
                key={change}
                className="flex gap-2.5 font-mono text-[0.68rem] text-text-mid"
              >
                <span aria-hidden className="text-cyan">
                  +
                </span>
                {change}
              </li>
            ))}
          </ul>
        </Frame>
      );

    case "posting":
      return (
        <Frame label="Distribution">
          <ul className="space-y-2.5">
            {payload.channels.map((channel) => (
              <li
                key={channel.name}
                className="flex items-baseline justify-between gap-4 border-b border-line-soft pb-2.5 last:border-0 last:pb-0"
              >
                <span className="text-sm text-text-mid">{channel.name}</span>
                <span className="font-mono text-[0.68rem] text-cyan">
                  {channel.ref}
                </span>
              </li>
            ))}
          </ul>
        </Frame>
      );

    case "screening":
    case "complete":
      return (
        <Frame
          label={payload.kind === "complete" ? "Workflow summary" : "Screening"}
          tone={payload.kind === "complete" ? "cyan" : "neutral"}
        >
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {payload.stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-3xl leading-[1.2] text-text-hi">
                  {stat.value}
                </dd>
                <dt className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-text-low">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Frame>
      );

    case "evidence":
      return (
        <Frame label="Candidate evaluation — Data Scientist, L3">
          <ul className="space-y-3">
            {payload.rows.map((row) => (
              <li
                key={row.competency}
                className="flex flex-col gap-2 border-b border-line-soft pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:gap-4"
              >
                <span className="w-40 shrink-0 font-mono text-[0.7rem] text-text-hi">
                  {row.competency}
                </span>
                <span className="flex-1 text-sm leading-relaxed text-text-mid">
                  {row.evidence}
                </span>
                <span
                  className={`inline-flex shrink-0 items-center self-start rounded border px-2 py-0.5 font-mono text-[0.6rem] ${ASSESSMENT_STYLES[row.assessment]}`}
                >
                  {row.assessment}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-line bg-surface-2 p-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-wider text-text-low">
              Recommendation — advisory
            </p>
            <p className="mt-2 text-sm font-semibold text-text-hi">
              {payload.recommendation}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-text-mid">
              {payload.reason}
            </p>
          </div>
        </Frame>
      );
  }
}
