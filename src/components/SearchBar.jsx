import { useContext } from "react";
import { NewsContext } from "../context/NewsCOntext";
import { useSuggestions } from "../hooks/useSuggestions";
import { useNews } from "../hooks/useNews";

export default function SearchBar() {
  const { search, setSearch } = useContext(NewsContext);
  const { loadNews } = useNews();
  const { suggestions, showList, filterSuggestions, setShowList } = useSuggestions();

  return (
    <div className="searchbar">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          filterSuggestions(e.target.value);
        }}
        onFocus={() => setShowList(true)}
      />
      <button onClick={() => loadNews(search)}>Search</button>

      {showList && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => {
                setSearch(s);
                setShowList(false);
                loadNews(s);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
