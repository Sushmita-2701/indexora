const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
    },
    resultCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SearchHistory",
  searchHistorySchema
);