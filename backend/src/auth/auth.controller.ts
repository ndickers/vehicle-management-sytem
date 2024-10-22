import "dotenv/config";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import bcrypt from "bcrypt";
import { Context } from "hono";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import {
  doesUserExist,
  addUser,
  addAuthData,
  removeUser,
  getUserAuth,
  createTokenService,
  getTokenService,
  deletePrevToken,
  updateUserPassword,
} from "./auth.service";
import { serveOneUser, serveVerifyUser } from "../users/users.service";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: "465",
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL as string,
    pass: process.env.PASS as string,
  },
} as SMTPTransport.MailOptions);

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
        const token: string = uuidv4();
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);
        const verificationDetails = {
          user_id: created[0].userId,
          token: token,
          expires_at: expirationTime,
        };

        const sendToken = await createTokenService(verificationDetails);
        if (sendToken?.length !== 0) {
          const url = `http://localhost:5173/login/user?token=${token}`;
          try {
            const res = await send(
              url,
              "Confirm Registration",
              userDetails.email
            );
            return c.json({ message: "confirm email", info: res });
          } catch (error) {
            return c.json({ message: "unable to send email", error }, 500);
          }
        }
        return c.json({ message: "confirm email" });
      } else {
        await removeUser(created[0].userId);
      }
    }
  } else {
    return c.json({ message: "User already exists. Sign in" }, 404);
  }
}

export async function confirmRegistration(c: Context) {
  const tokenDetails = await c.req.json();

  const token = tokenDetails.token;
  try {
    const getToken = await getTokenService(token);
    if (getToken !== null) {
      if (getToken.length !== 0) {
        const currentTime = new Date();
        //   check if token has expired before verifying user
        if (currentTime < new Date(getToken[0].expiresAt)) {
          //
          const isUserVerified = await serveOneUser(getToken[0].userId);
          if (isUserVerified !== null) {
            if (!isUserVerified[0].verified) {
              // verify uer
              const verifiedUser = await serveVerifyUser(getToken[0].userId);
              if (verifiedUser !== null) {
                return verifiedUser.length !== 0
                  ? c.json({ message: "user verification successful" })
                  : c.json({ message: "Unable to verify user" }, 404);
              } else {
                return c.json(
                  { error: "Server error, Unable to verify user" },
                  500
                );
              }
            }
          } else {
            return c.json({ error: "Server error" }, 500);
          }
          return c.json({
            message: "The user is already verified. Login to account",
          });
        } else {
          return c.json({ message: "Token has expired" }, 401);
        }
      } else {
        return c.json({ error: "Invalid token" }, 404);
      }
    } else {
      return c.json({ error: "Server error" }, 500);
    }
  } catch (error) {
    return c.json({ error }, 500);
  }
}

export async function resetPassword(c: Context) {
  const email = await c.req.json();
  try {
    const checkIfUserExist = await doesUserExist(email.email);
    if (checkIfUserExist !== null) {
      if (checkIfUserExist.length === 0) {
        return c.json({ message: "User does not exist" }, 404);
      }
      const token: string = uuidv4();
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 1);
      const tokenDetails = {
        user_id: checkIfUserExist[0].id,
        token: token,
        expires_at: expirationTime,
      };

      console.log(checkIfUserExist[0].id);

      const deleteToken = await deletePrevToken(checkIfUserExist[0].id);
      if (deleteToken !== null) {
        if (deleteToken.length !== 0) {
          console.log("deleted");

          const createToken = await createTokenService(tokenDetails);
          if (createToken !== null) {
            if (createToken.length !== 0) {
              try {
                const url = `http://localhost:5173/reset-password?token=${token}`;
                const res = await send(url, "Reset password", email.email);
                return c.json({ message: "confirm email", info: res });
              } catch (error) {
                return c.json({ message: "unable to send email", error }, 500);
              }
            }
            return c.json({ message: "Unable to create token" }, 404);
          }
        }
        //create mew token
        console.log("Already deleted");

        const createToken = await createTokenService(tokenDetails);
        if (createToken !== null) {
          if (createToken.length !== 0) {
            try {
              const url = `http://localhost:5173/reset-password?token=${token}`;
              const res = await send(url, "Reset password", email.email);
              return c.json({ message: "confirm email", info: res });
            } catch (error) {
              return c.json({ message: "unable to send email", error }, 500);
            }
          }
          return c.json({ message: "Unable to create token" }, 404);
        }
      }
      return c.json({ message: "Server error" }, 500);
    }
  } catch (error) {
    return c.json({ error });
  }
}

export async function setPassword(c: Context) {
  const passwordCredentaials = await c.req.json();

  const hashedPass = await bcrypt.hash(passwordCredentaials.password, 8);

  const getToken = await getTokenService(passwordCredentaials.token);
  if (getToken !== null) {
    if (getToken.length !== 0) {
      const currentTime = new Date();
      //   check if token has expired before updating password
      if (currentTime < new Date(getToken[0].expiresAt)) {
        //update user password

        const passUpdated = await updateUserPassword(
          hashedPass,
          getToken[0].userId
        );
        return passUpdated !== null
          ? c.json({ message: "Password updated successfully" })
          : c.json({ error: "unable to update password" }, 500);
      } else {
        return c.json({ message: "Token has expired" }, 401);
      }
    } else {
      return c.json({ error: "Invalid token" }, 404);
    }
  }
  return c.json({ error: "Unable to verify token" }, 500);
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
        return c.json({ message: "Incorrect email or password" }, 400);
      }
      const token = jwt.sign(credentials, process.env.SECRET as string);
      return c.json({ token, user: getUser });
    } else {
      return c.json({ Error: "Confirm your role" }, 404);
    }
  } else {
    return c.json({ message: "User does not exist" }, 404);
  }
}

function send(url: string, subject: string, to: string) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("fail to send link"));
    const options = {
      from: `<${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html: ` <a href=${url}>${subject}</a> `,
    };
    return transporter.sendMail(options, (error, info) => {
      if (error) return reject(error);
      return resolve(info);
    });
  });
}
