import React, { useEffect, useState } from "react";
import CompareSimilarity from "./compareSimilarity"; // Import the CompareSimilarity component
import CompareSimilarityTwo from "./CompareSimilarityTwo";
import "./App.css"; // Import the App.css file

// Import axios
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [name, setName] = useState('');

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

  const onClickSetName = async () => {
    // try {
    //   const request = await axios.get('excitableprimesequences.mick-kalle-mkal.repl.co')
    // } catch (error) {
    //   console.error(error)
    // }
  }

  const onClickLS = async () => {
    try {
      const request = await axios.get('https://replit.com/@Mick-Kalle-MKal/ExcitablePrimeSequences/api/getData')
      console.log(request)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <h1>Article Views</h1>
      <button onClick={onClickSetName}>Click To Store a Name</button>
      <input
        value={name}
        onChange={onChange}
      />
      <button onClick={onClickLS}>List DB</button>
      <CompareSimilarityTwo />
      <CompareSimilarity /> {/* Run the CompareSimilarity component */}
    </main>
  );
}
