import jwt from "jsonwebtoken";
import { users } from "./usersSchema";

export function verifyRefreshToken(refreshToken: string) {
  return new Promise((resolve, reject) => {
    users.forEach((user) => {
      if (user.refreshToken !== refreshToken) {
        return reject({ error: true, message: "Invalid refresh token" });
      }
      jwt.verify(refreshToken, "test", (err, tokenDetails) => {
        if (err)
          return reject({ error: true, message: "Invalid refresh token" });
        resolve({
          tokenDetails,
          error: false,
          message: "Valid refresh token",
        });
      });
    });
  });
}
