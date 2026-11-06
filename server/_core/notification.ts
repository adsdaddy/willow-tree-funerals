export type NotificationPayload = {
  title: string;
  content: string;
};

/**
 * Independent hosting has no owner notification service. This compatibility
 * helper makes no network requests and does not log enquiry content.
 * Form delivery is handled exclusively by Resend in server/email.ts.
 */
export async function notifyOwner(
  _payload: NotificationPayload
): Promise<boolean> {
  return false;
}
