import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";

function Home() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

const handleSearch = async (searchQuery) => {
  try {
    setLoading(true);
    setQuery(searchQuery);
    setSearched(true);

    const response = await axios.get(
      "http://localhost:5000/api/search",
      {
        params: {
          q: searchQuery,
        },
      }
    );

    console.log("Search API response:", response.data);

    setResults(response.data.results);
  } catch (error) {
    console.error("Search failed:", error);

    if (error.response) {
      console.log("Backend response:", error.response.data);
    } else {
      console.log("Request error:", error.message);
    }

    setResults([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="home">
      <h1>Indexora</h1>

      <p className="subtitle">
        Search Engine Built From Scratch
      </p>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p className="status">
          Searching...
        </p>
      )}

      {!loading && searched && (
        <div className="results-section">
          <p className="result-count">
            {results.length} results for "{query}"
          </p>

          {results.length === 0 ? (
            <p className="status">
              No results found.
            </p>
          ) : (
            results.map((result) => (
              <SearchResult
                key={result._id}
                result={result}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;