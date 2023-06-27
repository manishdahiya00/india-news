import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await fetch(
        "https://newsdata.io/api/1/news?apikey=pub_251970508930c142b0e38e6a3f099c43d75e0&q=market&country=in&language=en"
      );
      const data = await response.json();
      setApiData(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const truncateContent = (content, limit) => {
    if (content.split(" ").length > limit) {
      return content.split(" ").slice(0, limit).join(" ") + "...";
    }
    return content;
  };

  return (
    <div>
      <h1 className="h1">India News</h1>
      <div className="cards_box">
        {apiData.map((item) => (
          <div className="analytics_box" key={item.id}>
            <div className="title">
              <h2>{item.title}</h2>
              <p className="content">{truncateContent(item.content, 200)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
