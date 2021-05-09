import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vegeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  quantity: {
    type: String,
    required: true,
  },
  oftheweek: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Vegetable", vegeSchema);

