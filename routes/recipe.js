const path = require('path');

const express = require('express');

const router = express.Router();

const panierController = require('../controllers/recipe');

// /recipe/add-recipe => GET
//router.get('add-recipe', panierController.getAddRecipe);

module.exports = router;