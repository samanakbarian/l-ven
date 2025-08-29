
import React from 'react';
import type { NewsArticle } from '../types';

interface NewsProps {
  newsFeed: NewsArticle[];
}

const News: React.FC<NewsProps> = ({ newsFeed }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold px-1">Nyhetsflöde</h2>
      {newsFeed.map(article => (
        <div key={article.id} className="bg-brand-surface rounded-lg p-4">
          <h3 className="text-md font-bold text-loven-green">{article.title}</h3>
          <p className="text-sm text-gray-300 mt-2">{article.summary}</p>
          <div className="text-xs text-gray-500 mt-3 flex justify-between items-center">
            <span>{article.source}</span>
            <span>{formatDate(article.publishedDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
