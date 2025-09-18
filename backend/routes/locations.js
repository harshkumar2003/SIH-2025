import express from "express";
import Location from "../models/Location.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Fetch all locations for map markers
router.get("/", authMiddleware, async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add new location
router.post("/", authMiddleware, async (req, res) => {
  const { result_id, lat, lng, label, score } = req.body;
  try {
    const location = await Location.create({
      result: result_id,
      lat,
      lng,
      label,
      score,
    });
    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
