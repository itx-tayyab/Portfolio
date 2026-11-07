import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * Shared renderer for social preview (Open Graph) images, 1200×630.
 * Mirrors the site: ink background, bone display type, and the signal
 * band from the home page carrying a short stack line.
 *
 * The font is bundled (SIL Open Font License) because the image renderer
 * needs raw font data and can't use next/font.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const colors = {
  ink: "#151311",
  bone: "#F1ECE4",
  stone: "#A69D92",
  signal: "#FF5B1F",
};

type OgProps = {
  /** Small line above the title. */
  kicker: string;
  title: string;
  /** One sentence under the title. */
  summary?: string;
  /** Items for the orange band. */
  band: string[];
};

export async function renderOgImage({ kicker, title, summary, band }: OgProps) {
  const font = await readFile(join(process.cwd(), "src/app/_og/BricolageGrotesque-SemiBold.ttf"));
  const titleSize = title.length > 28 ? 84 : 112;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: colors.ink,
          color: colors.bone,
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "72px 80px 0" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: colors.stone }}>
            <div
              style={{ width: 14, height: 14, borderRadius: 999, background: colors.signal, marginRight: 18 }}
            />
            {kicker}
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: titleSize,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {summary ? (
            <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.3, color: colors.stone, maxWidth: 940 }}>
              {summary}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 110,
            padding: "0 80px",
            background: colors.signal,
            color: colors.ink,
            fontSize: 40,
          }}
        >
          {band.map((item, i) => (
            <div key={item} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 ? (
                <div
                  style={{
                    width: 14,
                    height: 14,
                    background: colors.ink,
                    transform: "rotate(45deg)",
                    margin: "0 30px",
                  }}
                />
              ) : null}
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Bricolage", data: font, weight: 600, style: "normal" }],
    },
  );
}

export const defaultKicker = `${profile.name}, ${profile.role.toLowerCase()}`;
