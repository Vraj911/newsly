const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "03abb84ba7454211b2707ba668babdc4";
export const fetchNews = async (query, lang = "en", page = 1) => {
  const url = `https://newsapi.org/v2/everything?q=${query}&language=${lang}&page=${page}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.articles || [];
};
