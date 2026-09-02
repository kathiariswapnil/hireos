"use client";

import { useEffect, useRef, useState } from "react";
import { WORKFLOW_STATES } from "@/content/site";

/**
 * The workflow state machine, running as a rail under the header and doubling
 * as scroll progress. Reading down a page advances the requisition through its
 * states, which is the product's core idea expressed as navigation.
 *
 * Decorative in the accessibility tree -- the same states are presented as real
 * content on /platform.
 */
export function StateSpine() {
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeIndex = Math.min(
    WORKFLOW_STATES.length - 1,
    Math.floor(progress * WORKFLOW_STATES.length),
  );

  /* Keep the active state in view without hijacking the page scroll. */
  useEffect(() => {
    const rail = railRef.current;
    const active = activeRef.current;
    if (!rail || !active) return;

    const target =
      active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    rail.scrollTo({
      left: Math.max(0, target),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeIndex]);

  const active = WORKFLOW_STATES[activeIndex];

  return (
    <div
      aria-hidden
      className="relative border-b border-line-soft bg-ink/80 backdrop-blur-md"
    >
      {/* Progress fill for the whole workflow. */}
      <div
        className="absolute inset-y-0 left-0 bg-indigo/[0.07] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
      <span
        className="absolute inset-y-0 w-px bg-cyan/50 transition-[left] duration-150 ease-out"
        style={{ left: `${progress * 100}%` }}
      />

      {/* Wide: the full state machine as a rail. */}
      <div
        ref={railRef}
        className="mask-fade-x hidden overflow-x-hidden py-2 sm:block [scrollbar-width:none]"
      >
        <div className="flex w-max items-center gap-1 px-8">
          {WORKFLOW_STATES.map((state, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            return (
              <span key={state.name} className="flex items-center gap-1">
                {i > 0 && (
                  <span
                    className={`h-px w-3 shrink-0 ${isPast || isActive ? "bg-indigo/60" : "bg-line"}`}
                  />
                )}
                <span
                  ref={isActive ? activeRef : undefined}
                  className={`flex items-center gap-1.5 rounded px-1.5 py-0.5 font-mono text-[0.6rem] tracking-wider whitespace-nowrap transition-colors duration-300 ${
                    isActive
                      ? "bg-cyan/10 text-cyan"
                      : isPast
                        ? "text-text-low"
                        : "text-line"
                  }`}
                >
                  {state.gated && (
                    <span
                      className={`gate-node size-1.5 shrink-0 ${
                        isActive || isPast ? "bg-amber" : "bg-line"
                      }`}
                    />
                  )}
                  {state.name}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Narrow: just the current state. */}
      <div className="flex items-center gap-2 px-5 py-1.5 sm:hidden">
        {active.gated && <span className="gate-node size-1.5 bg-amber" />}
        <span className="font-mono text-[0.6rem] tracking-wider text-cyan">
          {active.name}
        </span>
        <span className="ml-auto font-mono text-[0.6rem] text-text-low">
          {activeIndex + 1}/{WORKFLOW_STATES.length}
        </span>
      </div>
    </div>
  );
}
