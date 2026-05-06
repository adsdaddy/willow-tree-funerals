/**
 * email.ts — SMTP email helper for Willow Tree Funerals
 *
 * Sends form submission notifications to director@willowtreefunerals.com.au
 * using Nodemailer. Requires SMTP credentials set via environment variables:
 *
 *   SMTP_HOST     — e.g. smtp.gmail.com  (default: smtp.gmail.com)
 *   SMTP_PORT     — e.g. 587             (default: 587)
 *   SMTP_USER     — sender email address (e.g. noreply@willowtreefunerals.com.au)
 *   SMTP_PASS     — SMTP password or App Password
 *   SMTP_FROM     — "From" display name + address (optional, falls back to SMTP_USER)
 *
 * If SMTP credentials are not configured the function logs a warning and returns
 * false — the caller should fall back to the in-app notifyOwner notification.
 */

import nodemailer from "nodemailer";

const RECIPIENT = "director@willowtreefunerals.com.au";

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

/**
 * Sends a plain-text email to director@willowtreefunerals.com.au.
 * Returns true on success, false if SMTP is not configured or sending fails.
 */
export async function sendFormEmail(opts: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<boolean> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn(
      "[Email] SMTP not configured — set SMTP_USER and SMTP_PASS to enable email delivery."
    );
    return false;
  }

  const from =
    process.env.SMTP_FROM ||
    `Willow Tree Funerals Website <${process.env.SMTP_USER}>`;

  try {
    await transporter.sendMail({
      from,
      to: RECIPIENT,
      replyTo: opts.replyTo || RECIPIENT,
      subject: opts.subject,
      text: opts.body,
      html: `<pre style="font-family:sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;">${opts.body.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`,
    });
    console.log(`[Email] Sent: "${opts.subject}" → ${RECIPIENT}`);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send email:", err);
    return false;
  }
}
