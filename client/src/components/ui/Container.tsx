import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/** Page-width wrapper: 1240px max, 16px gutters on mobile, 24px from sm. */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag className={cn("mx-auto w-full max-w-page px-4 sm:px-6", className)} {...props} />
  );
}
