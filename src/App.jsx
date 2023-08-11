import React, { useEffect, useState } from "react";
import CompareSimilarity from "./compareSimilarity"; // Import the CompareSimilarity component
import CompareSimilarityTwo from "./CompareSimilarityTwo";
import "./App.css"; // Import the App.css file

const Database = require("@replit/database")
const db = new Database()

// Import axios
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [ name, setName ] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("<API_ENDPOINT>"); // Use axios to fetch articles
        setArticles(response.data.articles); // Set fetched articles in state
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, []);

  const onChange = (e) => {
    setName(e.target.value)
    
  }

  const onClickSetName = () => {
    db.set("name", name)
    .then(() => {})
  }

  const onClickLS = () => {
    db.set("name", name)
  }

  return (
    <main>
      <h1>Article Views</h1>
      <button onClick={onClickSetName}>Click To Store a Name</button>
      <input 
        value={name}
        onChange={onChange}
      />
      <button onClick={onClickLS}></button>
      <CompareSimilarityTwo/>
      <CompareSimilarity /> {/* Run the CompareSimilarity component */}
    </main>
  );
}
