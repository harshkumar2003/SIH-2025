import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import queryRoutes from "./routes/query.js";
import resultRoutes from "./routes/results.js";
import locationRoutes from "./routes/locations.js";

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/query", queryRoutes);
app.use("/results", resultRoutes);
app.use("/locations", locationRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; // <-- Add this line

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
