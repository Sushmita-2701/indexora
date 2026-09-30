const Document = require("../models/Document");
const tokenize = require("./tokenizer");
const InvertedIndex = require("./invertedIndex");

const index = new InvertedIndex();

async function buildIndex() {
  index.clear();

  const documents = await Document.find();

  documents.forEach((document) => {
    const text = `${document.title} ${document.content}`;

    index.addDocument(
      document._id.toString(),
      text
    );
  });

  console.log(`Indexed ${documents.length} documents`);
}

async function search(query) {
  const words = tokenize(query);

  if (words.length === 0) {
    return [];
  }

  const documentIds = index.searchMultiple(words);

  const documents = await Document.find({
    _id: { $in: [...documentIds] },
  });

  return documents;
}

module.exports = {
  buildIndex,
  search,
};