const express = require('express');
const panierController = require('../controllers/panier');

const router = express.Router();



// Admin control panel
// /panier/add-vegetable => GET
router.get('/add-vegetable', panierController.getAddVegetable);



// User

// /panier/:vegeId
router.get('/:vegeId', panierController.getVegetable);

module.exports = router;