import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";
import { redirectIfLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/register", redirectIfLoggedIn, authControllers.getRegisterPage);
router.post("/register", authControllers.postRegister);

router.get("/login", redirectIfLoggedIn, authControllers.getLoginPage);
router.post("/login", authControllers.postLogin);

router.get("/logout", authControllers.logout);

export const authRoutes = router;
