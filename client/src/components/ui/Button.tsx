import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Pill buttons from the reference designs: uppercase label, and on the
 * primary/dark variants a round "knob" holding the icon ("DISCOVER MORE").
 *
 * primary   orange pill, white text, dark knob
 * dark      near-black pill, white text, orange knob ("SEND A MESSAGE")
 * secondary outlined pill in the current text color
 * ghost     text only
 */
type Variant = "primary" | "dark" | "secondary" | "ghost";
type Size = "sm" | "md";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type LinkProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof StyleProps | "href"> & {
    href: string;
    /** Opens in a new tab with a safe rel, and says so to screen readers. */
    external?: boolean;
  };

type NativeButtonProps = StyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof StyleProps> & {
    href?: undefined;
  };

export type ButtonProps = LinkProps | NativeButtonProps;

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-3 rounded-full font-display font-semibold uppercase tracking-[0.04em] select-none " +
  "transition-[background-color,border-color,color,transform] duration-(--duration-ui) ease-out " +
  "active:scale-[0.97] active:duration-(--duration-press) " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-strong text-white hover:bg-ink",
  dark: "bg-ink text-white hover:bg-brand-strong",
  secondary: "border border-current/50 text-current hover:border-current",
  ghost: "text-current hover:text-brand-text",
};

const knobColors: Partial<Record<Variant, string>> = {
  primary: "bg-ink text-white group-hover/button:bg-brand",
  dark: "bg-brand text-white group-hover/button:bg-ink",
};

const sizes: Record<Size, { plain: string; knob: string; knobIcon: string }> = {
  sm: { plain: "min-h-11 px-5 text-[0.75rem]", knob: "min-h-11 pl-5 pr-1.5 text-[0.75rem]", knobIcon: "size-8" },
  md: { plain: "min-h-12 px-7 text-[0.8125rem]", knob: "min-h-12 pl-7 pr-1.5 text-[0.8125rem]", knobIcon: "size-9" },
};

function buttonStyles({ variant = "primary", size = "md", icon, className }: Omit<StyleProps, "children">) {
  const hasKnob = Boolean(icon) && Boolean(knobColors[variant]);
  return cn(base, variants[variant], hasKnob ? sizes[size].knob : sizes[size].plain, className);
}

function ButtonContent({ variant = "primary", size = "md", icon, children }: StyleProps) {
  const knob = knobColors[variant];
  if (icon && knob) {
    return (
      <>
        <span>{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "grid place-items-center rounded-full transition-[background-color,transform] duration-(--duration-ui) ease-out group-hover/button:-rotate-45",
            knob,
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
      <ButtonContent variant={variant} size={size} icon={icon}>
        {children}
      </ButtonContent>
    </button>
  );
}
