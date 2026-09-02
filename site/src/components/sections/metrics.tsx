import {
  AssumptionNote,
  Section,
  SectionHeader,
  SourceNote,
} from "@/components/ui";
import { METRICS } from "@/content/site";

export function MetricsSection() {
  return (
    <Section id="metrics">
      <SectionHeader
        eyebrow={METRICS.eyebrow}
        title={METRICS.title}
        lead={METRICS.lead}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-gradient-to-br from-indigo/[0.16] to-transparent p-8">
          <div
            aria-hidden
            className="absolute -right-16 -bottom-20 size-64 rounded-full bg-cyan/10 blur-3xl"
          />
          <div className="relative">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-cyan">
              {METRICS.northStar.label}
            </p>
            <h3 className="mt-5 font-display text-4xl leading-[1.2] text-text-hi sm:text-5xl">
              {METRICS.northStar.metric}
            </h3>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-text-mid">
              {METRICS.northStar.why}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface/60">
          <dl>
            {METRICS.supporting.map((item) => (
              <div
                key={item.metric}
                className="flex flex-col gap-0.5 border-b border-line-soft px-6 py-3.5 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="font-mono text-[0.72rem] text-text-hi">
                  {item.metric}
                </dt>
                <dd className="text-xs text-text-low sm:text-right">
                  {item.why}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <AssumptionNote>
        These are the metrics we instrument and commit to reporting in every
        pilot. They are not results — HireOS is pre-product, so we have no
        outcomes to quote yet, and we would rather say so than borrow someone
        else&apos;s numbers.
      </AssumptionNote>

      <SourceNote>{METRICS.source}</SourceNote>
    </Section>
  );
}
