import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  query: { type: mongoose.Schema.Types.ObjectId, ref: "Query" },
  summary: String,
  confidence: Number,
});

export default mongoose.model("Result", resultSchema);