/**
 * Tests for contact.submit and preArrange.preArrange tRPC procedures
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { sendFormEmail } from "./email";
import { notifyOwner } from "./_core/notification";

// Mock the notifyOwner helper so we don't make real HTTP calls in tests
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock sendFormEmail; tests never send real email
vi.mock("./email", () => ({
  sendFormEmail: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): { ctx: TrpcContext } {
  return {
    ctx: {
      user: null,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    },
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(sendFormEmail).mockResolvedValue(true);
});

describe("contact.submit", () => {
  it("returns success when all required fields are provided", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Smith",
      phone: "0400123456",
      email: "john@example.com",
      suburb: "Hurstville",
      enquiryType: "General Enquiry",
      message: "I would like to discuss funeral arrangements.",
    });

    expect(result).toEqual({ success: true, notified: true });
    expect(sendFormEmail).toHaveBeenCalledOnce();
    expect(notifyOwner).not.toHaveBeenCalled();
  });

  it("returns success with only required fields (name + phone)", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Doe",
      phone: "0411222333",
    });

    expect(result).toEqual({ success: true, notified: true });
    expect(sendFormEmail).toHaveBeenCalledOnce();
    expect(notifyOwner).not.toHaveBeenCalled();
  });

  it("throws validation error when name is missing", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "",
        phone: "0400123456",
      })
    ).rejects.toThrow();
  });

  it("throws validation error when phone is too short", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test User",
        phone: "123",
      })
    ).rejects.toThrow();
  });
});

describe("preArrange.preArrange", () => {
  it("returns success with full pre-arrangement data", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.preArrange.preArrange({
      firstName: "Mary",
      lastName: "Johnson",
      dateOfBirth: "1945-06-15",
      phone: "0400999888",
      email: "mary@example.com",
      address: "10 Church Street, Hurstville NSW 2220",
      serviceType: "Catholic Funeral Mass",
      disposition: "Burial",
      venue: "Parish Church",
      religiousPreferences: "St Patrick's Parish, Hurstville",
      musicPreferences: "Ave Maria, Amazing Grace",
      readingPreferences: "John 14:1-6",
      specialRequests: "White lilies only",
      howDidYouHear: "Word of Mouth",
    });

    expect(result).toEqual({ success: true, notified: true });
    expect(sendFormEmail).toHaveBeenCalledOnce();
    expect(notifyOwner).not.toHaveBeenCalled();
  });

  it("returns success with only required fields (firstName, lastName, phone)", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.preArrange.preArrange({
      firstName: "Peter",
      lastName: "Williams",
      phone: "0411555666",
    });

    expect(result).toEqual({ success: true, notified: true });
    expect(sendFormEmail).toHaveBeenCalledOnce();
    expect(notifyOwner).not.toHaveBeenCalled();
  });

  it("throws validation error when firstName is missing", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.preArrange.preArrange({
        firstName: "",
        lastName: "Smith",
        phone: "0400123456",
      })
    ).rejects.toThrow();
  });

  it("throws validation error when phone is too short", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.preArrange.preArrange({
        firstName: "Tom",
        lastName: "Jones",
        phone: "12",
      })
    ).rejects.toThrow();
  });
});

describe("all enquiry procedures: visible delivery failure", () => {
  const cases = [
    {
      name: "contact",
      call: (caller: ReturnType<typeof appRouter.createCaller>) =>
        caller.contact.submit({ name: "Synthetic", phone: "0000000000" }),
    },
    {
      name: "pre-arrange short",
      call: (caller: ReturnType<typeof appRouter.createCaller>) =>
        caller.preArrange.submit({
          name: "Synthetic",
          phone: "0000000000",
          serviceType: "Test",
        }),
    },
    {
      name: "pre-arrange full",
      call: (caller: ReturnType<typeof appRouter.createCaller>) =>
        caller.preArrange.preArrange({
          firstName: "Synthetic",
          lastName: "Person",
          phone: "0000000000",
        }),
    },
  ];
  it.each(cases)(
    "$name does not return success if email fails",
    async ({ call }) => {
      vi.mocked(sendFormEmail).mockRejectedValueOnce(
        new Error("private provider details")
      );
      await expect(
        call(appRouter.createCaller(createPublicContext().ctx))
      ).rejects.toMatchObject({
        code: "INTERNAL_SERVER_ERROR",
        message:
          "Your enquiry could not be sent. Please try again or call 02 8776 1667.",
      });
      expect(sendFormEmail).toHaveBeenCalledOnce();
      expect(notifyOwner).not.toHaveBeenCalled();
    }
  );
  it.each(cases)(
    "$name also fails on false provider acceptance",
    async ({ call }) => {
      vi.mocked(sendFormEmail).mockResolvedValueOnce(false);
      await expect(
        call(appRouter.createCaller(createPublicContext().ctx))
      ).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR" });
      expect(sendFormEmail).toHaveBeenCalledOnce();
    }
  );
  it("short pre-arrange sends exactly one email on success", async () => {
    const result = await appRouter
      .createCaller(createPublicContext().ctx)
      .preArrange.submit({
        name: "Synthetic",
        phone: "0000000000",
        serviceType: "Test",
      });
    expect(result).toEqual({ success: true, notified: true });
    expect(sendFormEmail).toHaveBeenCalledOnce();
    expect(notifyOwner).not.toHaveBeenCalled();
  });
});
