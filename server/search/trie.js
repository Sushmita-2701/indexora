class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;

    for (const char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }

      current = current.children[char];
    }

    current.isEnd = true;
  }

  autocomplete(prefix) {
    let current = this.root;

    for (const char of prefix.toLowerCase()) {
      if (!current.children[char]) {
        return [];
      }

      current = current.children[char];
    }

    const results = [];

    const collectWords = (node, word) => {
      if (node.isEnd) {
        results.push(word);
      }

      for (const char in node.children) {
        collectWords(
          node.children[char],
          word + char
        );
      }
    };

    collectWords(current, prefix.toLowerCase());

    return results.slice(0, 10);
  }

  clear() {
    this.root = new TrieNode();
  }
}

module.exports = Trie;