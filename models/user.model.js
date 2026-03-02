import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const users = db.collection("users");

export const createUser = (user) => users.insertOne(user);

export const findUserByEmail = (email) => users.findOne({ email });
