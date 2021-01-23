import express from "express";

const router = express.Router();

import {
  createRecipe,
  getRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
  updateRate,
} from "../controllers/recipe.js";
import fileUpload from "../middleware/file-upload.js";

// /api/recipe/
router.get("/", getRecipes);
router.get("/:reciId", getRecipe);

// Create a recipe
router.post("", fileUpload.single("image"), createRecipe);
// Delete a recipe
router.delete("/:reciId", deleteRecipe);
// Edit a recipe
router.put("/:reciId", updateRecipe);

// Rate update
router.put("/rate/:reciId", updateRate);
export default router;
