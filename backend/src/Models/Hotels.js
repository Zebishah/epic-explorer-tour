import mongoose from "mongoose";
const Schema = mongoose.Schema;
let hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  prices: {
    type: String,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gallery: [
    {
      type: String,
      required: true,
    },
  ],
  features: [
    {
      type: String,
      required: true,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
  rooms: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
  available: {
    type: String,
    required: true,
  },
  ReviewsCount: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Hotels", hotelSchema);
