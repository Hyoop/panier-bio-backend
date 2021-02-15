import express from "express";

const router = express.Router();

import {
  createRecipe,
  getRecipe,
  getRecipes,
  getWeekRecipes,
  deleteRecipe,
  updateRecipe,
  updateRate,
} from "../controllers/recipe.js";
import fileUpload from "../middleware/file-upload.js";
import { checkauth, checkadmin } from "../middleware/check-auth.js";

// /api/recipe/
router.get("/", checkauth, getRecipes);
router.get("/:reciId", checkauth, getRecipe);
router.get("/week", checkauth, getWeekRecipes);
// Rate update
router.put("/rate/:reciId", checkauth, updateRate);

//Administrator
// Create a recipe
router.post(
  "",
  checkauth,
  checkadmin,
  fileUpload.single("image"),
  createRecipe
);
// Delete a recipe
router.delete("/:reciId", checkadmin, checkauth, deleteRecipe);
// Edit a recipe
router.put("/:reciId", checkadmin, checkauth, updateRecipe);

export default router;
