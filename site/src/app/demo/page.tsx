import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { DemoForm } from "@/components/demo-form";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "Book a HireOS walkthrough. We will run one hiring request through the governed workflow — requisition, JD, policy, approval, candidate intelligence, shortlist.",
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Design partner program"
        title="Request a demo"
        lead="Tell us how you hire today. We will walk one real requisition through HireOS — AI does the work, your policy engine governs, your team keeps every consequential decision."
        art="decision"
      />
      <section className="border-b border-line-soft py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <DemoForm />
            <aside className="space-y-8 lg:pt-2">
              <div>
                <p className="font-mono text-eyebrow uppercase tracking-wider text-cyan">
                  What we will cover
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-text-mid">
                  <li>One natural-language hiring request becoming a governed workflow</li>
                  <li>Policy engine blocking an out-of-band salary before a human ever sees it</li>
                  <li>Evidence-based shortlist — matched requirements, gaps, confidence — not a black-box score</li>
                  <li>What a paid pilot looks like for one business unit</li>
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="font-mono text-eyebrow uppercase tracking-wider text-amber">
                  Who this is for
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-mid">
                  TA leaders, HR ops, and hiring managers at companies that already run an ATS and want orchestration and governance on top of it — not another system to rip and replace.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
