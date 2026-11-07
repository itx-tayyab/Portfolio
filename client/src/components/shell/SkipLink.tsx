/** First focusable element on every page; jumps keyboard users past the header. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-signal px-5 py-3 font-medium text-signal-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50"
    >
      Skip to content
    </a>
  );
}
