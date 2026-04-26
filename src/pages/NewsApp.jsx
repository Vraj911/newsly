import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryButtons from "../components/CategoryButtons";
import Card from "../components/Card";
import { useContext, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import { useNews } from "../hooks/useNews";
export default function NewsApp() {
  const { articles, search, loading } = useContext(NewsContext);
  const { loadNews } = useNews();
  useEffect(() => {
    loadNews(search);
  }, []);//const VITE_NEWS_API_KEY = "03abb84ba7454211b2707ba668babdc4";
  return (
    <>
      <Navbar />
      <SearchBar />
      <CategoryButtons />
      {loading ? <p>Loading...</p> : <Card data={articles} />}
    </>
  );
}
