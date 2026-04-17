import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ── Contact form — sends email notification to Bruce ──────────────────────
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          phone: z.string().min(6, "Phone number is required"),
          email: z.string().email().optional().or(z.literal("")),
          suburb: z.string().optional(),
          enquiryType: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const lines = [
          `Name: ${input.name}`,
          `Phone: ${input.phone}`,
          `Email: ${input.email || "Not provided"}`,
          `Suburb: ${input.suburb || "Not provided"}`,
          `Enquiry Type: ${input.enquiryType || "Not specified"}`,
          ``,
          `Message:`,
          input.message || "(No message provided)",
          ``,
          `---`,
          `Submitted via willowtreefunerals.com.au contact form`,
        ];
        const sent = await notifyOwner({
          title: `New Funeral Enquiry from ${input.name} — ${input.phone}`,
          content: lines.join("\n"),
        });
        return { success: true, notified: sent };
      }),
  }),

  // ── Pre-arrangement enquiry — multi-step form ─────────────────────────────
  preArrange: router({
    submit: publicProcedure
      .input(
        z.object({
          serviceType: z.string().min(1, "Service type is required"),
          timeframe: z.string().optional(),
          name: z.string().min(1, "Name is required"),
          phone: z.string().min(6, "Phone number is required"),
          email: z.string().email().optional().or(z.literal("")),
          suburb: z.string().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const lines = [
          `PRE-ARRANGEMENT ENQUIRY`,
          ``,
          `Service Type: ${input.serviceType}`,
          `Timeframe: ${input.timeframe || "Not specified"}`,
          ``,
          `Contact Details:`,
          `Name: ${input.name}`,
          `Phone: ${input.phone}`,
          `Email: ${input.email || "Not provided"}`,
          `Suburb: ${input.suburb || "Not provided"}`,
          ``,
          `Notes:`,
          input.notes || "(No notes provided)",
          ``,
          `---`,
          `Submitted via willowtreefunerals.com.au pre-arrangement form`,
        ];
        const sent = await notifyOwner({
          title: `Pre-Arrangement Enquiry from ${input.name} — ${input.serviceType}`,
          content: lines.join("\n"),
        });
        return { success: true, notified: sent };
      }),

    // Full multi-step pre-arrangement form (from PreArrange.tsx)
    preArrange: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          dateOfBirth: z.string().optional(),
          phone: z.string().min(6),
          email: z.string().email().optional().or(z.literal("")),
          address: z.string().optional(),
          serviceType: z.string().optional(),
          disposition: z.string().optional(),
          venue: z.string().optional(),
          specialRequests: z.string().optional(),
          religiousPreferences: z.string().optional(),
          musicPreferences: z.string().optional(),
          readingPreferences: z.string().optional(),
          howDidYouHear: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const lines = [
          `PRE-ARRANGEMENT REQUEST (Full Form)`,
          ``,
          `=== Personal Details ===`,
          `Name: ${input.firstName} ${input.lastName}`,
          `Date of Birth: ${input.dateOfBirth || "Not provided"}`,
          `Phone: ${input.phone}`,
          `Email: ${input.email || "Not provided"}`,
          `Address: ${input.address || "Not provided"}`,
          ``,
          `=== Service Preferences ===`,
          `Service Type: ${input.serviceType || "Not specified"}`,
          `Burial/Cremation: ${input.disposition || "Not specified"}`,
          `Venue: ${input.venue || "Not specified"}`,
          `How Did You Hear: ${input.howDidYouHear || "Not specified"}`,
          ``,
          `=== Final Wishes ===`,
          `Religious Preferences: ${input.religiousPreferences || "None specified"}`,
          `Music Preferences: ${input.musicPreferences || "None specified"}`,
          `Reading Preferences: ${input.readingPreferences || "None specified"}`,
          `Special Requests: ${input.specialRequests || "None specified"}`,
          ``,
          `---`,
          `Submitted via willowtreefunerals.com.au pre-arrangement form`,
        ];
        const sent = await notifyOwner({
          title: `Pre-Arrangement Request from ${input.firstName} ${input.lastName} — ${input.phone}`,
          content: lines.join("\n"),
        });
        return { success: true, notified: sent };
      }),
  }),
});

export type AppRouter = typeof appRouter;
