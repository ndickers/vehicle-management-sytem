import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {
  users,
  authentication,
  TIUsers,
  TSAuth,
  TIAuth,
  verification_tokens,
  TIToken,
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
export async function getTokenService(
  token: string
): Promise<{ userId: number; expiresAt: Date }[] | null> {
  return db
    .select({
      expiresAt: verification_tokens.expires_at,
      userId: verification_tokens.user_id,
    })
    .from(verification_tokens)
    .where(eq(verification_tokens.token, token));
}

export async function createTokenService(
  verificationDetails: TIToken
): Promise<{ id: number }[] | null> {
  return await db
    .insert(verification_tokens)
    .values(verificationDetails)
    .returning({ id: verification_tokens.token_id });
}

export async function updateUserOnVerified(
  userId: number
): Promise<{ id: number }[] | null> {
  return await db
    .update(users)
    .set({ verified: true })
    .where(eq(users.id, userId))
    .returning({ id: users.id });
}

export async function updateUserPassword(
  password: string,
  userId: number
): Promise<{ id: number }[] | null> {
  return await db
    .update(authentication)
    .set({ password })
    .where(eq(authentication.userId, userId))
    .returning({ id: authentication.id });
}

export async function deletePrevToken(userId: number) {
  return await db
    .delete(verification_tokens)
    .where(eq(verification_tokens.user_id, userId))
    .returning({ id: verification_tokens.token_id });
}
