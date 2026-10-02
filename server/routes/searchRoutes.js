const express = require("express");

const {
  search,
  autocomplete,
} = require("../search/searchEngine");

const SearchHistory = require("../models/SearchHistory");

const optionalAuth = require("../middleware/optionalAuth");

const router = express.Router();

router.get("/autocomplete", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    const results = autocomplete(q);

    res.json(results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Autocomplete failed",
    });
  }
});

router.get("/", optionalAuth, async (req, res) => {
  try {
    const {
      q,
      page = 1,
      limit = 10,
    } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const startTime = Date.now();

    const result = await search(
      q,
      Number(page),
      Number(limit)
    );

    const executionTime =
      Date.now() - startTime;

    await SearchHistory.create({
      user: req.user ? req.user.id : null,
      query: q,
      resultCount: result.total || 0,
      executionTime,
    });

    res.json({
      ...result,
      executionTime,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Search failed",
    });
  }
});

module.exports = router;