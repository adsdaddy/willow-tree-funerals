import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendFormEmail } from "./email";

const { send, constructor } = vi.hoisted(() => ({
  send: vi.fn(),
  constructor: vi.fn(),
}));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
    constructor(key: string) {
      constructor(key);
    }
  },
}));

const enquiry = {
  subject: "Synthetic enquiry <script>",
  body: "=== Details ===\nName: Synthetic <script>\nPhone: 0000000000\nMessage:\nTest & message",
  replyTo: "synthetic@example.com",
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("RESEND_API_KEY", "test-resend-key-not-real");
  vi.stubEnv("EMAIL_FROM", "");
  vi.stubEnv("EMAIL_TO", "");
  send.mockResolvedValue({ data: { id: "mock-message" }, error: null });
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("External network forbidden in tests");
    })
  );
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Resend-only enquiry email", () => {
  it("sends exactly one branded email with safe business defaults and escaped HTML", async () => {
    await expect(sendFormEmail(enquiry)).resolves.toBe(true);
    expect(send).toHaveBeenCalledOnce();
    expect(constructor).toHaveBeenCalledWith("test-resend-key-not-real");
    expect(send.mock.calls[0][0]).toMatchObject({
      from: "Willow Tree Funerals Website <noreply@willowtreefunerals.com.au>",
      to: ["director@willowtreefunerals.com.au"],
      replyTo: "synthetic@example.com",
      text: enquiry.body,
    });
    const html = send.mock.calls[0][0].html;
    expect(html).toContain("Willow Tree Funerals");
    expect(html).toContain("#1B3A5C");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("Test &amp; message");
    expect(html).not.toContain("<script>");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("supports EMAIL_FROM and EMAIL_TO and a safe default Reply-To", async () => {
    vi.stubEnv("EMAIL_FROM", "Verified Sender <enquiries@example.com>");
    vi.stubEnv("EMAIL_TO", "offline-recipient@example.com");
    await sendFormEmail({ subject: "Test", body: "Name: Synthetic" });
    expect(send.mock.calls[0][0]).toMatchObject({
      from: "Verified Sender <enquiries@example.com>",
      to: ["offline-recipient@example.com"],
      replyTo: "offline-recipient@example.com",
    });
  });

  it("fails visibly without a key even when former providers are configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("POSTMARK_API_TOKEN", "unused-test-value");
    vi.stubEnv("SMTP_USER", "unused@example.com");
    vi.stubEnv("SMTP_PASS", "unused-test-value");
    await expect(sendFormEmail(enquiry)).rejects.toThrow(
      "Email delivery is unavailable"
    );
    expect(send).not.toHaveBeenCalled();
  });

  it("refuses Resend onboarding senders", async () => {
    vi.stubEnv("EMAIL_FROM", "Website <onboarding@resend.dev>");
    await expect(sendFormEmail(enquiry)).rejects.toThrow(
      "Email delivery is unavailable"
    );
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    {
      data: null,
      error: {
        message: "synthetic@example.com private-data test-resend-key-not-real",
      },
    },
    { data: null, error: null },
  ])(
    "rejects provider failure or missing acceptance without retrying or leaking details",
    async result => {
      send.mockResolvedValue(result);
      await expect(sendFormEmail(enquiry)).rejects.toThrow(
        "Email delivery is unavailable"
      );
      expect(send).toHaveBeenCalledOnce();
      expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toMatch(
        /synthetic|private-data|test-resend-key/
      );
    }
  );

  it("handles network exceptions without a fallback send or PII logs", async () => {
    send.mockRejectedValue(
      new Error(enquiry.body + " test-resend-key-not-real")
    );
    await expect(sendFormEmail(enquiry)).rejects.toThrow(
      "Email delivery is unavailable"
    );
    expect(send).toHaveBeenCalledOnce();
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain(
      enquiry.body
    );
  });

  it("logs only an operational event on success", async () => {
    await sendFormEmail(enquiry);
    expect(console.info).toHaveBeenCalledWith(
      "[Email] Enquiry accepted by Resend"
    );
  });
});
