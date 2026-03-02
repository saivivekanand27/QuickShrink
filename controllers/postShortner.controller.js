import crypto from "crypto";
import { ObjectId } from "mongodb";
import {
  loadLinks,
  saveLinks,
  getLinkByShortCode,
  incrementClicks
} from "../models/shortner.model.js";

/* Home = only form */
export const homePage = (req, res) => {
  res.render("index", {
    links: [],
    host: req.headers.host
  });
};

/* Short links page */
export const shortLinksPage = async (req, res) => {
  const links = await loadLinks(req.user._id);

  res.render("shortlinks", {
    links,
    host: req.headers.host
  });
};

/* Create short URL */
export const postShortner = async (req, res) => {
  const { url, shortCode } = req.body;

  const finalCode = shortCode || crypto.randomBytes(4).toString("hex");

  const exists = await getLinkByShortCode(finalCode);
  if (exists) return res.send("Short code already exists");

  await saveLinks({
    url,
    shortCode: finalCode,
    createdBy: new ObjectId(req.user._id),
    clicks: 0,
    createdAt: new Date()
  });

  res.redirect("/shortlinks"); // 👈 after creating go to list
};

/* Redirect */
export const RedirectURL = async (req, res) => {
  const link = await getLinkByShortCode(req.params.shortCode);
  if (!link) return res.status(404).send("Not found");

  await incrementClicks(link._id);
  res.redirect(link.url);
};
