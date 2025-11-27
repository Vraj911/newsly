
import { useContext } from "react";
import { NewsContext } from "../context/NewsCOntext";
import { fetchNews } from "../api/newsApi";

export const useNews = () => {
  const { search, setArticles, language, loading, setLoading } = useContext(NewsContext);

  const loadNews = async (query = search, lang = language) => {
    setLoading(true);
    const data = await fetchNews(query, lang);
    setArticles(data);
    setLoading(false);
  };

  return { loadNews };
};
