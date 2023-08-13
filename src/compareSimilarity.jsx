import React, { useState } from "react";
import placeholderData from "./placeholderData.json";
import "./App.css";

const getSourceName = (sourceId) => {
  switch (sourceId) {
    case "thehill":
      return "The Hill";
    case "washingtontimes":
      return "The Washington Times";
    case "cnbc":
      return "CNBC";
    case "wcpo":
      return "WCPO";
    case "tmj4":
      return "TMJ4";
    case "fbcnews":
      return "FBC News";
    case "ndtv":
      return "NDTV";
    case "dailypress":
      return "Daily Press";

    // Add more cases for other sources if needed
    default:
      return sourceId;
  }
};

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
      setCollapsedGroups(collapsedGroups.filter((index) => index !== groupIndex));
    } else {
      setCollapsedGroups([...collapsedGroups, groupIndex]);
    }
  };

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div>
      {similarityGroups.map((group, groupIndex) => {
        const isCollapsed = collapsedGroups.includes(groupIndex);
        const { article, similarArticles, similarityAvg } = group;
        const filteredArticles = similarArticles.filter(
          (article) => article.similarityScore >= 0.4
        );

        return (
          <div key={groupIndex} className="articleContainer">
            <div className="topGroup">
              <div>
                <h3>{article.title}</h3>
              </div>
              <h2>
                <button
                  className="collapsible buttonGroup"
                  onClick={() => toggleCollapse(groupIndex)}
                >
                  {groupIndex + 1}
                </button>
              </h2>
            </div>
            {!isCollapsed && (
              <div>
                <p>Source: {getSourceName(article.source_id)}</p>
                <p>Title: {article.title}</p>
                <p>
                  <a href={article.link}>Link for the article</a>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateContent(article.content, 500),
                  }}
                />
                <h3>Similar Articles:</h3>
                {filteredArticles.map((article, articleIndex) => (
                  <div key={articleIndex}>
                    <h4>
                      Article {articleIndex + 1}: {article.article.title}
                    </h4>
                    <p>
                      Similarity Score:{" "}
                      <span
                        style={{ color: calculateColor(article.similarityScore) }}
                      >
                        {article.similarityScore}
                      </span>
                    </p>
                  </div>
                ))}
                <p>
                  Similarity Average:{" "}
                  <span style={{ color: calculateColor(similarityAvg) }}>
                    {similarityAvg}
                  </span>
                </p>
              </div>
            )}
            {isCollapsed && (
              <div>
                <h3>Original Article Summary:</h3>
                <p>
                  Similarity Average:{" "}
                  <span style={{ color: calculateColor(similarityAvg) }}>
                    {similarityAvg}
                  </span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CompareSimilarity;



