import express from "express";
const router = express.Router();

import {
  getSubscription,
  AddSubscription,
  ValidationSubscription,
  addSubstoDatabase,
  getSubscriptions,
  updateSubscription,
} from "../controllers/subscription.js";

import { checkauth } from "../middleware/check-auth.js";

// /api/subscription/
router.get("/", checkauth, getSubscription);
router.post("/", checkauth, AddSubscription);
router.post("/validate", checkauth, ValidationSubscription, addSubstoDatabase);
router.get("/all", checkauth, getSubscriptions);
router.put("/:subsId", checkauth, updateSubscription);
export default router;
