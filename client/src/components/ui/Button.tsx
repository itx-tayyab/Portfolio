import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  /**
   * Optional icon. On "primary" it sits in a round knob at the end of the
   * pill (the reference CTA detail); on other variants it sits inline.
   */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type LinkProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof StyleProps | "href"> & {
    href: string;
    /** Opens in a new tab with a safe rel. */
    external?: boolean;
  };

type NativeButtonProps = StyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof StyleProps> & {
    href?: undefined;
  };

export type ButtonProps = LinkProps | NativeButtonProps;

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium select-none " +
  "transition-[background-color,border-color,color,transform] duration-(--duration-ui) ease-out " +
  "active:scale-[0.97] active:duration-(--duration-press) " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-signal-ink hover:bg-signal-hover",
  secondary: "border border-current/50 text-current hover:border-current",
  ghost: "text-current hover:bg-current/10",
};

const sizes: Record<Size, { plain: string; knob: string; knobIcon: string }> = {
  sm: { plain: "min-h-11 px-4 text-label", knob: "min-h-11 pl-4 pr-1.5 text-label", knobIcon: "size-8" },
  md: { plain: "min-h-12 px-6 text-body", knob: "min-h-12 pl-6 pr-1.5 text-body", knobIcon: "size-9" },
};

function buttonStyles({ variant = "primary", size = "md", icon, className }: Omit<StyleProps, "children">) {
  const hasKnob = Boolean(icon) && variant === "primary";
  return cn(base, variants[variant], hasKnob ? sizes[size].knob : sizes[size].plain, className);
}

function ButtonContent({ variant = "primary", size = "md", icon, children }: StyleProps) {
  if (icon && variant === "primary") {
    return (
      <>
        <span>{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "grid place-items-center rounded-full bg-ink text-bone",
            "transition-transform duration-(--duration-ui) ease-out group-hover/button:-rotate-45",
            sizes[size].knobIcon,
          )}
        >
          {icon}
        </span>
      </>
    );
  }
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <span aria-hidden="true" className="inline-flex">
          {icon}
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, icon, children, className, href, external, ...anchorProps } = props;
    const classes = buttonStyles({ variant, size, icon, className });
    const content = (
      <ButtonContent variant={variant} size={size} icon={icon}>
        {children}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </ButtonContent>
    );
    const isPlainAnchor =
      external || anchorProps.download !== undefined || /^(mailto:|tel:|https?:)/.test(href);

    if (isPlainAnchor) {
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { variant, size, icon, children, className, type = "button", ...buttonProps } = props;
  return (
    <button type={type} className={buttonStyles({ variant, size, icon, className })} {...buttonProps}>
      <ButtonContent variant={variant} size={size} icon={icon}>{children}</ButtonContent>
    </button>
  );
}
