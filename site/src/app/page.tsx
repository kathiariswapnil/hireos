import Image from "next/image";
import { WorkflowConsole } from "@/components/console/workflow-console";
import { AgentsSection } from "@/components/sections/agents";
import { AutonomySection } from "@/components/sections/autonomy";
import { ClosingCta } from "@/components/sections/closing-cta";
import { DesignPartnersSection } from "@/components/sections/design-partners";
import { MetricsSection } from "@/components/sections/metrics";
import { OrchestrationSection } from "@/components/sections/orchestration";
import { TwoBrainSection } from "@/components/sections/two-brain";
import {
  Card,
  CardGrid,
  Container,
  CtaLink,
  Eyebrow,
  GateDiamond,
  Kicker,
  NumberedCard,
  Section,
  SectionHeader,
  SourceNote,
  StatBlock,
} from "@/components/ui";
import { HERO, PROBLEM, TRUST, WHY_NOW } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <TwoBrainSection />
      <ConsoleSection />
      <OrchestrationSection />
      <AgentsSection />
      <WhyNowSection />
      <AutonomySection />
      <MetricsSection />
      <EnterpriseReadyStrip />
      <DesignPartnersSection />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Orchestration graph from the deck cover: routes, and gate nodes. */}
      <Image
        src="/brand/hero-cover.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden
        className="object-cover object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/20"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent"
      />

      <Container className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <Eyebrow>{HERO.eyebrow}</Eyebrow>

        <h1 className="mt-7 max-w-3xl font-display text-display text-text-hi">
          {HERO.titleLines.map((line, i) => (
            <span key={line} className="block">
              {/* The last line is the point of the whole company. */}
              {i === HERO.titleLines.length - 1 ? (
                <span className="text-brand-gradient">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-xl text-lead text-text-mid">{HERO.lead}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <CtaLink href={HERO.primaryCta.href}>{HERO.primaryCta.label}</CtaLink>
          <CtaLink href={HERO.secondaryCta.href} variant="secondary">
            {HERO.secondaryCta.label}
          </CtaLink>
        </div>

        <dl className="mt-16 flex flex-wrap gap-x-14 gap-y-8 border-t border-line-soft pt-10">
          {HERO.proof.map((item) => (
            <StatBlock key={item.label} value={item.value} label={item.label} />
          ))}
        </dl>
      </Container>
    </section>
  );
}

function ProblemSection() {
  return (
    <Section id="problem">
      <SectionHeader
        eyebrow={PROBLEM.eyebrow}
        title={PROBLEM.title}
        lead={PROBLEM.lead}
      />
      <CardGrid cols={4}>
        {PROBLEM.cards.map((card, i) => (
          <NumberedCard
            key={card.heading}
            index={i + 1}
            heading={card.heading}
            body={card.body}
          />
        ))}
      </CardGrid>
      <Kicker>
        The judgment is the job. Everything around it is overhead an operating
        layer should absorb.
      </Kicker>
      <SourceNote>{PROBLEM.source}</SourceNote>
    </Section>
  );
}

function ConsoleSection() {
  return (
    <Section id="console">
      <SectionHeader
        eyebrow="The demo"
        title="One hiring request becomes one governed workflow"
        lead="Not a tour of disconnected AI features. Change the autonomy mode and watch what the system is permitted to do change with it — the human gates hold in every mode."
      />
      <div className="mt-14">
        <WorkflowConsole />
      </div>
      <SourceNote>Blueprint sec.3, sec.24</SourceNote>
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

function EnterpriseReadyStrip() {
  return (
    <Section id="enterprise-ready">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow={TRUST.eyebrow}
            title={TRUST.title}
            lead={TRUST.lead}
          />
          <div className="mt-8 rounded-xl border border-amber/25 bg-amber/[0.04] p-6">
            <p className="flex items-center gap-2 font-mono text-eyebrow uppercase text-amber">
              <GateDiamond className="size-2" />
              {TRUST.injection.heading}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-mid">
              {TRUST.injection.body}
            </p>
          </div>
          <div className="mt-8">
            <CtaLink href="/security" variant="secondary">
              Read the trust architecture
            </CtaLink>
          </div>
        </div>

        <Card className="p-0">
          <ul>
            {TRUST.controls.map((control) => (
              <li
                key={control}
                className="flex items-center gap-3 border-b border-line-soft px-6 py-3.5 text-sm text-text-mid last:border-0"
              >
                <GateDiamond className="size-1.5 shrink-0" tone="cyan" />
                {control}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <SourceNote>{TRUST.source}</SourceNote>
    </Section>
  );
}
