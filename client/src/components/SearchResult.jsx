function SearchResult({ result }) {
  return (
    <div className="result-card">
      <h2>{result.title}</h2>

      <p className="url">
        {result.url}
      </p>

      <p>
        {result.content}
      </p>

      <div className="result-meta">
        <span>Category: {result.category}</span>
        <span>Score: {result.score}</span>
      </div>
    </div>
  );
}

export default SearchResult;


