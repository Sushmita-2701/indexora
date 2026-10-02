const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const searchRoutes = require("./routes/searchRoutes");
const { buildIndex } = require("./search/searchEngine");

const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/analytics", analyticsRoutes);

connectDB();

app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  await buildIndex();
});