import { GateDiamond, Kicker, PolicyCallout, Section, SectionHeader, SourceNote } from "@/components/ui";
import { THESIS } from "@/content/site";

/**
 * The two-brain diptych. The AI side is rendered soft and gradient; the
 * deterministic side is rendered as a hard mono grid. The seam between them is
 * the policy gate, and it is the whole argument of the company.
 */
export function TwoBrainSection() {
  return (
    <Section id="thesis">
      <SectionHeader
        eyebrow={THESIS.eyebrow}
        title={THESIS.title}
        lead={THESIS.lead}
      />

      <div className="mt-14 grid items-stretch gap-0 lg:grid-cols-[1fr_auto_1fr]">
        {/* AI layer: fluid, generative, soft. */}
        <div className="relative overflow-hidden rounded-t-2xl border border-line bg-gradient-to-br from-cyan/[0.09] via-indigo/[0.06] to-transparent p-7 lg:rounded-l-2xl lg:rounded-tr-none lg:border-r-0">
          <div
            aria-hidden
            className="absolute -top-24 -left-16 size-72 rounded-full bg-cyan/15 blur-3xl"
          />
          <div className="relative">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-cyan">
              {THESIS.aiLayer.subhead}
            </p>
            <h3 className="mt-3 font-display text-3xl leading-[1.2] text-text-hi">
              {THESIS.aiLayer.heading}
            </h3>
            <ul className="mt-6 space-y-3">
              {THESIS.aiLayer.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-text-mid"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm italic text-text-low">
              Recommends. Drafts. Never decides.
            </p>
          </div>
        </div>

        {/* The seam: the policy gate that arbitrates between the two. */}
        <div className="relative flex items-center justify-center border-x border-line bg-ink px-6 py-4 lg:border-x-0 lg:px-8">
          <span
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px bg-line lg:inset-x-auto lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-px"
          />
          <span className="relative flex items-center gap-3 rounded-full border border-amber/40 bg-ink px-4 py-2 lg:flex-col lg:rounded-lg lg:px-3 lg:py-5">
            <GateDiamond className="size-3" />
            <span className="font-mono text-[0.6rem] tracking-[0.2em] whitespace-nowrap text-amber lg:[writing-mode:vertical-rl]">
              {THESIS.gateLabel}
            </span>
            <GateDiamond className="size-3" />
          </span>
        </div>

        {/* Deterministic layer: hard grid, mono, no ambiguity. */}
        <div className="bg-grid relative overflow-hidden rounded-b-2xl border border-line bg-surface/60 p-7 lg:rounded-r-2xl lg:rounded-bl-none lg:border-l-0">
          <div className="relative">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-amber">
              {THESIS.policyLayer.subhead}
            </p>
            <h3 className="mt-3 font-display text-3xl leading-[1.2] text-text-hi">
              {THESIS.policyLayer.heading}
            </h3>
            <ul className="mt-6 space-y-2">
              {THESIS.policyLayer.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-line-soft pb-2 font-mono text-[0.72rem] text-text-mid last:border-0"
                >
                  <GateDiamond className="size-1.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 font-mono text-[0.72rem] text-text-low">
              Evaluates. Blocks. Holds the authority.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <PolicyCallout label="The rule that defines the product" example={THESIS.example}>
          {THESIS.rule}
        </PolicyCallout>
      </div>

      <Kicker>
        Most products build the first brain and call it a hiring agent. The
        second brain is what an enterprise is actually buying.
      </Kicker>

      <SourceNote>{THESIS.source}</SourceNote>
    </Section>
  );
}
