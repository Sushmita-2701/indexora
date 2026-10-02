const express = require("express");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getOverview,
  getPopularSearches,
  getRecentSearches,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get(
  "/overview",
  protect,
  adminOnly,
  getOverview
);

router.get(
  "/popular-searches",
  protect,
  adminOnly,
  getPopularSearches
);

router.get(
  "/recent-searches",
  protect,
  adminOnly,
  getRecentSearches
);

module.exports = router;