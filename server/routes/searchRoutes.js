const express = require("express");
const { search } = require("../search/searchEngine");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const results = await search(query);

    res.json({
      query,
      total: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message,
    });
  }
});

module.exports = router;