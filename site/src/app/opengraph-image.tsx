import { ImageResponse } from "next/og";
import { BRAND } from "@/content/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${BRAND.name} — ${BRAND.tagline}`;

/**
 * Rendered in code rather than shipped as a flat PNG so the wordmark and
 * tagline stay crisp and stay in sync with content/site.ts.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1100px 620px at 88% 42%, #16255B 0%, #0B1224 45%, #070A14 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gate-node field, echoing the deck cover artwork. */}
        {[
          { x: 690, y: 96, s: 26, c: "#4F6BFF" },
          { x: 820, y: 168, s: 20, c: "#22D3EE" },
          { x: 960, y: 108, s: 22, c: "#4F6BFF" },
          { x: 748, y: 268, s: 24, c: "#F59E0B" },
          { x: 900, y: 330, s: 18, c: "#4F6BFF" },
          { x: 1040, y: 248, s: 22, c: "#22D3EE" },
          { x: 812, y: 430, s: 20, c: "#4F6BFF" },
          { x: 968, y: 476, s: 26, c: "#F59E0B" },
          { x: 1088, y: 392, s: 18, c: "#4F6BFF" },
        ].map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.s,
              height: d.s,
              background: d.c,
              opacity: 0.85,
              transform: "rotate(45deg)",
              borderRadius: 3,
            }}
          />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="46" height="46" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0.35" y2="1">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="55%" stopColor="#4F6BFF" />
                <stop offset="100%" stopColor="#2F45C7" />
              </linearGradient>
            </defs>
            <rect x="9" y="4" width="19" height="92" rx="9.5" fill="url(#g)" />
            <rect x="72" y="4" width="19" height="92" rx="9.5" fill="url(#g)" />
            <rect x="26" y="46.5" width="48" height="7" fill="url(#g)" />
            <rect
              x="36"
              y="36"
              width="28"
              height="28"
              rx="2"
              transform="rotate(45 50 50)"
              fill="#22D3EE"
            />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#FFFFFF" }}>
            HireOS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#22D3EE",
              marginBottom: 26,
            }}
          >
            Enterprise agentic hiring
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#FFFFFF",
              letterSpacing: -1.5,
            }}
          >
            <div>AI executes.</div>
            <div>Company policy governs.</div>
            <div>Humans decide.</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#A9B4D0",
          }}
        >
          <div style={{ width: 56, height: 3, background: "#4F6BFF" }} />
          <div>{BRAND.descriptor}</div>
        </div>
      </div>
    ),
    size,
  );
}
