import { createContext, useState } from "react";
export const NewsContext = createContext();
export const NewsProvider = ({ children }) => {
  const [search, setSearch] = useState("india");
  const [articles, setArticles] = useState([]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  return (
    <NewsContext.Provider
      value={{
        search, setSearch,
        articles, setArticles,
        language, setLanguage,
        loading, setLoading
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
