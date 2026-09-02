import {
  Card,
  Kicker,
  PermissionChip,
  PhaseChip,
  Section,
  SectionHeader,
  SourceNote,
} from "@/components/ui";
import { AGENTS } from "@/content/site";

export function AgentsSection() {
  return (
    <Section id="agents">
      <SectionHeader
        eyebrow={AGENTS.eyebrow}
        title={AGENTS.title}
        lead={AGENTS.lead}
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.agents.map((agent) => (
          <Card key={agent.name} className="flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-text-hi">
                {agent.name}
              </h3>
              <PhaseChip phase={agent.phase} />
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-mid">
              {agent.body}
            </p>
            <div className="mt-5">
              <PermissionChip>{agent.permission}</PermissionChip>
            </div>
          </Card>
        ))}
      </div>

      {/* The governance layer sits under every agent, so it renders as a base. */}
      <div className="relative mt-4 overflow-hidden rounded-xl border border-indigo/30 bg-indigo/[0.06] p-7">
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-gradient"
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <h3 className="font-display text-2xl leading-[1.2] whitespace-nowrap text-text-hi">
            {AGENTS.governance.heading}
          </h3>
          <p className="text-sm leading-relaxed text-text-mid">
            {AGENTS.governance.body}
          </p>
        </div>
      </div>

      <Kicker>
        An agent that could publish a job, message a candidate and send an offer
        is a security finding, not a feature.
      </Kicker>

      <SourceNote>{AGENTS.source}</SourceNote>
    </Section>
  );
}
