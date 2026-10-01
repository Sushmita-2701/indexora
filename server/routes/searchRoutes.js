const express = require("express");

const {
  search,
  autocomplete,
} = require("../search/searchEngine");

const router = express.Router();

// Autocomplete
router.get("/autocomplete", (req, res) => {
  try {
    const query = req.query.q || "";

    if (!query.trim()) {
      return res.json([]);
    }

    const suggestions = autocomplete(query);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({
      message: "Autocomplete failed",
      error: error.message,
    });
  }
});

// Search + Pagination
router.get("/", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const data = await search(query, page, limit);

    res.json({
      query,
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message,
    });
  }
});

module.exports = router;