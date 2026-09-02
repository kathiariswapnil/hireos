import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui";

/** Shared masthead for the inner pages, using the deck's section artwork. */
export function PageHero({
  eyebrow,
  title,
  lead,
  art,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  art: "orchestration" | "governance" | "decision" | "memory";
}) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft">
      <Image
        src={`/brand/section-${art}.jpg`}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden
        className="object-cover object-right opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/30"
      />

      <Container className="relative py-20 sm:py-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-title text-text-hi">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lead text-text-mid">{lead}</p>
      </Container>
    </section>
  );
}
