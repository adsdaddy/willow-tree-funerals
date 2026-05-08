/**
 * email.ts — Email delivery for Willow Tree Funerals
 *
 * Sends form submission notifications to director@willowtreefunerals.com.au
 *
 * Strategy (in priority order):
 *  1. Resend API  — set RESEND_API_KEY (recommended, free tier: 3,000 emails/month)
 *  2. SMTP        — set SMTP_USER + SMTP_PASS (Gmail App Password, etc.)
 *
 * If neither is configured the function logs a warning and returns false.
 * The caller always also fires notifyOwner() as an in-app fallback.
 */

import { Resend } from "resend";
import nodemailer from "nodemailer";

const RECIPIENT = "director@willowtreefunerals.com.au";
const FROM_NAME = "Willow Tree Funerals Website";
// Resend requires a verified sender domain. Until the domain is verified,
// use the onboarding address which works for any recipient on the free plan.
const FROM_RESEND = `${FROM_NAME} <onboarding@resend.dev>`;

// ── Resend ────────────────────────────────────────────────────────────────────

async function sendViaResend(opts: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_RESEND,
      to: [RECIPIENT],
      replyTo: opts.replyTo || RECIPIENT,
      subject: opts.subject,
      text: opts.body,
      html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.7;max-width:640px;color:#1a1a1a;">
        <h2 style="color:#1a3a6b;margin-bottom:8px;">${opts.subject.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</h2>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
        <pre style="white-space:pre-wrap;font-family:inherit;">${opts.body.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
        <p style="color:#6b7280;font-size:12px;">Sent from willowtreefunerals.com.au</p>
      </div>`,
    });

    if (error) {
      console.error("[Email/Resend] Send error:", error);
      return false;
    }

    console.log(`[Email/Resend] Sent: "${opts.subject}" → ${RECIPIENT}`);
    return true;
  } catch (err) {
    console.error("[Email/Resend] Exception:", err);
    return false;
  }
}

// ── SMTP (nodemailer fallback) ─────────────────────────────────────────────────

async function sendViaSMTP(opts: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return false;

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  const from = process.env.SMTP_FROM || `${FROM_NAME} <${user}>`;

  try {
    await transporter.sendMail({
      from,
      to: RECIPIENT,
      replyTo: opts.replyTo || RECIPIENT,
      subject: opts.subject,
      text: opts.body,
      html: `<pre style="font-family:sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;">${opts.body.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`,
    });
    console.log(`[Email/SMTP] Sent: "${opts.subject}" → ${RECIPIENT}`);
    return true;
  } catch (err) {
    console.error("[Email/SMTP] Failed:", err);
    return false;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Sends an email notification to director@willowtreefunerals.com.au.
 * Tries Resend first, then SMTP. Returns true if either succeeds.
 */
export async function sendFormEmail(opts: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<boolean> {
  // Try Resend first (preferred)
  if (process.env.RESEND_API_KEY) {
    const sent = await sendViaResend(opts);
    if (sent) return true;
  }

  // Fall back to SMTP
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const sent = await sendViaSMTP(opts);
    if (sent) return true;
  }

  console.warn(
    "[Email] No email provider configured. " +
    "Add RESEND_API_KEY (recommended) or SMTP_USER + SMTP_PASS to enable email delivery."
  );
  return false;
}
