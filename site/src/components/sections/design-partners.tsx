import {
  Card,
  CtaLink,
  GateDiamond,
  Section,
  SectionHeader,
  SourceNote,
} from "@/components/ui";
import { DESIGN_PARTNERS } from "@/content/site";

/**
 * Replaces the customer-logo wall a launched company would have here. HireOS
 * is pre-pilot, so this states the offer honestly instead.
 */
export function DesignPartnersSection() {
  return (
    <Section id="design-partners">
      <SectionHeader
        eyebrow={DESIGN_PARTNERS.eyebrow}
        title={DESIGN_PARTNERS.title}
        lead={DESIGN_PARTNERS.lead}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1fr_0.85fr]">
        {DESIGN_PARTNERS.offers.map((offer) => (
          <Card key={offer.heading} accent>
            <h3 className="font-display text-2xl leading-[1.2] text-text-hi">
              {offer.heading}
            </h3>
            <ul className="mt-5 space-y-3">
              {offer.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-text-mid"
                >
                  <GateDiamond className="mt-1.5 size-2 shrink-0" tone="cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <div className="flex flex-col justify-between rounded-xl border border-amber/30 bg-amber/[0.05] p-6">
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-wider text-amber">
              Who this fits
            </p>
            <ul className="mt-5 space-y-2.5">
              {DESIGN_PARTNERS.fitCriteria.map((criterion) => (
                <li
                  key={criterion}
                  className="font-mono text-[0.72rem] text-text-mid"
                >
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <p className="font-display text-5xl leading-[1.2] text-text-hi">3</p>
            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-wider text-text-low">
              Pilot slots
            </p>
            <CtaLink href="/demo" className="mt-5 w-full">
              Request a demo
            </CtaLink>
          </div>
        </div>
      </div>

      <SourceNote>{DESIGN_PARTNERS.source}</SourceNote>
    </Section>
  );
}
