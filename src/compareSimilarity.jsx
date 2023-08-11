import React, { useState } from "react";
import placeholderData from "./placeholderData.json";
import "./App.css";

const CompareSimilarity = () => {
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
        article.content
      );

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
      {similarityGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="articleContainer">
          <div class="topGroup">
            <h3>Original Article:</h3>
            <h2>
              <button
                className="collapsible buttonGroup"
                onClick={() => toggleCollapse(groupIndex)}
              >
                Group {groupIndex + 1}:
              </button>
            </h2>
          </div>
          {!collapsedGroups.includes(groupIndex) && (
            <div>
              <p>Source: {group.article.source_id}</p>
              <p>Title: {group.article.title}</p>
              <p>URL: {group.article.link}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: group.article.content.slice(0, 200),
                }}
              />
              <h3>Similar Articles:</h3>
              {group.similarArticles
                .filter((article) => article.similarityScore >= 0.4) // Filter out articles with similarity-score less than 0.4
                .map((article, articleIndex) => (
                  <div key={articleIndex}>
                    <h3>
                      Article {articleIndex + 1}: {article.article.title}
                    </h3>
                    <p>
                      Similarity Score:{" "}
                      <span
                        style={{
                          color: calculateColor(article.similarityScore),
                        }}
                      >
                        {article.similarityScore}
                      </span>
                    </p>
                  </div>
                ))}
              <p>
                Similarity Average:{" "}
                <span
                  style={{
                    color: calculateColor(group.similarityAvg),
                  }}
                >
                  {group.similarityAvg}
                </span>
              </p>
            </div>
          )}
          {collapsedGroups.includes(groupIndex) && (
            <div>
              <h3>Original Article Summary:</h3>
              <p>Title: {group.article.title}</p>
              <p>
                Similarity Average:{" "}
                <span
                  style={{
                    color: calculateColor(group.similarityAvg),
                  }}
                >
                  {group.similarityAvg}
                </span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompareSimilarity;


