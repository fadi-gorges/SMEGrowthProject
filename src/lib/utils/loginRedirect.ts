export const loginRedirectPath = (next?: string, message?: string): string => {
  return `/auth/login?next=${next ?? "/"}${
    message ? `&message=${encodeURIComponent(message)}` : ""
  }`;
};
