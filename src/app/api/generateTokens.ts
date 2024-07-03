import jwt from "jsonwebtoken";

export default async function generateTokens({ email }: { email: string }) {
  try {
    const payload = { email };
    const accessToken = jwt.sign(payload, "test", { expiresIn: "30s" });
    const refreshToken = jwt.sign(payload, "test", { expiresIn: "30d" });

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
}
