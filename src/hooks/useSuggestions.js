import { useState } from "react";

const allSuggestions = [
  "India", "Technology", "AI", "Health",
  "Fitness", "Politics", "Entertainment",
  "Sports", "NASA", "Business"
];

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);

  const filterSuggestions = (text) => {
    const filtered = allSuggestions.filter((s) =>
      s.toLowerCase().startsWith(text.toLowerCase())
    );
    setSuggestions(filtered);
    setShowList(text.length > 0 && filtered.length > 0);
  };

  return { suggestions, showList, filterSuggestions, setShowList };
};
