import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

// Public website: there is no login, so every request is anonymous.
export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  return { req: opts.req, res: opts.res, user: null };
}
