import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Context, Next } from "hono";
export async function authorize(c: Context, next: Next, userRole: string) {
  const token = c.req.header("Authorization");
  if (!token) {
    return c.json({ message: "You're unauthorized" }, 401);
  }
  try {
    const { role }: any = jwt.verify(token, process.env.SECRET as string);
    console.log(role);

    if (userRole === "both") {
      await next();
    }
    if (role === userRole) {
      await next();
    }
    return c.json({ message: "The user is unauthorized" }, 401);
  } catch (error) {
    return c.json({ message: "Invalid token" }, 403);
  }
}
export async function adminAuth(c: Context, next: Next) {
  return authorize(c, next, "admin");
}
export async function userAuth(c: Context, next: Next) {
  return authorize(c, next, "user");
}
export async function authorizeAll(c: Context, next: Next) {
  return authorize(c, next, "both");
}
