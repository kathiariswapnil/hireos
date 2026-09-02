import {
  Card,
  Section,
  SectionHeader,
  SourceNote,
} from "@/components/ui";
import { ORCHESTRATION } from "@/content/site";

/**
 * The layer diagram: HireOS on top, the customer's systems of record below,
 * with the arrows deliberately pointing both ways. We orchestrate across them
 * rather than replacing them.
 */
export function OrchestrationSection() {
  return (
    <Section id="orchestration">
      <SectionHeader
        eyebrow={ORCHESTRATION.eyebrow}
        title={ORCHESTRATION.title}
        lead={ORCHESTRATION.lead}
      />

      <div className="mt-14">
        {/* HireOS layer */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-gradient-to-br from-indigo/[0.14] to-cyan/[0.05] p-6 sm:p-8">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-brand-gradient"
          />
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-3xl leading-[1.2] text-text-hi">HireOS</h3>
            <p className="font-mono text-eyebrow uppercase tracking-wider text-cyan">
              Orchestration &amp; governance
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {ORCHESTRATION.hireosModules.map((module) => (
              <li
                key={module}
                className="rounded-md border border-line bg-ink/50 px-3 py-1.5 font-mono text-[0.68rem] text-text-mid"
              >
                {module}
              </li>
            ))}
          </ul>
        </div>

        {/* Bidirectional seam between the layers. */}
        <div
          aria-hidden
          className="flex items-center justify-center gap-6 py-4"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="flex flex-col items-center gap-1">
              <span className="h-3 w-px bg-line" />
              <span className="gate-node size-1.5 bg-indigo/70" />
              <span className="h-3 w-px bg-line" />
            </span>
          ))}
        </div>

        {/* Systems of record */}
        <div className="rounded-2xl border border-dashed border-line bg-surface/40 p-6 sm:p-8">
          <p className="font-mono text-eyebrow uppercase tracking-wider text-text-low">
            Your existing systems of record — untouched
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {ORCHESTRATION.systemsOfRecord.map((system) => (
              <li
                key={system}
                className="rounded-md border border-line-soft bg-ink/40 px-3 py-1.5 font-mono text-[0.68rem] text-text-low"
              >
                {system}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {ORCHESTRATION.why.map((item) => (
          <Card key={item.heading} accent>
            <h3 className="text-base font-semibold text-text-hi">
              {item.heading}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-text-mid">
              {item.body}
            </p>
          </Card>
        ))}
      </div>

      <SourceNote>{ORCHESTRATION.source}</SourceNote>
    </Section>
  );
}
