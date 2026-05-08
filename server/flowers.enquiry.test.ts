import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mock notifyOwner so tests don't make real HTTP calls ──────────────────────
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock sendFormEmail so we don't make real SMTP calls in tests
vi.mock("./email", () => ({
  sendFormEmail: vi.fn().mockResolvedValue(undefined),
}));

import { notifyOwner } from "./_core/notification";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const validInput = {
  arrangementType: "Wreath Tribute",
  deliveryAddress: "St George Catholic Church, 1 Park Road",
  deliverySuburb: "Hurstville",
  serviceDate: "2026-05-10",
  name: "Maria Santos",
  phone: "0400 123 456",
  email: "maria@example.com",
  serviceTime: "10:00",
  additionalNotes: "White lilies preferred",
};

describe("flowers.submitEnquiry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success:true when all required fields are provided", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.flowers.submitEnquiry(validInput);
    expect(result).toEqual({ success: true, notified: true });
  });

  it("calls notifyOwner with a title containing the name, arrangement type, and date", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await caller.flowers.submitEnquiry(validInput);

    expect(notifyOwner).toHaveBeenCalledOnce();
    const call = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(call.title).toContain("Maria Santos");
    expect(call.title).toContain("Wreath Tribute");
    expect(call.title).toContain("2026-05-10");
  });

  it("includes the director email and phone in the notification content", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await caller.flowers.submitEnquiry(validInput);

    const call = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(call.content).toContain("director@willowtreefunerals.com.au");
    expect(call.content).toContain("02 8776 1667");
  });

  it("includes delivery address and service date in the notification content", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await caller.flowers.submitEnquiry(validInput);

    const call = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(call.content).toContain("St George Catholic Church");
    expect(call.content).toContain("Hurstville");
    expect(call.content).toContain("2026-05-10");
  });

  it("works without optional fields (email, serviceTime, customArrangement, additionalNotes)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const minimalInput = {
      arrangementType: "Casket Flowers",
      deliveryAddress: "Woronora Cemetery, Linden Street",
      deliverySuburb: "Sutherland",
      serviceDate: "2026-06-01",
      name: "John Smith",
      phone: "0411 999 888",
    };
    const result = await caller.flowers.submitEnquiry(minimalInput);
    expect(result.success).toBe(true);
  });

  it("throws a validation error when arrangementType is empty", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.flowers.submitEnquiry({ ...validInput, arrangementType: "" })
    ).rejects.toThrow();
  });

  it("throws a validation error when deliveryAddress is too short", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.flowers.submitEnquiry({ ...validInput, deliveryAddress: "Hi" })
    ).rejects.toThrow();
  });

  it("throws a validation error when phone is missing", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.flowers.submitEnquiry({ ...validInput, phone: "" })
    ).rejects.toThrow();
  });

  it("throws a validation error when name is missing", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.flowers.submitEnquiry({ ...validInput, name: "" })
    ).rejects.toThrow();
  });

  it("throws a validation error when serviceDate is missing", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.flowers.submitEnquiry({ ...validInput, serviceDate: "" })
    ).rejects.toThrow();
  });
});
