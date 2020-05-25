import React from 'react';
import { ArticleDetails as ArticleDetailsType } from '../../types/components/ArticleDetails';
import { Link } from 'react-router-dom';
import './article-details.scss';
import { ArticleFeedService } from '../../services/article-feed-service';
import { ArticleDetailsModel } from '../../types/ArticleModels';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

class ArticleDetails extends React.Component<ArticleDetailsType.Props, ArticleDetailsType.State> {

  constructor(props: ArticleDetailsType.Props) {
    super(props);
    this.state = {
      errorFromApi: '',
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    ArticleFeedService.getNYTArticleById(this.props.id)
    .then((article: ArticleDetailsModel) => {
      this.setState({ article });
    })
    .catch((errorFromApi) => {
      this.setState({ errorFromApi });
    })
    .finally(() => {
      this.setState({ loading: false });
    });
  }
  
  public render(): JSX.Element {
    const renderErrorFetchingApi = () => {
      return this.state.errorFromApi !== '' && (
        <div className="api-error">
          <p>{ this.state.errorFromApi }</p>
        </div>
      );
    }

    const renderDetails = () => {
      return this.state.article && (
        <div className="content">
          <div className="section">
            <a className="main-headline" href={ this.state.article.url } target="_blank">{ this.state.article.mainHeadline }</a>
            <p className="print-headline">{ this.state.article.printHeadline }</p>
            <p className="writer">{ `${this.state.article.writer} (${this.state.article.publishDate})` }</p>
          </div>
          <div className="section">
            <div className="title">
              Abstract: 
            </div>
            <div id="abstract" className="description">
              { this.state.article.abstract }
            </div>
          </div>
          <div className="section">
            <div className="title">
              Lead Paragraph: 
            </div>
            <div id="leadParagraph" className="description">
              { this.state.article.leadParagraph }
            </div>
          </div>
          <div className="section">
            <div className="title">
              Image: 
            </div>
            <div className="description">
              <img id="image" alt='' src={ this.state.article.imageUrl} style={{width: '100%'}} />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="article-details">
        <Link to="/">Back to Main Page</Link>
        { renderErrorFetchingApi() }
        { renderDetails() }
        <LoadingScreen isShow={this.state.loading} />
      </div>
    );
  }
};

export { ArticleDetails };
