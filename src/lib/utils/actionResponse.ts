export type ActionResponse<T = {}> = Promise<
  ({ success: true } & T) | { success: false; error: string }
>;
