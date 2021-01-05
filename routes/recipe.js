const path = require('path');

const express = require('express');

const router = express.Router();

const recipeController = require('../controllers/recipe');

// /recipe/add-recipe => POST
router.post('', recipeController.createRecipe);
router.delete('/:reciId', recipeController.deleteRecipe);
router.put('/:reciId', recipeController.updateRecipe);

router.get('/:reciId', recipeController.getRecipe);
router.put('/rate/:reciId',recipeController.updateRate);
module.exports = router;