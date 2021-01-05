const { validationResult } = require('express-validator');
const Vegetable = require('../models/Vegetable');

exports.createVegetable = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw errors;
    }

    const name = req.body.name;
    const quantity = req.body.quantity;
    let oftheweek = req.body.oftheweek || false;
    let imageUrl = req.body.imageUrl;
    if(req.file){
        imageUrl = req.file.path;
    }
    if(!imageUrl){
      imageUrl = "images/default.png";
    }
    const vegetable = new Vegetable({
        name: name,
        imageUrl: imageUrl,
        quantity: quantity,
        oftheweek: oftheweek,
    });
    vegetable.save()
    .then(
        result => {
            res.status(201).json({
                message: 'Vegetable added successfully!',
                vegetable: result
            })
        }
    )
    .catch(err => {
        if (!err.statusCode){
          err.statusCode = 500;
        }
        next(err);
      }
    );
};


exports.getVegetable = (req, res, next) => {
    const vegeId = req.params.vegeId;
    Vegetable.findById(vegeId)
      .then(vegetable => {
        if(!vegetable) {
          const error = new Error('Could not find vegetable.');
          error.statusCode = 404;
          throw error;
        }
  
        res.status(200).json({
          message: 'vegetable fetched', 
          vegetable: vegetable});
      })
      .catch(err => {
        if (!err.statusCode){
          err.statusCode = 500;
        }
        next(err);
      })
}


exports.getVegetables = (req, res, next) => {
  Vegetable.find()
  .then(
    vegetables => {res.status(200)
    .json({
      message: 'Fetched vegetables successfully.',
      vegetables: vegetables});
    }
  )
  .catch(err => {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
}

exports.deleteVegetable = (req, res, next) => {
  const vegeId = req.params.vegeId;
  Vegetable.findByIdAndDelete(vegeId)
      .then(vegetable => {
        if(!vegetable) {
          const error = new Error('Could not find vegetable.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({message: 'Deleted vegetable.'});
      })
      .catch(err => {
        if (!err.statusCode){
          err.statusCode = 500;
        }
        next(err);
      })
}

exports.updateVegetable = (req, res, next) => {
  const vegeId = req.params.vegeId;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const oftheweek = req.body.oftheweek || false;
  let imageUrl = req.body.image;
  if(req.file){
      imageUrl = req.file.path;
  }
  if(!imageUrl){
    imageUrl = "images/default.png";
  }

  Vegetable.findById(vegeId)
  .then(vegetable => {
    if(!vegetable) {
      const error = new Error('Could not find vegetable.');
      error.statusCode = 404;
      throw error;
    }

    vegetable.name = name;
    vegetable.imageUrl = imageUrl;
    vegetable.quantity = quantity;
    vegetable.oftheweek = oftheweek;
    return vegetable.save()
  })
  .then(
    result => {
        res.status(201).json({
            message: 'Vegetable updated successfully!',
            vegetable: result
        })
    }
  )
  .catch(err => {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
}

exports.getWeek = (req, res, next) => {
  Vegetable.find({oftheweek: true})
  .then(
    vegetables => {
      res.json({
      message: 'Fetched vegetables successfully.',
      vegetables: vegetables});
  })
  .catch(err => {
    if (!err.statusCode){
      err.statusCode = 500;
      err.message = "Could not find vegetables of the week";
    }
    next(err);
  })
}