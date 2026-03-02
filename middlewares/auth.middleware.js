import { getSession } from "../services/session.service.js";

export const attachUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    res.locals.user = null;
    return next();
  }

  const user = getSession(token);

  req.user = user || null;
  res.locals.user = user || null;

  next();
};

export const requireAuth = (req, res, next) => {
  if (!req.user) return res.redirect("/login");
  next();
};

export const redirectIfLoggedIn = (req, res, next) => {
  if (req.user) return res.redirect("/");
  next();
};
