import express from "express";

import {
  authUser,
  registerUser,
  authAdmin,
  GetInformation,
} from "../controllers/user.js";
import { checkauth } from "../middleware/check-auth.js";

const router = express.Router();
router.post("/admin/login", authAdmin);
router.post("/login", authUser);
router.post("/signup", registerUser);
router.get("/admin/getinfo", checkauth, GetInformation);

export default router;
