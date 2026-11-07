/**
 * Contact form contract shared by the server action and the form.
 * Keep this file free of server-only code: the form imports the types and
 * limits to mirror them as HTML constraints.
 */

export const projectTypes = [
  "A website or web app",
  "A mobile app",
  "Backend or API work",
  "A full-time role",
  "Something else",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export const limits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 20, max: 5000 },
} as const;

export type ContactField = "name" | "email" | "projectType" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      /** Form-level message (delivery failed, rate limited). */
      message?: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      /** Echoed back so the form keeps what the visitor typed. */
      values: ContactValues;
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates input. Error copy says what's wrong and how to fix it. */
export function validateContact(values: ContactValues): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < limits.name.min) errors.name = "Enter your name.";
  else if (name.length > limits.name.max) errors.name = `Use ${limits.name.max} characters or fewer.`;

  if (!email) errors.email = "Enter your email address so I can reply.";
  else if (email.length > limits.email.max || !EMAIL_PATTERN.test(email))
    errors.email = "Enter an email address in the format name@example.com.";

  if (!projectTypes.includes(values.projectType as ProjectType))
    errors.projectType = "Choose what you’d like to talk about.";

  if (message.length < limits.message.min)
    errors.message = `Add a little more detail: at least ${limits.message.min} characters.`;
  else if (message.length > limits.message.max)
    errors.message = `Shorten your message to ${limits.message.max} characters or fewer.`;

  return errors;
}
