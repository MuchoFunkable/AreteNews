import React, { useEffect } from "react";
import placeholderData from "./placeholderData.json";
import "./App.css";

const ArticleFetch = ({ setArticles }) => {
  useEffect(() => {
    const fetchArticles = () => {
      try {
        setArticles(placeholderData.articles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, [setArticles]);

  return null;
};

export default ArticleFetch;
