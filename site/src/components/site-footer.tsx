import Link from "next/link";
import { Logo } from "@/components/logo";
import { BRAND } from "@/content/site";

const FOOTER_GROUPS = [
  {
    heading: "Platform",
    links: [
      { href: "/platform#modules", label: "Product modules" },
      { href: "/platform#workflow", label: "Workflow state machine" },
      { href: "/platform#agents", label: "Agent architecture" },
      { href: "/platform#memory", label: "Company hiring memory" },
      { href: "/platform#integrations", label: "Integrations" },
      { href: "/platform#api", label: "API surface" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { href: "/security#architecture", label: "Security architecture" },
      { href: "/security#untrusted", label: "Untrusted input boundary" },
      { href: "/security#responsible-ai", label: "Responsible AI" },
      { href: "/security#controls", label: "Controls" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/investors", label: "Investors" },
      { href: "/investors#ask", label: "The round" },
      { href: "/demo", label: "Request a demo" },
      { href: "/#design-partners", label: "Design partner program" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft bg-surface/30">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo gradientId="mark-footer" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-mid">
              {BRAND.descriptor}
            </p>
            <p className="mt-6 font-mono text-xs leading-relaxed text-cyan">
              {BRAND.tagline}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 className="font-mono text-eyebrow uppercase text-text-low">
                  {group.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-mid transition-colors hover:text-text-hi"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-soft pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.68rem] text-text-low">
            {BRAND.entity} · {BRAND.email} · {BRAND.phone}
          </p>
          <p className="font-mono text-[0.68rem] text-text-low">
            Pre-product and pre-revenue. Nothing here is a customer claim.
          </p>
        </div>
      </div>
    </footer>
  );
}
