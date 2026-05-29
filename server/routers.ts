import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { sendFormEmail } from "./email";
import { blogPosts } from "../drizzle/schema";
import { desc, eq, and } from "drizzle-orm";

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

  // ── Contact form  -  sends email notification to Bruce ──────────────────────
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
          `Submitted via willowtreefunerals.com.au/contact`,
          `Reply to: director@willowtreefunerals.com.au | 02 8776 1667`,
        ];
        const content = lines.join("\n");
        const sent = await notifyOwner({
          title: `New Funeral Enquiry from ${input.name}  -  ${input.phone}`,
          content,
        });
        await sendFormEmail({
          subject: `New Funeral Enquiry from ${input.name}  -  ${input.phone}`,
          body: content,
          replyTo: input.email || undefined,
        });
        return { success: true, notified: sent };
      }),
  }),

  // ── Pre-arrangement enquiry  -  multi-step form ─────────────────────────────
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
          `Submitted via willowtreefunerals.com.au/pre-arrange`,
          `Reply to: director@willowtreefunerals.com.au | 02 8776 1667`,
        ];
        const content = lines.join("\n");
        const sent = await notifyOwner({
          title: `Pre-Arrangement Enquiry from ${input.name}  -  ${input.serviceType}`,
          content,
        });
        await sendFormEmail({
          subject: `Pre-Arrangement Enquiry from ${input.name}  -  ${input.serviceType}`,
          body: content,
          replyTo: input.email || undefined,
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
          `Submitted via willowtreefunerals.com.au/pre-arrange (full form)`,
          `Reply to: director@willowtreefunerals.com.au | 02 8776 1667`,
        ];
        const content = lines.join("\n");
        const sent = await notifyOwner({
          title: `Pre-Arrangement Request from ${input.firstName} ${input.lastName}  -  ${input.phone}`,
          content,
        });
        await sendFormEmail({
          subject: `Pre-Arrangement Request from ${input.firstName} ${input.lastName}  -  ${input.phone}`,
          body: content,
          replyTo: input.email || undefined,
        });
        return { success: true, notified: sent };
      }),
  }),
  // ── Flower enquiry form ────────────────────────────────────────────────────
  flowers: router({
    submitEnquiry: publicProcedure
      .input(
        z.object({
          // Arrangement details
          arrangementType: z.string().min(1, "Please select an arrangement type"),
          customArrangement: z.string().optional(),
          // Delivery details
          deliveryAddress: z.string().min(5, "Delivery address is required"),
          deliverySuburb: z.string().min(1, "Suburb is required"),
          serviceDate: z.string().min(1, "Service date is required"),
          serviceTime: z.string().optional(),
          // Contact details
          name: z.string().min(1, "Name is required"),
          phone: z.string().min(6, "Phone number is required"),
          email: z.string().email().optional().or(z.literal("")),
          // Additional
          additionalNotes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const lines = [
          `FLOWER ENQUIRY`,
          ``,
          `=== Arrangement ===`,
          `Type: ${input.arrangementType}`,
          input.customArrangement ? `Custom Request: ${input.customArrangement}` : null,
          ``,
          `=== Delivery Details ===`,
          `Address: ${input.deliveryAddress}`,
          `Suburb: ${input.deliverySuburb}`,
          `Service Date: ${input.serviceDate}`,
          `Service Time: ${input.serviceTime || "Not specified"}`,
          ``,
          `=== Contact Details ===`,
          `Name: ${input.name}`,
          `Phone: ${input.phone}`,
          `Email: ${input.email || "Not provided"}`,
          ``,
          input.additionalNotes ? `Additional Notes:\n${input.additionalNotes}` : null,
          ``,
          `---`,
          `Submitted via willowtreefunerals.com.au/order-flowers`,
          `Reply to: director@willowtreefunerals.com.au | 02 8776 1667`,
        ].filter((l): l is string => l !== null);
        const content = lines.join("\n");
        const sent = await notifyOwner({
          title: `Flower Enquiry from ${input.name}  -  ${input.arrangementType}  -  ${input.serviceDate}`,
          content,
        });
        await sendFormEmail({
          subject: `Flower Enquiry from ${input.name}  -  ${input.arrangementType}  -  ${input.serviceDate}`,
          body: content,
          replyTo: input.email || undefined,
        });
        return { success: true, notified: sent };
      }),
  }),

  // ── Blog procedures (reads from blog_posts table populated by babylovegrowth.ai webhook) ──
  blog: router({
    getLatest: publicProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(12).default(6),
          tag: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const posts = await db
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.isPublished, 1))
          .orderBy(desc(blogPosts.publishedAt))
          .limit(input?.limit ?? 6);
        if (input?.tag && input.tag !== "All") {
          return posts.filter((p) =>
            p.tags.split(",").map((t) => t.trim()).includes(input.tag!)
          );
        }
        return posts;
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const [post] = await db
          .select()
          .from(blogPosts)
          .where(
            and(
              eq(blogPosts.slug, input.slug),
              eq(blogPosts.isPublished, 1)
            )
          )
          .limit(1);
        return post ?? null;
      }),

    getAllTags: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const posts = await db
        .select({ tags: blogPosts.tags })
        .from(blogPosts)
        .where(eq(blogPosts.isPublished, 1));
      const tagSet = new Set<string>();
      posts.forEach((p) =>
        p.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .forEach((t) => tagSet.add(t))
      );
      return Array.from(tagSet).sort();
    }),
  }),
});
export type AppRouter = typeof appRouter;
