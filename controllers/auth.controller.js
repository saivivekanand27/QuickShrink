import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { setSession } from "../services/session.service.js";

export const getRegisterPage = (req, res) => {
  res.render("auth/register", { errors: [] });
};

export const getLoginPage = (req, res) => {
  res.render("auth/login", { errors: [] });
};

export const postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 6) {
    return res.render("auth/register", { errors: ["Password too short"] });
  }

  const exists = await findUserByEmail(email);
  if (exists) {
    return res.render("auth/register", { errors: ["User already exists"] });
  }

  const hashed = await bcrypt.hash(password, 10);

  await createUser({
    name,
    email,
    password: hashed,
    createdAt: new Date()
  });

  res.redirect("/login");
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.render("auth/login", { errors: ["Invalid credentials"] });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render("auth/login", { errors: ["Invalid credentials"] });
  }

  const token = setSession(user);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.redirect("/");
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
