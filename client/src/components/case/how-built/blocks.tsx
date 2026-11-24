import { ArrowUpRight, Check } from "lucide-react";

export function ChallengeContent({ text }: { text: string }) {
  return (
    <>
      <p className="font-display text-eyebrow font-semibold uppercase text-brand">
        The challenge
      </p>
      <h3 className="mt-3 font-display text-h3 font-semibold">What needed to change</h3>
      <p className="mt-4 leading-relaxed text-muted-dark">{text}</p>
    </>
  );
}

export function SolutionContent({ text }: { text: string }) {
  return (
    <>
      <p className="font-display text-eyebrow font-semibold uppercase text-brand-text">
        The architectural solution
      </p>
      <h3 className="mt-3 font-display text-h3 font-semibold">How I approached it</h3>
      <p className="mt-4 leading-relaxed text-muted">{text}</p>
    </>
  );
}

export function CapabilitiesContent({ items }: { items: string[] }) {
  return (
    <>
      <h3 className="font-display text-h3 font-semibold">Core capabilities</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-label text-ink">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
              <Check size={12} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export function TakeawaysContent({ items }: { items: string[] }) {
  return (
    <>
      <h3 className="font-display text-h3 font-semibold">Key takeaways</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-label text-muted">
            <ArrowUpRight aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-brand" />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
