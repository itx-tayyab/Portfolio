/**
 * Decorative graphics for the hero, after reference image 1. All are
 * aria-hidden and generated at build time (server component), so they cost
 * no JavaScript.
 */

/** Fine wavy lines fanning across the top-right corner. */
export function WavyLines({ className }: { className?: string }) {
  const lines = Array.from({ length: 16 }, (_, i) => {
    const o = i * 14;
    return `M ${-40 + o} 0 C ${180 + o} ${90 + o * 0.6}, ${260 + o} ${-40 + o * 0.4}, ${520 + o} ${120 + o * 0.9} S ${760 + o} ${60 + o * 0.5}, ${980 + o} ${220 + o * 0.7}`;
  });
  return (
    <svg aria-hidden="true" viewBox="0 0 900 420" fill="none" preserveAspectRatio="xMidYMin slice" className={className}>
      {lines.map((d, i) => (
        <path key={i} d={d} stroke="white" strokeOpacity={0.07 + (i % 4) * 0.012} strokeWidth="1" />
      ))}
    </svg>
  );
}

/**
 * Dotted sphere: one element. A repeating dot pattern is faded out through a
 * radial mask, brighter toward the upper left for depth. (Drawing each dot
 * as an SVG circle cost ~1,000 DOM nodes and measurable main-thread time.)
 */
export function DottedSphere({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        backgroundImage: "radial-gradient(circle, rgb(255 255 255 / 0.42) 1.3px, transparent 1.8px)",
        backgroundSize: "9px 9px",
        maskImage:
          "radial-gradient(circle at 38% 36%, black 0%, rgb(0 0 0 / 0.55) 38%, rgb(0 0 0 / 0.18) 62%, transparent 71%)",
        WebkitMaskImage:
          "radial-gradient(circle at 38% 36%, black 0%, rgb(0 0 0 / 0.55) 38%, rgb(0 0 0 / 0.18) 62%, transparent 71%)",
        borderRadius: "9999px",
      }}
    />
  );
}

/** Dashed looping flight path ending in a paper plane, beside the portrait. */
export function PaperPlaneDoodle({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 140" fill="none" className={className}>
      <path
        d="M8 70 C 10 30, 60 10, 78 36 C 92 56, 64 80, 52 60 C 40 38, 90 20, 132 52"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
      <g transform="translate(128 46) rotate(28)">
        <path d="M0 0 L58 22 L18 30 Z" fill="white" />
        <path d="M18 30 L58 22 L26 46 Z" fill="#d9d9d9" />
        <path d="M18 30 L26 46 L22 32 Z" fill="#bdbdbd" />
      </g>
    </svg>
  );
}

/** Large faint word set vertically on the right edge. */
export function GhostWord({ word, className }: { word: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      {word}
    </span>
  );
}
