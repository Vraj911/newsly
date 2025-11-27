import { useNews } from "../hooks/useNews";

export default function CategoryButtons() {
  const { loadNews } = useNews();

  const cats = ["sports", "politics", "entertainment", "health", "fitness"];

  return (
    <div className="categoryButton">
      {cats.map((c) => (
        <button key={c} onClick={() => loadNews(c)}>{c}</button>
      ))}
    </div>
  );
}
