import type { Metadata } from "next";
import { AutonomySection } from "@/components/sections/autonomy";
import { PageHero } from "@/components/page-hero";
import { UseOfFundsChart } from "@/components/use-of-funds-chart";
import {
  AssumptionNote,
  Card,
  CardGrid,
  Container,
  CtaLink,
  DefinitionRow,
  Eyebrow,
  GateDiamond,
  Kicker,
  NumberedCard,
  PhaseChip,
  Section,
  SectionHeader,
  SourceNote,
  StatBlock,
} from "@/components/ui";
import {
  ASK,
  BRAND,
  COMPETITION,
  MARKET,
  MOAT,
  PRICING,
  ROADMAP,
  TEAM,
  VALIDATION,
  WEDGE,
  WHY_NOW,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "HireOS is raising a $1.5M pre-seed to ship the MVP wedge and convert three enterprise pilots. Pre-product and pre-revenue, with the wedge, moat, market arithmetic and 90-day plan stated openly.",
};

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${ASK.eyebrow} · ${ASK.raise}`}
        title="An enterprise hiring operating layer, and an honest read on where it stands"
        lead="Pre-product and pre-revenue. Every number on this page is either traced to the product blueprint or marked as our own estimate — because a pre-seed deck that hides its assumptions is not worth reading."
        art="decision"
      />

      <RoundSummary />
      <WhyNowSection />
      <WedgeSection />
      <CompetitionSection />
      <MoatSection />
      <PricingSection />
      <MarketSection />
      <AutonomySection />
      <ValidationSection />
      <RoadmapSection />
      <TeamSection />
      <AskSection />
    </>
  );
}

function RoundSummary() {
  return (
    <Section id="round">
      <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {ASK.stats.map((stat) => (
          <StatBlock key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </dl>
      <p className="mt-12 max-w-2xl text-lead text-text-mid">{ASK.lead}</p>
    </Section>
  );
}

function WhyNowSection() {
  return (
    <Section id="why-now">
      <SectionHeader
        eyebrow={WHY_NOW.eyebrow}
        title={WHY_NOW.title}
        lead={WHY_NOW.lead}
      />
      <CardGrid cols={3}>
        {WHY_NOW.cards.map((card, i) => (
          <NumberedCard
            key={card.heading}
            index={i + 1}
            heading={card.heading}
            body={card.body}
          />
        ))}
      </CardGrid>
      <Kicker>{WHY_NOW.kicker}</Kicker>
      <SourceNote>{WHY_NOW.source}</SourceNote>
    </Section>
  );
}

function WedgeSection() {
  return (
    <Section id="wedge">
      <SectionHeader
        eyebrow={WEDGE.eyebrow}
        title={WEDGE.title}
        lead={WEDGE.lead}
      />

      <ol className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-3 rounded-xl border border-cyan/30 bg-cyan/[0.04] p-6">
        {WEDGE.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="h-px w-4 bg-cyan/40" />}
            <span className="rounded-md border border-cyan/30 bg-ink/60 px-3 py-1.5 font-mono text-[0.68rem] whitespace-nowrap text-text-hi">
              {step}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card accent>
          <h3 className="text-base font-semibold text-text-hi">
            {WEDGE.build.heading}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {WEDGE.build.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-text-mid"
              >
                <GateDiamond className="mt-1.5 size-1.5 shrink-0" tone="cyan" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <div className="rounded-xl border border-dashed border-line bg-surface/40 p-6">
          <h3 className="text-base font-semibold text-text-hi">
            {WEDGE.defer.heading}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {WEDGE.defer.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-text-low"
              >
                <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-line" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Kicker>{WEDGE.kicker}</Kicker>
      <SourceNote>{WEDGE.source}</SourceNote>
    </Section>
  );
}

function CompetitionSection() {
  const [, ...competitors] = COMPETITION.columns;

  return (
    <Section id="competition">
      <SectionHeader
        eyebrow={COMPETITION.eyebrow}
        title={COMPETITION.title}
        lead={COMPETITION.lead}
      />

      <div className="mt-14 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            HireOS capabilities compared with Ashby, Eightfold and a traditional
            ATS
          </caption>
          <thead>
            <tr className="bg-ink/60">
              <th
                scope="col"
                className="px-5 py-3.5 font-mono text-[0.62rem] uppercase tracking-wider text-text-low"
              >
                {COMPETITION.columns[0]}
              </th>
              {competitors.map((column, i) => (
                <th
                  key={column}
                  scope="col"
                  className={`px-5 py-3.5 font-mono text-[0.62rem] uppercase tracking-wider ${
                    i === 0
                      ? "bg-cyan/[0.07] text-cyan"
                      : "text-text-low"
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPETITION.rows.map(([capability, ...values]) => (
              <tr key={capability} className="border-t border-line-soft">
                <th
                  scope="row"
                  className="px-5 py-3.5 text-sm font-normal text-text-hi"
                >
                  {capability}
                </th>
                {values.map((value, i) => (
                  <td
                    key={`${capability}-${i}`}
                    className={`px-5 py-3.5 text-sm ${
                      i === 0
                        ? "bg-cyan/[0.05] font-medium text-text-hi"
                        : "text-text-low"
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Kicker>{COMPETITION.kicker}</Kicker>
      <SourceNote>{COMPETITION.source}</SourceNote>
    </Section>
  );
}

function MoatSection() {
  return (
    <Section id="moat">
      <SectionHeader
        eyebrow={MOAT.eyebrow}
        title={MOAT.title}
        lead={MOAT.lead}
      />

      {/* Each layer widens, so defensibility reads as accumulation. */}
      <ol className="mt-14 space-y-2">
        {MOAT.layers.map((layer, i) => (
          <li key={layer.heading}>
            <div
              className="relative overflow-hidden rounded-lg border border-line bg-surface p-5"
              style={{ marginInlineEnd: `${(MOAT.layers.length - 1 - i) * 3}%` }}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-0.5 bg-brand-gradient"
                style={{ opacity: 0.3 + i * 0.14 }}
              />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                <h3 className="text-sm font-semibold text-text-hi sm:w-72 sm:shrink-0">
                  {layer.heading}
                </h3>
                <p className="text-sm leading-relaxed text-text-mid">
                  {layer.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Kicker>{MOAT.kicker}</Kicker>
      <SourceNote>{MOAT.source}</SourceNote>
    </Section>
  );
}

function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow={PRICING.eyebrow}
        title={PRICING.title}
        lead={PRICING.lead}
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRICING.packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative flex flex-col overflow-hidden rounded-xl border p-6 ${
              pkg.highlight
                ? "border-cyan/40 bg-gradient-to-b from-cyan/[0.09] to-transparent"
                : "border-line bg-surface"
            }`}
          >
            {pkg.highlight && (
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-brand-gradient"
              />
            )}
            {pkg.note && (
              <span className="mb-3 inline-flex w-fit items-center rounded border border-cyan/40 bg-cyan/10 px-1.5 py-0.5 font-mono text-[0.58rem] tracking-wider text-cyan">
                {pkg.note}
              </span>
            )}
            <h3 className="text-base font-semibold text-text-hi">{pkg.name}</h3>
            <p className="mt-4 font-display text-2xl leading-[1.2] text-text-hi">
              {pkg.price}
            </p>
            {pkg.period && (
              <p className="mt-1 font-mono text-[0.62rem] text-text-low">
                {pkg.period}
              </p>
            )}
            <ul className="mt-5 space-y-2">
              {pkg.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-text-mid"
                >
                  <GateDiamond
                    className="mt-1.5 size-1.5 shrink-0"
                    tone={pkg.highlight ? "cyan" : "indigo"}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <AssumptionNote>{PRICING.assumption}</AssumptionNote>
      <SourceNote>{PRICING.source}</SourceNote>
    </Section>
  );
}

function MarketSection() {
  return (
    <Section id="market">
      <SectionHeader
        eyebrow={MARKET.eyebrow}
        title={MARKET.title}
        lead={MARKET.lead}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <Card>
          <h3 className="font-mono text-eyebrow uppercase tracking-wider text-text-low">
            {MARKET.assumptionsLabel}
          </h3>
          <dl className="mt-5">
            {MARKET.assumptions.map((item) => (
              <DefinitionRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </dl>
        </Card>

        <div className="space-y-3">
          {MARKET.tiers.map((tier, i) => (
            <div
              key={tier.label}
              className={`rounded-xl border p-6 ${
                i === MARKET.tiers.length - 1
                  ? "border-cyan/40 bg-cyan/[0.05]"
                  : "border-line bg-surface"
              }`}
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-wider text-text-low">
                {tier.label}
              </p>
              <p className="mt-2 font-display text-4xl leading-[1.2] text-text-hi">
                {tier.value}
              </p>
              <p className="mt-2 font-mono text-[0.68rem] text-text-low">
                {tier.basis}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Kicker>{MARKET.realityCheck}</Kicker>
      <AssumptionNote>{MARKET.caveat}</AssumptionNote>
      <SourceNote>{MARKET.source}</SourceNote>
    </Section>
  );
}

function ValidationSection() {
  return (
    <Section id="validation">
      <SectionHeader
        eyebrow={VALIDATION.eyebrow}
        title={VALIDATION.title}
        lead={VALIDATION.lead}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <h3 className="font-mono text-eyebrow uppercase tracking-wider text-amber">
            Status, stated plainly
          </h3>
          <dl className="mt-5">
            {VALIDATION.status.map((item) => (
              <DefinitionRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </dl>
        </Card>

        <ol className="space-y-2">
          {VALIDATION.steps.map((step) => (
            <li
              key={step.n}
              className="flex gap-5 rounded-lg border border-line bg-surface p-5"
            >
              <span className="font-mono text-sm text-cyan">{step.n}</span>
              <span>
                <span className="block text-sm font-semibold text-text-hi">
                  {step.heading}
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-text-mid">
                  {step.body}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <Kicker>{VALIDATION.kicker}</Kicker>
      <SourceNote>{VALIDATION.source}</SourceNote>
    </Section>
  );
}

function RoadmapSection() {
  return (
    <Section id="roadmap">
      <SectionHeader
        eyebrow={ROADMAP.eyebrow}
        title={ROADMAP.title}
        lead={ROADMAP.lead}
      />

      <ol className="mt-14 space-y-0">
        {ROADMAP.sprints.map((sprint, i) => (
          <li
            key={sprint.days}
            className="relative flex flex-col gap-2 border-l border-line py-5 pl-8 sm:flex-row sm:gap-8"
          >
            <span
              aria-hidden
              className="absolute top-7 -left-[0.3rem] gate-node size-2.5 bg-indigo"
            />
            <span className="w-28 shrink-0 font-mono text-[0.68rem] text-cyan">
              {sprint.days}
            </span>
            <span className="w-32 shrink-0 text-sm font-semibold text-text-hi">
              {sprint.goal}
            </span>
            <span className="text-sm leading-relaxed text-text-mid">
              {sprint.body}
            </span>
            {i === ROADMAP.sprints.length - 1 && (
              <span
                aria-hidden
                className="absolute -bottom-0 -left-px h-1/2 w-px bg-ink"
              />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ROADMAP.phases.map((phase) => (
          <Card key={phase.v} className="p-5">
            <div className="flex items-center gap-2.5">
              <PhaseChip phase={phase.v} />
              <span className="font-mono text-[0.62rem] text-text-low">
                {phase.when}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-mid">
              {phase.what}
            </p>
          </Card>
        ))}
      </div>

      <SourceNote>{ROADMAP.source}</SourceNote>
    </Section>
  );
}

function TeamSection() {
  return (
    <Section id="team">
      <SectionHeader
        eyebrow={TEAM.eyebrow}
        title={TEAM.title}
        lead={TEAM.lead}
      />

      <ul className="mt-14 divide-y divide-line-soft rounded-xl border border-line bg-surface/50">
        {TEAM.roles.map((role) => (
          <li
            key={role.role}
            className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="w-52 shrink-0 text-sm font-semibold text-text-hi">
              {role.role}
            </span>
            <span className="w-40 shrink-0 font-mono text-[0.7rem] text-text-low">
              {role.name}
            </span>
            <span className="flex-1 text-sm text-text-mid">{role.body}</span>
            <span
              className={`inline-flex w-fit shrink-0 items-center rounded border px-2 py-0.5 font-mono text-[0.6rem] ${
                role.status === "In seat"
                  ? "border-green/40 bg-green/10 text-green"
                  : "border-line bg-surface-2 text-text-low"
              }`}
            >
              {role.status}
            </span>
          </li>
        ))}
      </ul>

      <AssumptionNote>{TEAM.note}</AssumptionNote>
      <SourceNote>{TEAM.source}</SourceNote>
    </Section>
  );
}

function AskSection() {
  return (
    <section
      id="ask"
      className="relative scroll-mt-28 overflow-hidden border-t border-line-soft bg-gradient-to-b from-indigo/[0.09] to-transparent py-20 sm:py-28"
    >
      <Container>
        <Eyebrow>{ASK.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-title text-text-hi">
          {ASK.title}
        </h2>
        <p className="mt-6 max-w-xl text-lead text-text-mid">{ASK.lead}</p>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="font-mono text-eyebrow uppercase tracking-wider text-text-low">
              {ASK.useOfFundsLabel}
            </h3>
            <div className="mt-6">
              <UseOfFundsChart />
            </div>
          </Card>

          <Card accent>
            <h3 className="font-mono text-eyebrow uppercase tracking-wider text-cyan">
              {ASK.milestonesLabel}
            </h3>
            <ul className="mt-6 space-y-3">
              {ASK.milestones.map((milestone) => (
                <li
                  key={milestone}
                  className="flex items-start gap-3 text-sm leading-relaxed text-text-mid"
                >
                  <GateDiamond className="mt-1.5 size-2 shrink-0" tone="cyan" />
                  {milestone}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <AssumptionNote>{ASK.assumption}</AssumptionNote>

        <div className="mt-14 flex flex-col gap-6 rounded-xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl leading-[1.2] text-text-hi">
              Want the full deck and the blueprint?
            </p>
            <p className="mt-2 font-mono text-[0.7rem] text-text-low">
              {/* TODO: replace placeholders before this page goes out. */}
              {BRAND.entity} · {BRAND.email} · {BRAND.phone}
            </p>
          </div>
          <CtaLink href="/demo">Start a conversation</CtaLink>
        </div>

        <SourceNote>{ASK.source}</SourceNote>
      </Container>
    </section>
  );
}
