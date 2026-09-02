/**
 * The HireOS mark: two pillars joined by a diamond gate node, reading as an
 * implied H. The diamond is the product thesis -- the policy gate between the
 * two brains -- and it recurs across the site wherever a human approval gate
 * appears.
 *
 * Redrawn as SVG from brand/logo-mark.png so it stays crisp at any size and
 * inherits brand colours from one place.
 */

type LogoMarkProps = {
  className?: string;
  /** Distinguishes gradient ids when several marks share a document. */
  gradientId?: string;
};

export function LogoMark({
  className,
  gradientId = "hireos-mark",
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="HireOS"
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="var(--color-cyan)" />
          <stop offset="55%" stopColor="var(--color-indigo)" />
          <stop offset="100%" stopColor="var(--color-indigo-deep)" />
        </linearGradient>
      </defs>

      {/* Pillars: the two brains. */}
      <rect x="9" y="4" width="19" height="92" rx="9.5" fill={`url(#${gradientId})`} />
      <rect x="72" y="4" width="19" height="92" rx="9.5" fill={`url(#${gradientId})`} />

      {/* Crossbar: the workflow running between them. */}
      <rect x="26" y="46.5" width="48" height="7" fill={`url(#${gradientId})`} />

      {/* Gate node: the policy decision point. */}
      <rect
        x="36"
        y="36"
        width="28"
        height="28"
        rx="2"
        transform="rotate(45 50 50)"
        fill="var(--color-cyan)"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Hides the wordmark, e.g. in tight mobile headers. */
  markOnly?: boolean;
  gradientId?: string;
};

export function Logo({ className, markOnly = false, gradientId }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-7 w-7 shrink-0" gradientId={gradientId} />
      {!markOnly && (
        <span className="text-[1.35rem] leading-none font-semibold tracking-tight text-text-hi">
          HireOS
        </span>
      )}
    </span>
  );
}
