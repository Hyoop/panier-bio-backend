const path = require('path');

const express = require('express');

const router = express.Router();

const panierController = require('../controllers/panier');


// /panier/add-vegetable => GET
//router.get('add-vegetable', panierController.getAddVegetable);