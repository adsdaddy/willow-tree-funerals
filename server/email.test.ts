/**
 * Form email routing. Offline: Resend is mocked, nothing is sent.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send } })),
}));

describe("sendFormEmail", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({ data: { id: "test" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("POSTMARK_API_TOKEN", "");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("sends through Resend from the site's own domain to Bruce", async () => {
    const { sendFormEmail } = await import("./email");
    const ok = await sendFormEmail({
      subject: "New Funeral Enquiry from Test",
      body: "Name: Test\nPhone: 0400000000",
      replyTo: "family@example.com",
    });
    expect(ok).toBe(true);
    expect(send).toHaveBeenCalledTimes(1);
    const msg = send.mock.calls[0][0];
    expect(msg.from).toBe("Willow Tree Funerals Website <website@mail.willowtreefunerals.com.au>");
    expect(msg.to).toEqual(["director@willowtreefunerals.com.au"]);
    expect(msg.replyTo).toBe("family@example.com");
    expect(msg.from).not.toContain("adsdaddy");
  });

  it("returns false when Resend reports an error and no fallback is set", async () => {
    send.mockResolvedValue({ data: null, error: { message: "domain not verified" } });
    const { sendFormEmail } = await import("./email");
    const ok = await sendFormEmail({ subject: "x", body: "y" });
    expect(ok).toBe(false);
  });
});
