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

const router = express.Router();

// Admin control panel
// /panier/add-vegetable => GET
router.post("", fileUpload.single("image"), createVegetable);
router.delete("/:vegeId", deleteVegetable);
router.put("/:vegeId", updateVegetable);

// General

// /panier/:vegeId
router.get("/week/", getWeek);
router.get("/:vegeId", getVegetable);
router.get("", getVegetables);

export default router;
