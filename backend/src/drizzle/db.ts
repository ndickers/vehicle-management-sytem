import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(process.env.DB_URL as string);
const db = drizzle(sql, { schema, logger: true });
export default db;
