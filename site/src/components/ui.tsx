import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Layout shells
 * ------------------------------------------------------------------ */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[76rem] px-5 sm:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Skips the container, for sections that manage their own width. */
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-28 border-t border-line-soft py-20 sm:py-28 ${className ?? ""}`}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Typography
 * ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-eyebrow uppercase text-cyan ${className ?? ""}`}
    >
      <span aria-hidden className="gate-node size-2 shrink-0 bg-cyan" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <header
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className ?? ""}`}
    >
      {eyebrow && (
        <Eyebrow className={centered ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="mt-5 font-display text-title text-text-hi">{title}</h2>
      {lead && <p className="mt-5 text-lead text-text-mid">{lead}</p>}
    </header>
  );
}

/** Traces a claim back to its blueprint section, so nothing is unattributed. */
export function SourceNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 font-mono text-[0.68rem] tracking-wide text-text-low">
      Source: {children}
    </p>
  );
}

/** A caveat on a number we estimated rather than observed. */
export function AssumptionNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 flex gap-3 rounded-lg border border-line-soft bg-surface/50 p-4 text-sm text-text-low">
      <span
        aria-hidden
        className="mt-1.5 gate-node size-2 shrink-0 bg-amber"
      />
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * Surfaces
 * ------------------------------------------------------------------ */

export function Card({
  children,
  className,
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  /** Lifts the card with a brand-tinted top edge. */
  accent?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-line bg-surface p-6 ${className ?? ""}`}
    >
      {accent && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-brand-gradient"
        />
      )}
      {children}
    </div>
  );
}

export function CardGrid({
  children,
  cols = 3,
  className,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols];
  return (
    <div className={`mt-14 grid gap-4 ${colClass} ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function NumberedCard({
  index,
  heading,
  body,
}: {
  index: number;
  heading: string;
  body: string;
}) {
  return (
    <Card className="flex flex-col">
      <span className="font-mono text-xs text-text-low">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-text-hi">{heading}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-mid">{body}</p>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * Chips and markers
 * ------------------------------------------------------------------ */

/** A workflow state name. Gated states carry the amber gate diamond. */
export function StateChip({
  name,
  gated = false,
  active = false,
}: {
  name: string;
  gated?: boolean;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[0.68rem] whitespace-nowrap transition-colors ${
        active
          ? "border-cyan/60 bg-cyan/10 text-text-hi"
          : gated
            ? "border-amber/30 bg-amber/5 text-amber"
            : "border-line bg-surface-2 text-text-low"
      }`}
    >
      {gated && <span aria-hidden className="gate-node size-1.5 bg-amber" />}
      {name}
    </span>
  );
}

const PHASE_STYLES: Record<string, string> = {
  MVP: "border-cyan/40 bg-cyan/10 text-cyan",
  V2: "border-indigo/40 bg-indigo/10 text-indigo",
  V3: "border-line bg-surface-2 text-text-low",
  V4: "border-line bg-surface-2 text-text-low",
};

export function PhaseChip({ phase }: { phase: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 font-mono text-[0.6rem] tracking-wider ${
        PHASE_STYLES[phase] ?? PHASE_STYLES.V3
      }`}
    >
      {phase}
    </span>
  );
}

/** The gate diamond from the logo, used as a human-decision marker. */
export function GateDiamond({
  className,
  tone = "amber",
}: {
  className?: string;
  tone?: "amber" | "cyan" | "indigo";
}) {
  const bg = {
    amber: "bg-amber",
    cyan: "bg-cyan",
    indigo: "bg-indigo",
  }[tone];
  return (
    <span aria-hidden className={`gate-node ${bg} ${className ?? "size-2.5"}`} />
  );
}

/** Scoped tool permissions, shown as a hard boundary rather than prose. */
export function PermissionChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-start gap-2 rounded-md border border-dashed border-line bg-ink/40 px-2.5 py-1.5 font-mono text-[0.66rem] leading-snug text-text-low">
      <span aria-hidden className="mt-0.5 text-cyan">
        ⌗
      </span>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Callouts
 * ------------------------------------------------------------------ */

/**
 * A deterministic rule. Amber because it is the policy layer speaking, and
 * amber means a human or a rule is in control here.
 */
export function PolicyCallout({
  label = "Policy rule",
  children,
  example,
}: {
  label?: string;
  children: ReactNode;
  example?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-amber/25 bg-amber/[0.04] p-6">
      <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-amber" />
      <p className="flex items-center gap-2 font-mono text-eyebrow uppercase text-amber">
        <GateDiamond className="size-2" />
        {label}
      </p>
      <p className="mt-4 text-lg leading-snug text-text-hi">{children}</p>
      {example && (
        <p className="mt-4 border-t border-amber/15 pt-4 text-sm leading-relaxed text-text-mid">
          {example}
        </p>
      )}
    </div>
  );
}

/** The one-line takeaway that closes a section. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mt-12 flex gap-4 border-l-2 border-cyan pl-5 text-lead text-text-hi">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * Actions
 * ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gradient text-ink font-semibold hover:brightness-110 active:brightness-95",
  secondary:
    "border border-line bg-surface text-text-hi hover:border-cyan/50 hover:bg-surface-2",
  ghost: "text-text-mid hover:text-text-hi",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Data display
 * ------------------------------------------------------------------ */

export function DefinitionRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-line-soft py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <dt className="font-mono text-xs uppercase tracking-wider text-text-low">
        {label}
      </dt>
      <dd className="text-sm text-text-hi sm:max-w-lg sm:text-right">{value}</dd>
    </div>
  );
}

export function StatBlock({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-display text-4xl leading-[1.2] text-text-hi sm:text-5xl">{value}</p>
      <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-wider text-text-low">
        {label}
      </p>
    </div>
  );
}
