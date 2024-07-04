export const users = new Map<
  string,
  { email: string; refreshToken?: string; hashedPassword: string }
>();

users.set("novelian.nova@gmail.com", {
  email: "novelian.nova@gmail.com",
  hashedPassword:
    "$2b$10$ok/iV440rNYaihpJBr.LVeHBMbaS45I5pqeH.qszwh1uYpe8fy9b2",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdmVsaWFuLm5vdmFAZ21haWwuY29tIiwiaWF0IjoxNzIwMDY4MzAxLCJleHAiOjE3MjI2NjAzMDF9.DPkkxpvonvI6AmpHfXVZFkb-2tBqv8djeEy16jo5sTE",
});
