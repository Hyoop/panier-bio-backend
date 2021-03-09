import express from "express";
import {
  createVegetable,
  getVegetable,
  getVegetables,
  getSearchVegetables,
  deleteVegetable,
  updateVegetable,
  getWeek,
} from "../controllers/panier.js";
import fileUpload from "../middleware/file-upload.js";
import { checkauth } from "../middleware/check-auth.js";

const router = express.Router();

// /api/panier/
router.get("/", checkauth, getVegetables);
router.get("/week/", checkauth, getWeek);
router.get("/search", checkauth, getSearchVegetables);
router.get("/:vegeId", checkauth, getVegetable);

// Admin control panel
// /api/panier/add-vegetable
router.post("/", fileUpload.single("image"), createVegetable);
router.delete("/:vegeId", checkauth, deleteVegetable);
router.put("/:vegeId", checkauth, updateVegetable);

export default router;
