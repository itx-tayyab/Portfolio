import { Send } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/cn";

/**
 * The two direct-contact actions: a mailto button with a take-off icon and
 * a clipboard button with in-place confirmation.
 */
export function ContactActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Button
        href={`mailto:${profile.email}`}
        variant="dark"
        icon={
          <Send
            size={16}
            className="transition-transform duration-300 ease-out group-hover/button:-translate-y-1 group-hover/button:translate-x-1"
          />
        }
        className="hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgb(244_91_22/0.45)]"
      >
        Write an email
      </Button>
      <CopyButton value={profile.email} label="email address" />
    </div>
  );
}
