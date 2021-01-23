import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reciSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  preparations: {
    type: [String],
    required: true,
  },

  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: false,
      },
    },
  ],

  ustensils: {
    type: [String],
    required: true,
  },
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
    required: false,
  },

  rate: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("Recipe", reciSchema);
