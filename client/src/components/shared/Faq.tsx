import { Plus } from "lucide-react";

export type FaqItem = { id: string; question: string; answer: string };

/**
 * Reusable FAQ list on native <details>, so it works without JavaScript and
 * is keyboard accessible. Styled with the existing card surface and the
 * round black "+" button from the service cards.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <details className="group/faq rounded-card bg-surface">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 md:px-8 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-h4 font-semibold">{item.question}</span>
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition-[background-color,transform] duration-(--duration-ui) ease-out group-open/faq:rotate-45 group-open/faq:bg-brand-strong"
              >
                <Plus size={20} />
              </span>
            </summary>
            <p className="max-w-[64ch] px-6 pb-6 text-muted md:px-8">{item.answer}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
