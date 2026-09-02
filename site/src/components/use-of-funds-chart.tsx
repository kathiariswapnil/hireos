import { ASK } from "@/content/site";

/**
 * Use-of-funds, drawn as a stacked allocation bar plus a legend. Coded rather
 * than generated as an image so the numbers stay editable and legible.
 */
export function UseOfFundsChart() {
  const shades = [
    "var(--color-cyan)",
    "var(--color-indigo)",
    "var(--color-indigo-deep)",
    "var(--color-amber)",
    "var(--color-green)",
    "var(--color-line)",
  ];

  const total = ASK.useOfFunds.reduce((sum, item) => sum + item.pct, 0);

  return (
    <div>
      <div
        className="flex h-3 w-full overflow-hidden rounded-full"
        role="img"
        aria-label={ASK.useOfFunds
          .map((item) => `${item.label}: ${item.pct}%`)
          .join(", ")}
      >
        {ASK.useOfFunds.map((item, i) => (
          <span
            key={item.label}
            className="h-full"
            style={{
              width: `${(item.pct / total) * 100}%`,
              background: shades[i % shades.length],
            }}
          />
        ))}
      </div>

      <dl className="mt-6 space-y-0">
        {ASK.useOfFunds.map((item, i) => (
          <div
            key={item.label}
            className="flex items-center gap-3 border-b border-line-soft py-2.5 last:border-0"
          >
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-sm"
              style={{ background: shades[i % shades.length] }}
            />
            <dt className="flex-1 text-sm text-text-mid">{item.label}</dt>
            <dd className="font-mono text-[0.72rem] text-text-hi">
              {item.pct}%
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
