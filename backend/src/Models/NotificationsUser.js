import mongoose from "mongoose";
const Schema = mongoose.Schema;
let notificationUserSchema = new Schema({
  accommodationName: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Set default value to the current date and time
    required: true,
  },
  broadCast: {
    type: String,
    required: true,
  },
});
export default mongoose.model("notificationUser", notificationUserSchema);
