import "dotenv/config";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { Context } from "hono";
import jwt from "jsonwebtoken";
import {
  doesUserExist,
  addUser,
  addAuthData,
  removeUser,
  getUserAuth,
} from "./auth.service";

export async function registerUser(c: Context) {
  const { password, ...userDetails } = await c.req.json();
  const checkUser = await doesUserExist(userDetails.email);
  const pass = await bcrypt.hash(password, 8);
  if (checkUser === null) {
    return c.json({ error: "Server error" }, 500);
  }
  if (checkUser?.length === 0) {
    const created = await addUser(userDetails);

    if (created.length !== 0) {
      const createAuth = await addAuthData({
        password: pass,
        userId: created[0].userId,
      });
      if (createAuth?.length !== 0) {
        return c.json({ message: "user created" });
      } else {
        await removeUser(created[0].userId);
      }
    }
  } else {
    return c.json({ error: "User already exists" }, 400);
  }
}

export async function loginUser(c: Context) {
  const { password, ...credentials } = await c.req.json();

  const getUser = await doesUserExist(credentials.email);
  console.log(credentials);

  if (getUser?.length !== 0) {
    if (credentials.role.toLowerCase() === getUser[0].role.toLowerCase()) {
      const getPass = await getUserAuth(getUser[0].id);
      const compare = await bcrypt.compare(password, getPass[0].password);
      if (!compare) {
        return c.json({ message: "Wrong password" }, 400);
      }
      const token = await jwt.sign(credentials, process.env.SECRET as string);
      return c.json(token);
    } else {
      return c.json({ Error: "Confirm your role" }, 404);
    }
  } else {
    return c.json({ message: "User does not exist" }, 400);
  }
}
