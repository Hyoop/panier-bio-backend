import express from "express";

const router = express.Router();

import {
  createRecipe,
  getRecipe,
  getRecipes,
  getWeekRecipes,
  getSearchRecipesbyIngredients,
  getSearchRecipes,
  deleteRecipe,
  updateRecipe,
  updateRate,
} from "../controllers/recipe.js";
import fileUpload from "../middleware/file-upload.js";
import { checkauth } from "../middleware/check-auth.js";

// /api/recipe/
router.get("/", checkauth, getRecipes);
router.get("/search", checkauth, getSearchRecipes);

router.get("/week", checkauth, getWeekRecipes);
// Rate update
router.put("/rate/:reciId", checkauth, updateRate);
router.get("/:reciId", checkauth, getRecipe);
//Administrator
// Create a recipe
router.route("/").post(checkauth, fileUpload.single("image"), createRecipe);
// Delete a recipe
router.delete("/:reciId", checkauth, deleteRecipe);
// Edit a recipe
router.put("/:reciId", checkauth, updateRecipe);

export default router;
