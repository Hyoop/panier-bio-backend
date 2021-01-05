const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");


const panierRoutes = require('./routes/panier');
const recipeRoutes = require('./routes/recipe');




const app = express();

app.use(bodyParser.json());

app.use('/images', express.static('./images'));


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null,false);
  }
};



app.use(
  multer({ 
    limits: 5000000, // file size < 5MB 
    storage: fileStorage, 
    fileFilter: fileFilter 
  }).single('image')
);



app.use((req, res, next) => {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
  });

// Routes 
app.use('/panier', panierRoutes);
app.use('/recipe', recipeRoutes);

//Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Database
mongoose.connect(
    'mongodb://localhost:27017/MonPtitPanier',
    { useNewUrlParser: true,
      useUnifiedTopology: true },
)
.then(result => {
        app.listen(8080);
})
.catch(err => {
    console.log(err);
});
