const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    query: {
      type: String,
      required: true,
      trim: true,
    },

    resultCount: {
      type: Number,
      default: 0,
    },

    executionTime: {
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