/**
 * email.ts — Postmark transactional email helper
 * Sends form submission notifications to director@willowtreefunerals.com.au
 *
 * Primary:  Postmark (POSTMARK_API_TOKEN)
 * Fallback: Resend (RESEND_API_KEY) or SMTP (SMTP_USER + SMTP_PASS)
 */

import * as postmark from "postmark";
import { Resend } from "resend";
import nodemailer from "nodemailer";

const RECIPIENT = "director@willowtreefunerals.com.au";
const FROM_EMAIL = "noreply@adsdaddy.com";
const FROM_NAME = "Willow Tree Funerals Website";

// ── HTML email builder ────────────────────────────────────────────────────────

function buildHtml(subject: string, body: string): string {
  const escaped = body.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f0f4f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%;">
        <tr>
          <td style="background:#1B3A5C;padding:24px 32px;">
            <p style="margin:0;color:#8FA8C8;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Willow Tree Funerals</p>
            <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">${subject.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px;">
            <p style="margin:0 0 16px;color:#64748b;font-size:14px;">A new enquiry has been submitted via the website:</p>
            <pre style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;white-space:pre-wrap;color:#1e293b;">${escaped}</pre>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#94a3b8;font-size:12px;">Sent automatically from willowtreefunerals.com.au</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Postmark ──────────────────────────────────────────────────────────────────

async function sendViaPostmark(opts: { subject: string; body: string; replyTo?: string }): Promise<boolean> {
  const token = process.env.POSTMARK_API_TOKEN;
  if (!token) return false;
  try {
    const client = new postmark.ServerClient(token);
    const result = await client.sendEmail({
      From: `${FROM_NAME} <${FROM_EMAIL}>`,
      To: RECIPIENT,
      ReplyTo: opts.replyTo || RECIPIENT,
      Subject: opts.subject,
      HtmlBody: buildHtml(opts.subject, opts.body),
      TextBody: opts.body,
      MessageStream: "outbound",
    });
    console.log(`[Email/Postmark] Sent: "${opts.subject}" → ${RECIPIENT} (${result.MessageID})`);
    return true;
  } catch (err) {
    console.error("[Email/Postmark] Failed:", err);
    return false;
  }
}

// ── Resend fallback ───────────────────────────────────────────────────────────

async function sendViaResend(opts: { subject: string; body: string; replyTo?: string }): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <onboarding@resend.dev>`,
      to: [RECIPIENT],
      replyTo: opts.replyTo || RECIPIENT,
      subject: opts.subject,
      html: buildHtml(opts.subject, opts.body),
      text: opts.body,
    });
    if (error) { console.error("[Email/Resend] Error:", error); return false; }
    console.log(`[Email/Resend] Sent: "${opts.subject}" → ${RECIPIENT}`);
    return true;
  } catch (err) {
    console.error("[Email/Resend] Exception:", err);
    return false;
  }
}

// ── SMTP fallback ─────────────────────────────────────────────────────────────

async function sendViaSMTP(opts: { subject: string; body: string; replyTo?: string }): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return false;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  try {
    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass }, tls: { rejectUnauthorized: false } });
    await transporter.sendMail({ from: `${FROM_NAME} <${user}>`, to: RECIPIENT, replyTo: opts.replyTo || RECIPIENT, subject: opts.subject, text: opts.body, html: buildHtml(opts.subject, opts.body) });
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
 * Tries Postmark first, then Resend, then SMTP.
 */
export async function sendFormEmail(opts: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<boolean> {
  if (process.env.POSTMARK_API_TOKEN) {
    const sent = await sendViaPostmark(opts);
    if (sent) return true;
  }
  if (process.env.RESEND_API_KEY) {
    const sent = await sendViaResend(opts);
    if (sent) return true;
  }
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const sent = await sendViaSMTP(opts);
    if (sent) return true;
  }
  console.warn("[Email] No email provider configured — add POSTMARK_API_TOKEN to enable email delivery.");
  return false;
}
