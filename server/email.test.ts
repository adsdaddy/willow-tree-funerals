/**
 * email.test.ts — Validates that the Resend API key is configured and can send emails
 */
import { describe, it, expect } from "vitest";
import { Resend } from "resend";

describe("Resend API key validation", () => {
  it("should have RESEND_API_KEY set in the environment", () => {
    expect(process.env.RESEND_API_KEY).toBeTruthy();
    expect(process.env.RESEND_API_KEY!.length).toBeGreaterThan(10);
  });

  it("should be able to initialise the Resend client without errors", () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(() => new Resend(apiKey)).not.toThrow();
  });

  it("should successfully send a test email via Resend (validates the key can send)", async () => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Send a real test email to confirm the key is active and has send permissions
    const { data, error } = await resend.emails.send({
      from: "Willow Tree Funerals Website <onboarding@resend.dev>",
      to: ["director@willowtreefunerals.com.au"],
      subject: "[TEST] Resend API key validation — Willow Tree Funerals",
      text: "This is an automated test email confirming that the Resend API key is correctly configured for Willow Tree Funerals. No action required.",
    });

    if (error) {
      console.error("Resend send error:", error);
    }

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data?.id).toBeTruthy();
  }, 20_000);
});
