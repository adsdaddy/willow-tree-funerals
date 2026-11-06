export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// The public website has no customer login. Admin authentication is deliberately
// disabled until a separately verified, independent identity provider is added.
// Legacy dashboard components route to Contact instead of a platform login.
export const getLoginUrl = () => "/contact";
