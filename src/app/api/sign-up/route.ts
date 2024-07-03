import bcrypt from "bcrypt";
import { users } from "../usersSchema";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new Error("Registration Failed");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    users.set(email, {
      email,
      hashedPassword: hashPassword,
    });

    return Response.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
}
