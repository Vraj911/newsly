import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from 'react-icons/fa';
import Card from "./Card";
const Newsapp = () => {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("en");  
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const allSuggestions = ["India", "Technology", "AI", "Health", "Fitness", "Politics", "Entertainment", "Sports", "NASA", "Business"];
    const API_KEY = "03abb84ba7454211b2707ba668babdc4";
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };
    const getData = async (query = search, pageNum = 1, lang = language) => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}&page=${pageNum}&language=${lang}`
            );
            const data = await res.json();
            setNewsData(data.articles);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };
    const handleInput = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = allSuggestions.filter(s => s.toLowerCase().startsWith(value.toLowerCase()));
        setSuggestions(filtered);
        setShowSuggestions(value.length > 0 && filtered.length > 0);
    };
    const handleSuggestionClick = (value) => {
        setSearch(value);
        setShowSuggestions(false);
        getData(value, 1);  
    };
    const handleSearch = () => {
        getData(search, 1);
        setShowSuggestions(false);
    };
    const sortByDate = () => {
        const sortedData = [...newsData].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setNewsData(sortedData);
    };
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        getData(search, 1, e.target.value);  
    };
    const stopSpeaking = () => {
        speechSynthesis.cancel(); 
    };
    useEffect(() => {
        getData();
    }, []); 
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDarkMode]);
    return (
        <div>
            <nav>
                <div className="logo">
                    📰 News<span style={{ color: "#ffd700" }}>ly</span>
                </div>
                <div className="searchbar">
                    <input
                        type="text"
                        placeholder="Search news"
                        value={search}
                        onChange={handleInput}
                        onFocus={() => setShowSuggestions(suggestions.length > 0)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    {showSuggestions && (
                        <ul className="suggestion-list">
                            {suggestions.map((sug, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(sug)}>
                                    {sug}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="sortContainer">
                    <button onClick={sortByDate} className="sort">Sort by Newest</button>
                </div>
                <div className="header-right">
                    <div className="language-dropdown">
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                    </div>
                    <button onClick={stopSpeaking} className="stop-speech-button">
                        🔇 Stop Speaking
                    </button>

                    <button onClick={toggleDarkMode} className="dark-mode-toggle">
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            </nav>
            <p className="head">Stay updated with the latest & trending news 🔥</p>
            <div className="categoryButton">
                <button onClick={() => getData("sports")}>Sports</button>
                <button onClick={() => getData("politics")}>Politics</button>
                <button onClick={() => getData("entertainment")}>Entertainment</button>
                <button onClick={() => getData("health")}>Health</button>
                <button onClick={() => getData("fitness")}>Fitness</button>
            </div>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading news...</p>
                </div>
            ) : (
                <Card data={newsData} />
            )}
        </div>
    );
};
export default Newsapp;
