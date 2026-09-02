import Image from "next/image";
import { Container, CtaLink } from "@/components/ui";
import { CLOSING } from "@/content/site";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-line-soft">
      <Image
        src="/brand/section-decision.jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="object-cover object-right opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent"
      />

      <Container className="relative py-24 sm:py-32">
        <h2 className="max-w-2xl font-display text-display whitespace-pre-line text-text-hi">
          {CLOSING.title}
        </h2>
        <p className="mt-8 max-w-xl text-lead text-text-mid">{CLOSING.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <CtaLink href="/demo">Request a demo</CtaLink>
          <CtaLink href="/investors" variant="secondary">
            For investors
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
