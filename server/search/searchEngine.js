const Document = require("../models/Document");
const tokenize = require("./tokenizer");
const InvertedIndex = require("./invertedIndex");
const Trie = require("./trie");
const { calculateDocumentScore } = require("./ranking");

const index = new InvertedIndex();
const trie = new Trie();

async function buildIndex() {
  index.clear();
  trie.clear();

  const documents = await Document.find();

  documents.forEach((document) => {
    // Add document to inverted index
    index.addDocument(
      document._id.toString(),
      document.title,
      document.content
    );

    // Add words to Trie
    const words = tokenize(
      `${document.title} ${document.content}`
    );

    words.forEach((word) => {
      trie.insert(word);
    });
  });

  console.log(`Indexed ${documents.length} documents`);
}

async function search(query, page = 1, limit = 10) {
  const words = tokenize(query);

  if (words.length === 0) {
    return {
      total: 0,
      page,
      limit,
      totalPages: 0,
      results: [],
    };
  }

  // Find matching document IDs
  const documentIds = index.searchMultiple(words);

  // Get matching documents from MongoDB
  const documents = await Document.find({
    _id: {
      $in: [...documentIds],
    },
  });

  const totalDocuments = await Document.countDocuments();

  // Calculate ranking score
  const rankedDocuments = documents.map((document) => {
    const score = calculateDocumentScore(
      document,
      query,
      totalDocuments,
      index
    );

    return {
      ...document.toObject(),
      score: Number(score.toFixed(4)),
    };
  });

  // Sort by relevance score
  rankedDocuments.sort((a, b) => b.score - a.score);

  // Pagination
  const total = rankedDocuments.length;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedResults = rankedDocuments.slice(
    startIndex,
    endIndex
  );

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    results: paginatedResults,
  };
}

function autocomplete(query) {
  return trie.autocomplete(query);
}

module.exports = {
  buildIndex,
  search,
  autocomplete,
};