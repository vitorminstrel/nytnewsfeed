import React from 'react';
import './filtered-articles.scss';
import { Link } from 'react-router-dom';
import { FilteredArticles as FilteredArticlesType } from '../../types/components/FilteredArticles';

const FilteredArticles: React.StatelessComponent<FilteredArticlesType.Props> = (props) => {
  
  const renderFilteredArticles = () => {      
    if (!props.articles || props.articles.length === 0) {
      return (
        <div className="no-results">
          <p>The API returned no results for the specified text</p>
        </div>
      );
    }

    return (
      props.articles.map((article, index) => {
        return (
          <div className="article" key={`article${index}`}>
            <Link to={`/article/${article.id}`} className="header">
              { article.title }
            </Link>
            <span className="publish-date">{ article.publishDate}</span>
            <p className="description">{ article.description }</p>
          </div>
        )
      })
    );
  };

  return (
    <div className="filtered-articles">
      { renderFilteredArticles() }
    </div>
  );
};

export { FilteredArticles };
