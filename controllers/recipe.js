import { validationResult } from "express-validator";
import Recipe from "../models/Recipe.js";

const createRecipe = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw errors;
  }

  const title = req.body.title;
  const preparations = req.body.preparations;
  const ingredients = req.body.ingredients;
  const ustensils = req.body.ustensils;
  const total_time = req.body.total_time;
  const preparation_time = req.body.preparation_time;
  const baking_time = req.body.baking_time;
  const difficulty = req.body.difficulty;
  const rate = req.body.rate;
  const oftheweek = req.body.oftheweek;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    imageUrl = "images/default.png";
  }

  const recipe = new Recipe({
    title: title,
    imageUrl: imageUrl,
    ingredients: ingredients,
    preparations: preparations,
    ustensils: ustensils,
    total_time: total_time,
    preparation_time: preparation_time,
    baking_time: baking_time,
    difficulty: difficulty,
    rate: rate,
    oftheweek: oftheweek,
  });
  recipe
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Recipe added successfully!",
        recipe: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
const getRecipe = (req, res, next) => {
  const reciId = req.params.reciId;
  Recipe.findById(reciId)
    .then((recipe) => {
      if (!recipe) {
        const error = new Error("Could not find recipe");
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        message: "Recipe fetched",
        recipe: recipe,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getRecipes = (req, res, next) => {
  Recipe.find()
    .then((recipe) => {
      res.status(200).json({
        message: "Fetched recipes successfully.",
        recipes: recipe,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getWeekRecipes = (req, res, next) => {
  Recipe.find({ oftheweek: true })
    .then((recipe) => {
      res.status(200).json({
        message: "Fetched recipes successfully.",
        recipes: recipe,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const deleteRecipe = (req, res, next) => {
  const reciId = req.params.reciId;
  Recipe.findByIdAndDelete()
    .then((vegetables) => {
      res.status(200).json({
        message: "Fetched vegetables successfully.",
        vegetables: vegetables,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const updateRecipe = (req, res, next) => {
  const reciId = req.params.reciId;
  const title = req.body.title;
  const ingredients = req.body.ingredients;
  const preparations = req.body.preparations;
  const ustensils = req.body.ustensils;
  const preparation_time = req.body.preparation_time;
  const baking_time = req.body.baking_time;
  const total_time = baking_time + preparation_time;
  const difficulty = req.body.difficulty;
  const rate = req.body.rate;
  const oftheweek = req.body.oftheweek;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    imageUrl = "images/default.png";
  }

  Recipe.findById(reciId)
    .then((recipe) => {
      if (!recipe) {
        const error = new Error("Could not find recipe");
        error.statusCode = 404;
        throw error;
      }

      (recipe.title = title || recipe.title),
        (recipe.imageUrl = imageUrl || recipe.imageUrl);
      recipe.ingredients = ingredients || recipe.ingredients;
      recipe.preparations = preparations || recipe.preparations;
      recipe.ustensils = ustensils || recipe.ustensils;
      recipe.total_time = total_time || recipe.total_time;
      recipe.preparation_time = preparation_time || recipe.preparation_time;
      recipe.baking_time = baking_time || recipe.baking_time;
      recipe.difficulty = difficulty || recipe.difficulty;
      recipe.rate = rate || recipe.rate;
      recipe.oftheweek = oftheweek || recipe.oftheweek;

      return recipe.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Recipe updated successfully!",
        recipe: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const updateRate = (req, res, next) => {
  const reciId = req.params.reciId;
  const rate = req.body.rate;
  Recipe.findByIdAndUpdate(reciId)
    .then((recipe) => {
      if (!recipe) {
        const error = new Error("Could not find recipe.");
        error.statusCode(404);
        throw error;
      }
      recipe.rate = rate;
      return recipe.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Recipe rate updated successfully!",
        recipe: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export {
  createRecipe,
  getRecipe,
  getRecipes,
  getWeekRecipes,
  deleteRecipe,
  updateRecipe,
  updateRate,
};
