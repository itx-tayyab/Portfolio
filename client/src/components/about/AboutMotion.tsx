"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Wraps the About animations so they respect the visitor's reduced-motion
 * setting. The data attribute gives globals.css a no-JS fallback: Framer
 * server-renders the hidden initial styles, so without JavaScript the CSS
 * makes that content visible again.
 */
export function AboutMotion({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div data-motion-root>{children}</div>
    </MotionConfig>
  );
}
