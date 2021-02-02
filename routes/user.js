import express from "express";

import { authUser, registerUser, authAdmin } from "../controllers/user.js";

const router = express.Router();
router.post("/admin/login", authAdmin);
router.post("/login", authUser);
router.post("/signup", registerUser);

export default router;
