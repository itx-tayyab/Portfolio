import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

/**
 * Cutout portrait in an arch on a bone panel (adapted from the reference's
 * arch-masked photos). Percentage radii are deliberate: a 9999px radius
 * would make the browser scale all corners down and flatten the bottom ones.
 */
export function Portrait({ className }: { className?: string }) {
  const { cutout, alt } = profile.portrait;
  return (
    <div
      className={cn("relative aspect-[4/5] overflow-hidden bg-bone", className)}
      style={{ borderRadius: "50% 50% 1.75rem 1.75rem / 40% 40% 1.75rem 1.75rem" }}
    >
      <Image
        src={cutout.src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 24rem, 22rem"
        className="translate-y-[6%] scale-[1.06] object-cover object-[50%_20%]"
      />
    </div>
  );
}
