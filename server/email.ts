/**
 * email.ts  -  Postmark transactional email helper
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

/**
 * Parses a plain-text body ("Key: Value" lines) into an array of {label, value} pairs.
 * Sections like "=== Title ===" become section headers.
 * Blank lines and separator lines (---) are skipped.
 */
function parseFields(body: string): Array<{ type: "section" | "field" | "message"; label?: string; value: string }> {
  const rows: Array<{ type: "section" | "field" | "message"; label?: string; value: string }> = [];
  const lines = body.split("\n");
  let inMessage = false;
  let messageLines: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line === "---" || line.startsWith("Submitted via") || line.startsWith("Reply to:")) continue;

    // Section header: === Title ===
    if (line.startsWith("===") && line.endsWith("===")) {
      if (inMessage && messageLines.length) {
        rows.push({ type: "message", value: messageLines.join("\n") });
        messageLines = []; inMessage = false;
      }
      rows.push({ type: "section", value: line.replace(/===/g, "").trim() });
      continue;
    }

    // Message block start
    if (line === "Message:" || line === "Notes:") {
      inMessage = true; continue;
    }
    if (inMessage) {
      messageLines.push(line); continue;
    }

    // Key: Value field
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const label = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      rows.push({ type: "field", label, value: value || " - " });
    } else {
      rows.push({ type: "field", value: line });
    }
  }
  if (inMessage && messageLines.length) {
    rows.push({ type: "message", value: messageLines.join("\n") });
  }
  return rows;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildHtml(subject: string, body: string, replyTo?: string): string {
  const fields = parseFields(body);
  const now = new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney", dateStyle: "full", timeStyle: "short" });

  const fieldRows = fields.map(f => {
    if (f.type === "section") {
      return `<tr><td colspan="2" style="padding:20px 0 8px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#4A6FA5;border-bottom:2px solid #E8F0FB;">${esc(f.value)}</td></tr>`;
    }
    if (f.type === "message") {
      return `<tr>
        <td valign="top" style="padding:10px 0;width:140px;font-size:13px;font-weight:600;color:#64748b;">Message</td>
        <td style="padding:10px 0 10px 16px;font-size:14px;color:#1e293b;line-height:1.7;white-space:pre-wrap;background:#F8FAFC;border-radius:6px;padding:12px 16px;border-left:3px solid #4A6FA5;">${esc(f.value)}</td>
      </tr>`;
    }
    // Regular field
    return `<tr>
      <td valign="top" style="padding:8px 0;width:140px;font-size:13px;font-weight:600;color:#64748b;white-space:nowrap;">${esc(f.label || "")}</td>
      <td style="padding:8px 0 8px 16px;font-size:14px;color:#1e293b;">${esc(f.value)}</td>
    </tr>`;
  }).join("\n");

  const replyBtn = replyTo
    ? `<a href="mailto:${esc(replyTo)}?subject=Re: ${esc(subject)}" style="display:inline-block;background:#1B3A5C;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none;margin-top:8px;">Reply to Enquiry</a>`
    : `<a href="mailto:director@willowtreefunerals.com.au" style="display:inline-block;background:#1B3A5C;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none;margin-top:8px;">Open Email</a>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#EEF2F7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EEF2F7;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1B3A5C;border-radius:10px 10px 0 0;padding:28px 36px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 4px;color:#8FA8C8;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Willow Tree Funerals</p>
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">${esc(subject)}</h1>
                </td>
                <td align="right" valign="top">
                  <p style="margin:0;color:#8FA8C8;font-size:11px;text-align:right;">New Website Enquiry</p>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:11px;text-align:right;opacity:0.7;">${esc(now)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#4A6FA5;padding:10px 36px;">
            <p style="margin:0;color:#ffffff;font-size:13px;">&#128276; A new enquiry has been submitted via <strong>willowtreefunerals.com.au</strong></p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${fieldRows}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#F8FAFC;padding:24px 36px;border-top:1px solid #E2E8F0;">
            ${replyBtn}
            <p style="margin:16px 0 0;color:#64748b;font-size:13px;">Or call: <a href="tel:0287761667" style="color:#1B3A5C;font-weight:600;">02 8776 1667</a></p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1B3A5C;border-radius:0 0 10px 10px;padding:16px 36px;">
            <p style="margin:0;color:#8FA8C8;font-size:11px;">Willow Tree Funerals &nbsp;·&nbsp; willowtreefunerals.com.au &nbsp;·&nbsp; Available 24/7</p>
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
      HtmlBody: buildHtml(opts.subject, opts.body, opts.replyTo),
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
      html: buildHtml(opts.subject, opts.body, opts.replyTo),
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
    await transporter.sendMail({ from: `${FROM_NAME} <${user}>`, to: RECIPIENT, replyTo: opts.replyTo || RECIPIENT, subject: opts.subject, text: opts.body, html: buildHtml(opts.subject, opts.body, opts.replyTo) });
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
  console.warn("[Email] No email provider configured  -  add POSTMARK_API_TOKEN to enable email delivery.");
  return false;
}
