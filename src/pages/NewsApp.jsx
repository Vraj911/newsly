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
  }, []);
  return (
    <>
      <Navbar />
      <SearchBar />
      <CategoryButtons />
      {loading ? <p>Loading...</p> : <Card data={articles} />}
    </>
  );
}
