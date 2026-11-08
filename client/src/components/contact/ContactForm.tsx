"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendContactMessage } from "@/app/contact/actions";
import { limits, projectTypes, type ContactField, type ContactState } from "@/lib/contact";
import { cn } from "@/lib/cn";

const initialState: ContactState = { status: "idle" };

// Filled fields, as in the reference contact form. Visible labels above
// each field identify them (the reference relies on placeholders).
const fieldClass =
  "block w-full rounded-input border border-transparent bg-surface px-4 py-3.5 text-body text-ink " +
  "placeholder:text-muted transition-[border-color,background-color] duration-(--duration-ui) ease-out " +
  "hover:border-ink/25 focus-visible:border-ink focus-visible:bg-white " +
  "aria-[invalid=true]:border-danger-ink";

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: ContactField;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-display text-label font-semibold">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-label text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-label font-medium text-danger-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Contact form posting to a Server Action. The permalink lets it submit
 * before JavaScript loads; with JavaScript it shows a pending state, keeps
 * typed values on error and moves focus to what needs fixing.
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState, "/contact");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorSummaryRef = useRef<HTMLParagraphElement>(null);

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? state.values : undefined;

  // After a failed submit, move focus to the first field that needs fixing,
  // or to the form-level message. After success, focus the confirmation.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    } else if (state.status === "error") {
      const first = (["name", "email", "projectType", "message"] as const).find((f) => errors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      else errorSummaryRef.current?.focus();
    }
    // Run only when a new result arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="flex min-h-80 flex-col items-start justify-center">
        <CheckCircle2 aria-hidden="true" size={32} className="text-success-ink" />
        <h3 ref={successRef} tabIndex={-1} className="mt-4 font-display text-h3 font-semibold outline-none">
          Message sent
        </h3>
        <p className="mt-2 max-w-[42ch] text-muted">
          Thanks for getting in touch. I’ll reply to the email address you gave.
        </p>
      </div>
    );
  }

  const describedBy = (id: ContactField, hasHint = false) =>
    [hasHint ? `${id}-hint` : "", errors[id] ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-6">
      {state.status === "error" && state.message ? (
        <p
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-input border border-danger-ink/40 bg-danger-ink/5 px-4 py-3 font-medium text-danger-ink outline-none"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={limits.name.min}
            maxLength={limits.name.max}
            defaultValue={values?.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={limits.email.max}
            defaultValue={values?.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id="projectType" label="What would you like to talk about?" error={errors.projectType}>
        <select
          id="projectType"
          name="projectType"
          required
          defaultValue={values?.projectType ?? ""}
          aria-invalid={errors.projectType ? true : undefined}
          aria-describedby={describedBy("projectType")}
          className={cn(fieldClass, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23151311%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label="Message"
        hint="What you’re building, roughly when, and anything I should know."
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={limits.message.min}
          maxLength={limits.message.max}
          defaultValue={values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", true)}
          className={cn(fieldClass, "resize-y")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-white",
          "transition-[background-color,transform] duration-(--duration-ui) ease-out hover:bg-brand-strong",
          "active:scale-[0.99] active:duration-(--duration-press) disabled:cursor-progress disabled:opacity-70",
        )}
      >
        {isPending ? "Sending…" : "Send a message"}
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {isPending ? "Sending your message" : ""}
      </p>
    </form>
  );
}
