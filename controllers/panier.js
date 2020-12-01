const { validationResult } = require('express-validator');
const Vegetable = require('../models/Vegetable');

exports.getAddVegetable = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw errors;
    }
    
    let imageUrl = '';
    if(! req.file || ! req.file.path){
        imageUrl = "images/default.png";
    } else {
        imageUrl = req.file.path;
    }
    const name = req.body.name;
    const content = req.body.content;
    const vegetable = new Vegetable({
        name: name,
        imageUrl: imageUrl,
        content: content
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
  
        res.status(200).json({message: 'vegetable fetched', vegetable: vegetable});
      })
      .catch(err => {
        if (!err.statusCode){
          err.statusCode = 500;
        }
        next(err);
      })
  }