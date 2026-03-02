import { Router } from "express";
import {
  homePage,
  postShortner,
  RedirectURL,
  shortLinksPage
} from "../controllers/postShortner.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, homePage);
router.post("/", requireAuth, postShortner);

router.get("/shortlinks", requireAuth, shortLinksPage);

router.get("/:shortCode", RedirectURL);

export const shortenerRoutes = router;
