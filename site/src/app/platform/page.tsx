import type { Metadata } from "next";
import { AgentsSection } from "@/components/sections/agents";
import { ClosingCta } from "@/components/sections/closing-cta";
import { OrchestrationSection } from "@/components/sections/orchestration";
import { PageHero } from "@/components/page-hero";
import {
  Card,
  GateDiamond,
  Kicker,
  PhaseChip,
  Section,
  SectionHeader,
  SourceNote,
  StateChip,
} from "@/components/ui";
import {
  API_SURFACE,
  INTEGRATIONS,
  MEMORY,
  MODULES,
  STATE_MACHINE_NOTES,
  WORKFLOW_STATES,
  WORKFLOW_TERMINALS,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The HireOS platform: eleven modules, a durable workflow state machine, six scoped agents, permission-aware company hiring memory, vendor-neutral connectors and a full API surface.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="An operating layer, specified module by module"
        lead="Everything below comes from the product blueprint. The order is deliberate: the MVP is the shortest path from a hiring request to a policy-aware, approved shortlist."
        art="orchestration"
      />

      <ModulesSection />
      <WorkflowSection />
      <OrchestrationSection />
      <AgentsSection />
      <MemorySection />
      <IntegrationsSection />
      <ApiSection />
      <ClosingCta />
    </>
  );
}

function ModulesSection() {
  const phases = ["MVP", "V2", "V3"] as const;

  return (
    <Section id="modules">
      <SectionHeader
        eyebrow={MODULES.eyebrow}
        title={MODULES.title}
        lead={MODULES.lead}
      />

      <div className="mt-14 space-y-10">
        {phases.map((phase) => {
          const modules = MODULES.modules.filter((m) => m.phase === phase);
          return (
            <div key={phase}>
              <div className="flex items-center gap-3">
                <PhaseChip phase={phase} />
                <span className="font-mono text-[0.68rem] text-text-low">
                  {modules.length} module{modules.length === 1 ? "" : "s"}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line-soft" />
              </div>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {modules.map((module) => (
                  <Card key={module.name} className="p-5">
                    <dt className="text-sm font-semibold text-text-hi">
                      {module.name}
                    </dt>
                    <dd className="mt-2 text-xs leading-relaxed text-text-mid">
                      {module.purpose}
                    </dd>
                  </Card>
                ))}
              </dl>
            </div>
          );
        })}
      </div>

      <SourceNote>{MODULES.source}</SourceNote>
    </Section>
  );
}

function WorkflowSection() {
  return (
    <Section id="workflow">
      <SectionHeader
        eyebrow="Architecture"
        title="A durable state machine, not one giant autonomous prompt"
        lead="Every requisition is a workflow instance with versioned state, replayable events and retries. This is what makes the system auditable, and what makes it survive a failed model call."
      />

      <div className="mt-14 rounded-2xl border border-line bg-surface/50 p-6 sm:p-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {WORKFLOW_STATES.map((state, i) => (
            <li key={state.name} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="h-px w-4 bg-line" />
              )}
              <StateChip name={state.name} gated={state.gated} />
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line-soft pt-6">
          <span className="font-mono text-[0.62rem] uppercase tracking-wider text-text-low">
            Terminal states
          </span>
          {WORKFLOW_TERMINALS.map((terminal) => (
            <span
              key={terminal}
              className="rounded-md border border-line bg-ink px-2.5 py-1.5 font-mono text-[0.68rem] text-text-mid"
            >
              {terminal}
            </span>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2.5 text-xs text-text-low">
          <GateDiamond className="size-2" />
          Amber states require a recorded human decision before the workflow can
          advance.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {STATE_MACHINE_NOTES.map((note) => (
          <Card key={note.heading} accent>
            <h3 className="text-base font-semibold text-text-hi">
              {note.heading}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-text-mid">
              {note.body}
            </p>
          </Card>
        ))}
      </div>

      <SourceNote>Blueprint sec.4</SourceNote>
    </Section>
  );
}

function MemorySection() {
  return (
    <Section id="memory">
      <SectionHeader
        eyebrow={MEMORY.eyebrow}
        title={MEMORY.title}
        lead={MEMORY.lead}
      />

      {/* The ingestion pipeline, as a numbered chain. */}
      <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MEMORY.pipeline.map((stage, i) => (
          <li
            key={stage}
            className="relative rounded-lg border border-line bg-surface px-4 py-3.5"
          >
            <span className="font-mono text-[0.58rem] text-cyan">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-1.5 text-sm text-text-hi">{stage}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-base font-semibold text-text-hi">
            What the memory holds
          </h3>
          <ul className="mt-4 space-y-2.5">
            {MEMORY.holds.map((item) => (
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

        <div className="rounded-xl border border-amber/25 bg-amber/[0.04] p-6">
          <p className="flex items-center gap-2 font-mono text-eyebrow uppercase text-amber">
            <GateDiamond className="size-2" />
            {MEMORY.discipline.heading}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-text-mid">
            {MEMORY.discipline.body}
          </p>
        </div>
      </div>

      <Kicker>
        Retrieval is permission-aware. A manager cannot reach a policy they are
        not entitled to see, which is a requirement rather than a feature.
      </Kicker>

      <SourceNote>{MEMORY.source}</SourceNote>
    </Section>
  );
}

function IntegrationsSection() {
  return (
    <Section id="integrations">
      <SectionHeader
        eyebrow={INTEGRATIONS.eyebrow}
        title={INTEGRATIONS.title}
        lead={INTEGRATIONS.lead}
      />

      <ul className="mt-14 divide-y divide-line-soft rounded-xl border border-line bg-surface/50">
        {INTEGRATIONS.connectors.map((connector) => (
          <li
            key={connector.name}
            className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="w-56 shrink-0 font-mono text-[0.72rem] text-text-hi">
              {connector.name}
            </span>
            <span className="flex-1 text-sm text-text-mid">
              {connector.detail}
            </span>
            <PhaseChip phase={connector.phase} />
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-xl border border-line-soft bg-surface/40 p-5">
        <p className="text-sm leading-relaxed text-text-low">
          {INTEGRATIONS.note}
        </p>
      </div>

      <SourceNote>{INTEGRATIONS.source}</SourceNote>
    </Section>
  );
}

function ApiSection() {
  return (
    <Section id="api">
      <SectionHeader
        eyebrow={API_SURFACE.eyebrow}
        title={API_SURFACE.title}
        lead={API_SURFACE.lead}
      />

      <div className="mt-14 overflow-hidden rounded-xl border border-line bg-ink/60">
        <ul className="divide-y divide-line-soft">
          {API_SURFACE.endpoints.map((endpoint) => (
            <li
              key={endpoint.path}
              className="flex flex-col gap-1.5 px-5 py-3.5 sm:flex-row sm:items-center sm:gap-5"
            >
              <span
                className={`inline-flex w-14 shrink-0 justify-center rounded px-1.5 py-0.5 font-mono text-[0.6rem] ${
                  endpoint.method === "GET"
                    ? "bg-cyan/10 text-cyan"
                    : "bg-indigo/15 text-indigo"
                }`}
              >
                {endpoint.method}
              </span>
              <code className="font-mono text-[0.72rem] text-text-hi sm:w-80 sm:shrink-0">
                {endpoint.path}
              </code>
              <span className="text-sm text-text-low">{endpoint.purpose}</span>
            </li>
          ))}
        </ul>
      </div>

      <SourceNote>{API_SURFACE.source}</SourceNote>
    </Section>
  );
}
