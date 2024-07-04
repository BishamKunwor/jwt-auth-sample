import generateTokens from "../generateTokens";
import bcrypt from "bcrypt";
import { users } from "../usersSchema";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!users.has(email)) {
      throw new Error("Login Failed");
    }

    const user = users.get(email)!;

    const verifiedPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!verifiedPassword) {
      throw new Error("Login Failed");
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    const cookieStore = cookies();

    users.set(email, { ...user, refreshToken });

    console.log({ ...user, refreshToken })

    cookieStore.set("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      expires: 30 * 24 * 60 * 60 * 1000,
    });

    const refreshCookie = cookieStore.get("refreshToken")!;

    return Response.json(
      {
        accessToken,
        message: "Successful login",
      },
      {
        headers: {
          "Set-Cookie": `refreshToken=${refreshCookie.value}; HttpOnly; Secure;`,
        },
      }
    );
  } catch (error) {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
