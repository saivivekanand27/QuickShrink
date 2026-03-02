import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";
import { ObjectId } from "mongodb";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const links = db.collection("shorteners");

/* Load only current user's links */
export const loadLinks = (userId) => {
  return links.find({
    createdBy: new ObjectId(userId)
  }).toArray();
};

/* Save link */
export const saveLinks = (link) => {
  return links.insertOne(link);
};

/* Short code must be unique globally */
export const getLinkByShortCode = (shortCode) => {
  return links.findOne({ shortCode });
};

/* Click tracking */
export const incrementClicks = (id) => {
  return links.updateOne(
    { _id: new ObjectId(id) },
    { $inc: { clicks: 1 } }
  );
};
