const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const panierRoutes = require('./routes/panier');
const recipeRoutes = require('./routes/recipe');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// Routes 
app.use('/panier', panierRoutes);
app.use('/recipe', recipeRoutes);

// Database
mongoose.connect(
    'mongodb://localhost:27017/MonPtitPanier',
    { useNewUrlParser: true }
)
.then(result => {
        app.listen(8080);
})
.catch(err => {
    console.log(err);
});
