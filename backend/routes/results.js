import express from "express";
import Result from "../models/Result.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Fetch results for a given queryId
router.get("/:queryId", authMiddleware, async (req, res) => {
  const { queryId } = req.params;
  try {
    const results = await Result.find({ query: queryId });
    if (results.length === 0) {
      return res.status(404).json({ error: "No results found" });
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
