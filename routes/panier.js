import express from "express";
import {
  createVegetable,
  getVegetable,
  getVegetables,
  deleteVegetable,
  updateVegetable,
  getWeek,
} from "../controllers/panier.js";
import fileUpload from "../middleware/file-upload.js";
import { checkauth, checkadmin } from "../middleware/check-auth.js";

const router = express.Router();

// /api/panier/
router.get("/", checkauth, getVegetables);
router.get("/week/", checkauth, getWeek);
router.get("/:vegeId", checkauth, getVegetable);

// Admin control panel
// /api/panier/add-vegetable
router.post(
  "",
  checkauth,
  checkadmin,
  fileUpload.single("image"),
  createVegetable
);
router.delete("/:vegeId", checkauth, checkadmin, deleteVegetable);
router.put("/:vegeId", checkauth, checkadmin, updateVegetable);

export default router;
