import mongoose from "mongoose";

const Schema = mongoose.Schema;
const SUBSCRIPTION_TYPE_MAP = {
  "1 week": 1,
  "1 month": 4,
  "4 months": 16,
};
const subSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
  typeSubscription: {
    type: String,
    required: true,
  },
  NbBaskets: {
    type: Number,
    default: function () {
      return SUBSCRIPTION_TYPE_MAP[this.typeSubscription.toLowerCase()];
    },
    required: false,
  },

  StartSubscription: {
    type: Date,
    default: Date.now,
    required: false,
  },
  EndSubscription: {
    type: Date,
    default: function () {
      let now = new Date();
      let type_delay =
        SUBSCRIPTION_TYPE_MAP[this.typeSubscription.toLowerCase()];
      return now.setDate(now.getDate() + type_delay * 7);
    },
    required: false,
  },
  collect: {
    type: Boolean,
    default: false,
    required: false,
  },
  expired: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const Subscription = mongoose.model("Subscription", subSchema);
export default Subscription;
