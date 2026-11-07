/**
 * Shared motion values. Mirrors the CSS tokens in globals.css so JS-driven
 * animation (framer-motion) and CSS transitions feel identical.
 */
import type { Transition } from "framer-motion";

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const duration = {
  press: 0.12,
  ui: 0.2,
  reveal: 0.6,
} as const;

/** Spring used for layout-linked indicators (nav, filter chips). */
export const indicatorSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
};

export const uiTransition: Transition = {
  duration: duration.ui,
  ease: ease.out,
};
