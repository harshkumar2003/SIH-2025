import express from "express";
import Query from "../models/Query.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { text } = req.body;
  try {
    const query = await Query.create({ user: req.user.id, text });
    res.json(query);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
