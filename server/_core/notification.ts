export type NotificationPayload = {
  title: string;
  content: string;
};

/**
 * Former Manus owner notification. Manus is gone, so this only logs.
 * Form enquiries reach Bruce by email through sendFormEmail (server/email.ts).
 */
export async function notifyOwner(payload: NotificationPayload): Promise<boolean> {
  console.log(`[notify] ${payload.title}`);
  return false;
}
