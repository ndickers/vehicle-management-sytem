import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {
  users,
  authentication,
  TIUsers,
  TSAuth,
  TIAuth,
} from "../drizzle/schema";

export async function addUser(data: TIUsers) {
  return await db.insert(users).values(data).returning({ userId: users.id });
}


export async function addAuthData(data: TIAuth) {
  return await db
    .insert(authentication)
    .values(data)
    .returning({ authId: authentication.id });
}

export async function removeUser(id: number) {
  return await db.delete(users).where(eq(users.id, id));
}

export async function doesUserExist(email: string) {
  return await db.query.users.findMany({
    where: eq(users.email, email),
  });
}
export async function getUserAuth(id: number) {
  return await db.query.authentication.findMany({
    where: eq(authentication.userId, id),
  });
}
