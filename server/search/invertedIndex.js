const tokenize = require("./tokenizer");

class InvertedIndex {
  constructor() {
    this.index = new Map();
  }

  addDocument(documentId, text) {
    const words = tokenize(text);

    words.forEach((word) => {
      if (!this.index.has(word)) {
        this.index.set(word, new Set());
      }

      this.index.get(word).add(documentId);
    });
  }

  search(word) {
    return this.index.get(word) || new Set();
  }

  searchMultiple(words) {
    const results = words.map((word) => {
      return this.search(word);
    });

    if (results.length === 0) {
      return new Set();
    }

    const intersection = [...results[0]];

    return new Set(
      intersection.filter((id) =>
        results.every((set) => set.has(id))
      )
    );
  }

  clear() {
    this.index.clear();
  }
}

module.exports = InvertedIndex;