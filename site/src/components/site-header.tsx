"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { StateSpine } from "@/components/state-spine";
import { NAV_LINKS } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  /* A route change should never leave the mobile sheet hanging open. */
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line-soft bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[76rem] items-center gap-6 px-5 sm:px-8">
          <Link
            href="/"
            className="shrink-0"
            aria-label="HireOS home"
            onClick={() => setMenuOpen(false)}
          >
            <Logo gradientId="mark-header" />
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const current = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    current
                      ? "text-text-hi"
                      : "text-text-mid hover:text-text-hi"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/demo"
              className="ml-3 rounded-lg bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:brightness-110"
            >
              Request a demo
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="ml-auto flex size-10 items-center justify-center rounded-md border border-line text-text-mid md:hidden"
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
              ) : (
                <path
                  d="M4 8h16M4 16h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="border-t border-line-soft px-5 pb-5 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-b border-line-soft py-4 text-text-mid"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/demo"
              className="mt-5 block rounded-lg bg-brand-gradient px-4 py-3 text-center text-sm font-semibold text-ink"
            >
              Request a demo
            </Link>
          </nav>
        )}
      </div>

      <StateSpine />
    </header>
  );
}
