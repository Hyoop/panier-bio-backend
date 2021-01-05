const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reciSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false,
    },
    preparations:[{
        step: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true
        }
    }],

    ingredients: [{
        vegetables: {
            vegetable: {
                type: Schema.Types.ObjectId,
                required: false,
                ref: 'Vegetable'},
            quantity: {
                type: Number,
                required: false,
            },
            unit: {
                type: String,
                required: false,
            },
        },
        ingredient: {  
            name: {
                type: String,
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
            },
            unit: {
                type: String,
                required: false,
            }
        },
    }],
    
    ustensils : [{ 
        name : {
            type: String,
            required: true,
        }
    }],

    
    total_time: {
        type: Number,
        required: true,
    },

    preparation_time: {
        type: Number,
        required: true,
    },

    baking_time: {
        type: Number,
        required: true,
    },

    difficulty: {
        type: Number,
        required: true,
    },

    rate: {
        type: Number,
        required: true,
    },
    
    
})



module.exports = mongoose.model('Recipe', reciSchema);