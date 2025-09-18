import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Query", querySchema);