/**
 * email.test.ts  -  Validates Postmark API token by sending a real test email
 */
import { describe, it, expect } from "vitest";
import * as postmark from "postmark";
import "dotenv/config";

describe("Postmark email delivery", () => {
  it("should have POSTMARK_API_TOKEN set in the environment", () => {
    expect(process.env.POSTMARK_API_TOKEN, "POSTMARK_API_TOKEN must be set").toBeTruthy();
  });

  it("should send a test email to director@willowtreefunerals.com.au", async () => {
    const token = process.env.POSTMARK_API_TOKEN;
    expect(token).toBeTruthy();

    const client = new postmark.ServerClient(token!);

    const result = await client.sendEmail({
      From: "Willow Tree Funerals Website <noreply@adsdaddy.com>",
      To: "director@willowtreefunerals.com.au",
      Subject: "Willow Tree Funerals  -  Postmark Integration Test",
      TextBody: "This confirms Postmark is correctly configured. Form submissions will now be delivered to this inbox.",
      HtmlBody: `<div style="font-family:Arial,sans-serif;padding:24px;max-width:500px;">
        <h2 style="color:#1B3A5C;">Postmark Integration Test</h2>
        <p>Postmark is correctly configured for <strong>Willow Tree Funerals</strong>.</p>
        <p>Contact, pre-arrange, and flowers form submissions will now be delivered to this inbox.</p>
      </div>`,
      MessageStream: "outbound",
    });

    expect(result.ErrorCode).toBe(0);
    expect(result.MessageID).toBeTruthy();
    console.log(`Test email sent. MessageID: ${result.MessageID}`);
  }, 15000);
});
