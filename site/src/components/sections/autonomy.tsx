import {
  GateDiamond,
  Kicker,
  Section,
  SectionHeader,
  SourceNote,
} from "@/components/ui";
import { AUTONOMY } from "@/content/site";

/** The autonomy ladder, drawn as rungs that climb. */
export function AutonomySection() {
  return (
    <Section id="autonomy">
      <SectionHeader
        eyebrow={AUTONOMY.eyebrow}
        title={AUTONOMY.title}
        lead={AUTONOMY.lead}
      />

      <ol className="mt-14 space-y-3">
        {AUTONOMY.modes.map((mode, i) => (
          <li
            key={mode.name}
            /* Each rung indents further, so the ladder reads as ascent. */
            style={{ marginInlineStart: `${i * 6}%` }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-6">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-0.5"
                style={{
                  background: `linear-gradient(to bottom, var(--color-cyan), var(--color-indigo))`,
                  opacity: 0.35 + i * 0.32,
                }}
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <div className="sm:w-52 sm:shrink-0">
                  <p className="font-mono text-[0.6rem] uppercase tracking-wider text-text-low">
                    Rung {i + 1} · {mode.trust}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl leading-[1.2] text-text-hi">
                    {mode.name}
                  </h3>
                </div>
                <div className="flex-1">
                  <p className="text-base text-text-hi">{mode.behavior}</p>
                  <p className="mt-1.5 text-sm text-text-mid">{mode.example}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber/25 bg-amber/[0.04] p-5">
        <GateDiamond className="mt-1.5 size-2.5" />
        <p className="text-sm leading-relaxed text-text-mid">
          <span className="text-text-hi">
            No rung grants autonomy over a hiring decision.
          </span>{" "}
          Autopilot moves reminders and approved notifications. Shortlists,
          feedback, selection and compensation stay gated on a recorded human
          decision at every rung — that is a property of the state machine, not
          a configuration flag.
        </p>
      </div>

      <Kicker>{AUTONOMY.kicker}</Kicker>

      <SourceNote>{AUTONOMY.source}</SourceNote>
    </Section>
  );
}
