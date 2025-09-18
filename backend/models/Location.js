import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  result: { type: mongoose.Schema.Types.ObjectId, ref: "Result" },
  lat: Number,
  lng: Number,
  label: String,
  score: Number,
});

export default mongoose.model("Location", locationSchema);