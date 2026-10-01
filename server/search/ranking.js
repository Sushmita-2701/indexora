const tokenize = require("./tokenizer");
function calculateTF(words, term) {
  if (words.length === 0) {
    return 0;
  }
  const count = words.filter((word) => word === term).length;

  return count / words.length;
}
function calculateIDF(totalDocuments, documentsContainingTerm) {
  if (documentsContainingTerm === 0) {
    return 0;
  }
  return Math.log(
    (totalDocuments + 1) / (documentsContainingTerm + 1)
  ) + 1;
}
function calculateDocumentScore(document, query, totalDocuments, index) {
  const queryWords = tokenize(query);

  const documentWords = tokenize(
    `${document.title} ${document.content}`
  );
  let score = 0;
  queryWords.forEach((term) => {
    const tf = calculateTF(documentWords, term);
    const postingList = index.search(term);
    const df = postingList.size;
    const idf = calculateIDF(totalDocuments, df);
    score += tf * idf;
  });
  return score;
}
module.exports = {
  calculateDocumentScore,
};