import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import { authRoutes } from "./routes/auth.routes.js";
import { shortenerRoutes } from "./routes/shortner.routes.js";
import { attachUser } from "./middlewares/auth.middleware.js";

const app = express();


  //  FIX __dirname (ES Modules)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  //  GLOBAL MIDDLEWARE

// parse form data
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, "public")));

// cookies
app.use(cookieParser());

// attach logged-in user (session)
app.use(attachUser);

// expose user + errors to EJS
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errors = [];
  next();
});


  //  VIEW ENGINE


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


  //  ROUTES
app.use(authRoutes);
app.use(shortenerRoutes);


  //  SERVER

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
