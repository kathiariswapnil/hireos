"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui";
import { DEMO_SHEET_WEBAPP_URL } from "@/content/demo";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
  { name: "role", label: "Your role", type: "text", required: true, autoComplete: "organization-title" },
  { name: "ats", label: "ATS in use", type: "text", required: false, autoComplete: "off" },
  { name: "volume", label: "Hires per year (approx.)", type: "text", required: false, autoComplete: "off" },
] as const;

type Status = "idle" | "submitting" | "sent" | "error";

export function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    try {
      /* text/plain + no-cors avoids a CORS preflight; Apps Script still
         receives the JSON body. We cannot read the opaque response. */
      await fetch(DEMO_SHEET_WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...data,
          pageUrl: window.location.href,
        }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-cyan/30 bg-cyan/[0.06] p-8">
        <p className="font-mono text-eyebrow uppercase tracking-wider text-cyan">
          Request received
        </p>
        <h2 className="mt-4 font-display text-title text-text-hi">
          We will be in touch.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-text-mid">
          We will follow up to schedule a walkthrough of one hiring request through the governed workflow.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-text-hi outline-none transition-colors placeholder:text-text-low focus:border-cyan";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <label key={field.name} className="block">
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-text-low">
              {field.label}
              {field.required ? " *" : ""}
            </span>
            <input
              name={field.name}
              type={field.type}
              required={field.required}
              autoComplete={field.autoComplete}
              className={inputClass}
            />
          </label>
        ))}
      </div>
      <label className="block">
        <span className="font-mono text-[0.68rem] uppercase tracking-wider text-text-low">
          What are you hoping to see?
        </span>
        <textarea
          name="notes"
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder="Role families, current ATS, where hiring currently stalls…"
        />
      </label>
      {status === "error" ? (
        <p className="text-sm text-rose">
          The request did not send. Check your connection and try again.
        </p>
      ) : null}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request a demo"}
      </Button>
    </form>
  );
}
