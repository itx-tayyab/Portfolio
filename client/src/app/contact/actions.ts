"use server";

import { headers } from "next/headers";
import {
  validateContact,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";
import { contactConfig } from "./config";

/**
 * Best-effort rate limit: 5 messages per IP per 10 minutes, kept in memory.
 * On serverless hosting each instance has its own memory, so this slows
 * abuse rather than guaranteeing a hard cap. The honeypot does most of the
 * work against bots.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 1000) {
    for (const [key, times] of recent) {
      if (times.every((t) => now - t >= WINDOW_MS)) recent.delete(key);
    }
  }
  return hits.length > MAX_PER_WINDOW;
}

function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Strips line breaks so user input can't add lines to the subject. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: ContactValues = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    projectType: read(formData, "projectType"),
    message: read(formData, "message"),
  };

  // Honeypot: a field people never see. If it's filled, a bot filled it.
  // Report success so the bot moves on, but send nothing.
  if (read(formData, "company")) return { status: "success" };

  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  const config = contactConfig();
  if (!config) {
    return {
      status: "error",
      message: "The contact form isn’t set up yet. Email me directly instead.",
      values,
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "You’ve sent several messages in a short time. Wait a few minutes, or email me directly.",
      values,
    };
  }

  const name = oneLine(values.name);
  const email = values.email.trim();
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `About: ${values.projectType}`,
    "",
    values.message.trim(),
  ].join("\n");

  try {
    // Resend REST API (https://resend.com/docs/api-reference/emails/send-email).
    // Plain fetch keeps the project free of an SDK dependency.
    const res = await fetch(`${config.apiUrl}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: email,
        subject: oneLine(`Portfolio: ${values.projectType}, from ${name}`),
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Contact form: Resend responded", res.status, await res.text().catch(() => ""));
      throw new Error(`Resend ${res.status}`);
    }
  } catch (error) {
    console.error("Contact form: delivery failed", error);
    return {
      status: "error",
      message: "Your message couldn’t be sent. Try again, or email me directly.",
      values,
    };
  }

  return { status: "success" };
}
