"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AUTONOMY, type AutonomyMode } from "@/content/site";
import { PayloadView } from "./payloads";
import {
  BEATS,
  MODE_NOTE,
  MODE_TIMING,
  REVISION_BEAT,
  type Actor,
  type Beat,
} from "./script";

const ACTOR_LABEL: Record<Actor, string> = {
  human: "Human",
  ai: "AI",
  policy: "Policy",
  system: "System",
};

const ACTOR_STYLE: Record<Actor, string> = {
  human: "border-amber/40 bg-amber/10 text-amber",
  ai: "border-cyan/40 bg-cyan/10 text-cyan",
  policy: "border-indigo/40 bg-indigo/10 text-indigo",
  system: "border-line bg-surface-2 text-text-low",
};

type PlayedBeat = Beat & { key: string };

export function WorkflowConsole() {
  const [mode, setMode] = useState<AutonomyMode>("Assisted");
  const [played, setPlayed] = useState<PlayedBeat[]>([]);
  const [cursor, setCursor] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  /** Set while the revision beat is showing, so the gate replays after it. */
  const [revising, setRevising] = useState(false);

  const reduceMotion = useReducedMotion();
  const transcriptRef = useRef<HTMLDivElement>(null);
  const revisionCount = useRef(0);

  const current = played.at(-1);
  const atGate = Boolean(current?.gate) && !revising;
  const finished = cursor >= BEATS.length && !atGate;

  const pushBeat = useCallback((beat: Beat, suffix = "") => {
    setPlayed((prev) => [...prev, { ...beat, key: `${beat.id}${suffix}` }]);
  }, []);

  const advance = useCallback(() => {
    if (cursor >= BEATS.length) {
      setRunning(false);
      return;
    }
    pushBeat(BEATS[cursor]);
    setCursor((i) => i + 1);
  }, [cursor, pushBeat]);

  const start = useCallback(() => {
    setStarted(true);
    setPlayed([]);
    setCursor(0);
    setRevising(false);
    revisionCount.current = 0;
    pushBeat(BEATS[0]);
    setCursor(1);
    setRunning(MODE_TIMING[mode] > 0);
  }, [mode, pushBeat]);

  const reset = useCallback(() => {
    setStarted(false);
    setRunning(false);
    setPlayed([]);
    setCursor(0);
    setRevising(false);
    revisionCount.current = 0;
  }, []);

  /* Auto-advance, unless a gate is waiting or the mode requires a click. */
  useEffect(() => {
    if (!running || atGate || revising || cursor >= BEATS.length) return;
    const delay = MODE_TIMING[mode];
    if (delay === 0) return;

    const timer = setTimeout(advance, reduceMotion ? 400 : delay);
    return () => clearTimeout(timer);
  }, [running, atGate, revising, cursor, mode, advance, reduceMotion]);

  /* Keep the newest beat in view inside the transcript. */
  useEffect(() => {
    const el = transcriptRef.current;
    if (!el || played.length === 0) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [played.length, reduceMotion]);

  const approve = () => {
    setRunning(MODE_TIMING[mode] > 0);
    advance();
  };

  const sendComment = () => {
    revisionCount.current += 1;
    setRevising(true);
    pushBeat(REVISION_BEAT, `-${revisionCount.current}`);
  };

  /* After a revision, the same approval gate is reissued. */
  const returnToGate = () => {
    setRevising(false);
    const gateBeat = BEATS[cursor - 1];
    pushBeat(gateBeat, `-again-${revisionCount.current}`);
  };

  const auditEntries = played.filter((beat) => !beat.gate || beat !== current);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-2xl shadow-ink/60">
      {/* Console chrome: autonomy mode is the operator's control. */}
      <div className="flex flex-col gap-4 border-b border-line bg-ink/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Autonomy mode"
          className="flex rounded-lg border border-line bg-surface p-1"
        >
          {AUTONOMY.modes.map((option) => {
            const selected = option.name === mode;
            return (
              <button
                key={option.name}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setMode(option.name);
                  reset();
                }}
                className={`rounded-md px-3 py-1.5 font-mono text-[0.68rem] tracking-wide transition-colors ${
                  selected
                    ? "bg-brand-gradient font-semibold text-ink"
                    : "text-text-low hover:text-text-hi"
                }`}
              >
                {option.name}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.62rem] text-text-low">
            {current ? current.state : "IDLE"}
          </span>
          {!started ? (
            <button
              type="button"
              onClick={start}
              className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-ink transition-all hover:brightness-110"
            >
              Run the workflow
            </button>
          ) : (
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-line px-4 py-2 text-sm text-text-mid transition-colors hover:border-cyan/50 hover:text-text-hi"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <p className="border-b border-line-soft bg-surface/40 px-4 py-3 text-xs leading-relaxed text-text-mid">
        <span className="font-mono text-[0.62rem] uppercase tracking-wider text-cyan">
          {mode}
        </span>
        <span className="mx-2 text-line">·</span>
        {MODE_NOTE[mode]}
      </p>

      <div className="grid lg:grid-cols-[1.55fr_1fr]">
        {/* Transcript */}
        <div
          ref={transcriptRef}
          className="max-h-[34rem] overflow-y-auto p-4 sm:p-6 lg:border-r lg:border-line-soft"
        >
          {!started ? (
            <IdlePrompt onStart={start} />
          ) : (
            <ol className="space-y-6">
              <AnimatePresence initial={false}>
                {played.map((beat, i) => (
                  <motion.li
                    key={beat.key}
                    initial={
                      reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <BeatView
                      beat={beat}
                      index={i}
                      isCurrent={i === played.length - 1}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          )}

          {/* Human gate: the workflow stops here in every mode. */}
          {atGate && current?.gate && (
            <div className="mt-6 rounded-xl border border-amber/40 bg-amber/[0.06] p-5">
              <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-wider text-amber">
                <span aria-hidden className="gate-node size-2 bg-amber" />
                Human decision required · {current.state}
              </p>
              <p className="mt-3 text-sm text-text-hi">{current.gate.prompt}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={approve}
                  className="rounded-lg bg-amber px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:brightness-110"
                >
                  {current.gate.approveLabel}
                </button>
                {current.gate.commentLabel && (
                  <button
                    type="button"
                    onClick={sendComment}
                    className="rounded-lg border border-line px-4 py-2.5 text-sm text-text-mid transition-colors hover:border-amber/50 hover:text-text-hi"
                  >
                    {current.gate.commentLabel}
                  </button>
                )}
              </div>
            </div>
          )}

          {revising && (
            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface-2 p-5">
              <p className="flex-1 text-sm text-text-mid">
                Revised and resubmitted. The gate reopens — approval is never
                skipped because a revision happened.
              </p>
              <button
                type="button"
                onClick={returnToGate}
                className="rounded-lg border border-line px-4 py-2.5 text-sm text-text-hi transition-colors hover:border-cyan/50"
              >
                Back to approval
              </button>
            </div>
          )}

          {/* Copilot mode: the human executes every step. */}
          {started && !atGate && !revising && !finished && MODE_TIMING[mode] === 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface-2 p-5">
              <p className="flex-1 text-sm text-text-mid">
                Copilot mode. The next action is prepared but will not run until
                you execute it.
              </p>
              <button
                type="button"
                onClick={advance}
                className="rounded-lg border border-cyan/50 px-4 py-2.5 text-sm text-text-hi transition-colors hover:bg-cyan/10"
              >
                Execute next step
              </button>
            </div>
          )}

          {finished && (
            <div className="mt-6 rounded-xl border border-cyan/30 bg-cyan/[0.05] p-5">
              <p className="text-sm leading-relaxed text-text-hi">
                That is the MVP wedge, end to end. Scheduling, interview
                intelligence and offers extend the same state machine in V2 and
                V3.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 rounded-lg border border-line px-4 py-2.5 text-sm text-text-mid transition-colors hover:border-cyan/50 hover:text-text-hi"
              >
                Run it again
              </button>
            </div>
          )}
        </div>

        {/* Audit ledger */}
        <div className="border-t border-line-soft bg-ink/40 p-4 sm:p-6 lg:border-t-0">
          <p className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-wider text-text-low">
            Audit ledger
            <span className="text-cyan">{auditEntries.length} entries</span>
          </p>

          {auditEntries.length === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-text-low">
              Every AI action and every human decision lands here, with an
              actor, a timestamp and a model plus prompt version. This is the
              artifact procurement and legal actually sign off on.
            </p>
          ) : (
            <ol className="mt-4 space-y-0">
              {auditEntries.map((beat, i) => (
                <motion.li
                  key={`${beat.key}-audit`}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 border-b border-line-soft py-2.5 last:border-0"
                >
                  <span className="shrink-0 font-mono text-[0.58rem] text-line">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-mono text-[0.66rem] leading-snug text-text-mid">
                      {beat.audit.action}
                    </span>
                    <span
                      className={`mt-1 inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[0.55rem] ${ACTOR_STYLE[beat.actor]}`}
                    >
                      {beat.audit.actor}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <p className="border-t border-line-soft bg-ink/60 px-4 py-3 font-mono text-[0.6rem] leading-relaxed text-text-low">
        Scripted demonstration of the MVP wedge. No live model calls — the
        product is pre-launch.
      </p>
    </div>
  );
}

function IdlePrompt({ onStart }: { onStart: () => void }) {
  return (
    <div className="py-8 text-center">
      <p className="mx-auto max-w-md text-lead text-text-mid">
        A hiring manager types one sentence. Watch it become a governed
        workflow, with the policy engine and two human gates doing their jobs
        along the way.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 rounded-lg bg-brand-gradient px-5 py-3 text-sm font-semibold text-ink transition-all hover:brightness-110"
      >
        Run the workflow
      </button>
    </div>
  );
}

function BeatView({
  beat,
  index,
  isCurrent,
}: {
  beat: PlayedBeat;
  index: number;
  isCurrent: boolean;
}) {
  return (
    <div className={isCurrent ? "" : "opacity-70 transition-opacity"}>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="font-mono text-[0.58rem] text-line">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[0.58rem] tracking-wider ${ACTOR_STYLE[beat.actor]}`}
        >
          {ACTOR_LABEL[beat.actor]}
        </span>
        <span className="font-mono text-[0.62rem] text-text-low">
          {beat.by}
        </span>
        <span className="ml-auto font-mono text-[0.58rem] text-line">
          {beat.state}
        </span>
      </div>

      <h3 className="mt-3 text-base font-semibold text-text-hi">
        {beat.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-text-mid">
        {beat.detail}
      </p>

      {beat.payload && (
        <div className="mt-4">
          <PayloadView payload={beat.payload} />
        </div>
      )}
    </div>
  );
}
