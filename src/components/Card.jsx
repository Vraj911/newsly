import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
const Card = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No news articles to display.</p>;
    }
    const readMore = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };
    const speakText = (title, description) => {
        const message = new SpeechSynthesisUtterance(`${title}. ${description}`);
        message.lang = 'en-US';
        speechSynthesis.cancel(); 
        speechSynthesis.speak(message);
    };
    return (
        <div className="cardContainer">
            {data.map((item, index) => {
                if (!item.urlToImage) return null;
                const formattedDate = new Date(item.publishedAt).toLocaleDateString();
                return (
                    <div className="card" key={index}>
                        <img src={item.urlToImage} alt={`News related to ${item.title}`} />
                        <div className="cardContent">
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="news-title"
                                aria-label={`Read full article: ${item.title}`}
                            >
                                {item.title}
                            </a>
                            <p>{item.description}</p>
                            <small>Published on: {formattedDate}</small>

                            <div className="button-container">
                                <button onClick={() => readMore(item.url)}>
                                    Read More
                                </button>
                                <button onClick={() => speakText(item.title, item.description)}>
                                    <FaVolumeUp style={{ marginRight: "5px" }} />
                                    Speak
                                </button>
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(item.title + " " + item.url)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="whatsapp-share"
                                    aria-label="Share this news on WhatsApp"
                                >
                                    <FaWhatsapp size={20} color="#25D366" style={{ marginRight: "5px" }} />
                                    Share
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Card;
