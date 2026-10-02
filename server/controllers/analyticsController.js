const Document = require("../models/Document");
const User = require("../models/User");
const SearchHistory = require("../models/SearchHistory");

const getOverview = async (req, res) => {
  try {
    const totalDocuments =
      await Document.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const totalSearches =
      await SearchHistory.countDocuments();

    const averageResult =
      await SearchHistory.aggregate([
        {
          $group: {
            _id: null,
            averageSearchTime: {
              $avg: "$executionTime",
            },
          },
        },
      ]);

    const averageSearchTime =
      averageResult.length > 0
        ? averageResult[0].averageSearchTime
        : 0;

    res.json({
      totalDocuments,
      totalUsers,
      totalSearches,
      averageSearchTime: Number(
        averageSearchTime.toFixed(2)
      ),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};

const getPopularSearches = async (req, res) => {
  try {
    const searches =
      await SearchHistory.aggregate([
        {
          $group: {
            _id: "$query",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 10,
        },
      ]);

    res.json(searches);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch popular searches",
    });
  }
};

const getRecentSearches = async (req, res) => {
  try {
    const searches =
      await SearchHistory.find()
        .populate("user", "name email")
        .sort({
          createdAt: -1,
        })
        .limit(20);

    res.json(searches);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch recent searches",
    });
  }
};

module.exports = {
  getOverview,
  getPopularSearches,
  getRecentSearches,
};