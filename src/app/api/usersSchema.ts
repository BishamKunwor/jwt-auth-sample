export const users = new Map<
  string,
  { email: string; refreshToken?: string; hashedPassword: string }
>();
