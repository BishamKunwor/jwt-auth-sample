import jwt from "jsonwebtoken";

export function GET(req: Request) {
  const token = (req.headers.get("Authorization") ?? "").split(" ")[1] ?? "";

  try {
    const verify = jwt.verify(token, "test");

    return Response.json({ data: "hello" });
  } catch (error) {
    return Response.json({ error: true }, { status: 403 });
  }
}
