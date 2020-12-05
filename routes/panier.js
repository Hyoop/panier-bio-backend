const express = require('express');
const panierController = require('../controllers/panier');

const router = express.Router();



// Admin control panel
// /panier/add-vegetable => GET
router.post('', panierController.createVegetable);
router.delete('/:vegeId', panierController.deleteVegetable)
router.put('/:vegeId', panierController.updateVegetable)

// General

// /panier/:vegeId
router.get('vegetables/:vegeId', panierController.getVegetable);
router.get('vegetables', panierController.getVegetables);
module.exports = router;