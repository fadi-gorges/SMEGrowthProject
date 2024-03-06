export const actionError = (
  e: any,
  message: string
): { success: false; error: string } => {
  if (process.env.NODE_ENV === "development") {
    throw new Error(e);
  }

  return { success: false, error: message };
};
