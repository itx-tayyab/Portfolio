/**
 * Contact delivery settings, read from environment variables (server only).
 *
 *   RESEND_API_KEY      required. API key from resend.com.
 *   CONTACT_TO_EMAIL    required. Where messages are delivered.
 *   CONTACT_FROM_EMAIL  optional. A sender on a domain verified in Resend.
 *                       Defaults to Resend's shared test sender, which can
 *                       only deliver to the Resend account owner's address.
 *   RESEND_API_URL      optional. Override the API base (used for testing).
 *
 * The contact page is static, so it reads these at build time: after adding
 * or changing them in Vercel, redeploy.
 */
export type ContactConfig = {
  apiKey: string;
  to: string;
  from: string;
  apiUrl: string;
};

export function contactConfig(): ContactConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return null;
  return {
    apiKey,
    to,
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio contact <onboarding@resend.dev>",
    apiUrl: (process.env.RESEND_API_URL || "https://api.resend.com").replace(/\/$/, ""),
  };
}
