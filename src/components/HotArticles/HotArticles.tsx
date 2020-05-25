import React from 'react';
import './hot-articles.scss';
import { Link } from 'react-router-dom';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { HotArticles as HotArticlesType } from '../../types/components/HotArticles';

const HotArticles: React.StatelessComponent<HotArticlesType.Props> = (props) => {
  
  const renderHotArticles = () => {
    return (
      props.articles.map((article, index) => {
        return (
          <CarouselItem key={`article${index}`}>
            <div className="article">
              <div className="header">
                <span className="section">{ article.section }</span>
                <span className="publish-date">{ article.publishDate }</span>
              </div>
              <Link to={`/article/${article.id}`} className="headline" >
                { article.title }
              </Link>
              <p className="description">{ article.description }</p>
              <div className="image">
                <img id="imageImg" src={article.imageUrl} alt='' style={{width: '100%'}} />
              </div>
            </div>
          </CarouselItem>
        )
      })
    );
  };

  return(
    <Carousel className="carousel">
      { renderHotArticles() }
    </Carousel>
  );
};

export { HotArticles };
