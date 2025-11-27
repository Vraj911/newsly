import { NewsProvider } from "./context/NewsContext";
import NewsApp from "./pages/NewsApp";

export default function App() {
  return (
    <NewsProvider>
      <NewsApp />
    </NewsProvider>
  );
}
