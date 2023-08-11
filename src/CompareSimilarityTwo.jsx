import React, { useState } from "react";
import placeholderData from "./placeholderData.json";
import "./App.css";

const CompareSimilarityTwo = ({subject = 'The War in Ukraine'}) => {
  const similarity = (content1, content2) => {
    const words1 = content1.split(" ");
    const words2 = content2.split(" ");
    const commonWords = words1.filter((word) => words2.includes(word));
    const similarityScore = commonWords.length / words1.length;
    return similarityScore;
  };

  const { results } = placeholderData;
  const similarityGroups = [];

  for (let i = 0; i < results.length; i++) {
    const articleToCompare = results[i];
    const similarArticles = [];

    for (let j = i + 1; j < results.length; j++) {
      const article = results[j];
      const similarityScore = similarity(
        articleToCompare.content,
        subject
      );

      console.log(similarityScore);
      if (similarityScore > 0.3) {
        similarArticles.push({ article, similarityScore });
      }
    }

    if (similarArticles.length > 0) {
      const similaritySum = similarArticles.reduce(
        (acc, cur) => acc + cur.similarityScore,
        0
      );
      const similarityAvg = similaritySum / similarArticles.length;

      similarityGroups.push({
        article: articleToCompare,
        similarArticles,
        similarityAvg,
      });
    }
  }

  const calculateColor = (score) => {
    const minScore = 0;
    const maxScore = 1;
    const minHue = 0;
    const maxHue = 120;
    const hue =
      (maxHue - minHue) * ((score - minScore) / (maxScore - minScore)) + minHue;
    const saturation = 100;
    const lightness = 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const [collapsedGroups, setCollapsedGroups] = useState([]);
  const toggleCollapse = (groupIndex) => {
    if (collapsedGroups.includes(groupIndex)) {
      setCollapsedGroups(
        collapsedGroups.filter((index) => index !== groupIndex)
      );
    } else {
      setCollapsedGroups([...collapsedGroups, groupIndex]);
    }
  };

  return (
    <div>
      Hello Butt
    </div>
  );
};

export default CompareSimilarityTwo;