import { verifyRefreshToken } from "../verifyRefreshToken";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  //   console.log(req.headers.get("cookie")?.split("=")[1]);
  try {
    const response = await verifyRefreshToken(
      req.headers.get("cookie")?.split("=")[1]
    );

    const accessToken = jwt.sign(
      { email: response.tokenDetails.email },
      "test",
      {
        expiresIn: "14m",
      }
    );

    return Response.json({
      accessToken,
    });
  } catch (error) {
    return Response.json({ error: "fsd" }, { status: 500 });
  }
}

export function Delete() {
  return Response.json({ message: "Success" }, { headers: {} });
}
