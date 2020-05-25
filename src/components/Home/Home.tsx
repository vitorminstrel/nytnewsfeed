import React from 'react';
import './home.scss';
import { Home as HomeType } from '../../types/components/Home';
import { ArticleFeedService } from '../../services/article-feed-service';
import { HotArticles } from '../HotArticles/HotArticles';
import { FilteredArticles } from '../FilteredArticles/FilteredArticles';
import { ArticleSummaryModel } from '../../types/ArticleModels';
import { ArticleFilter } from '../ArticleFilter/ArticleFilter';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

class Home extends React.Component<{}, HomeType.State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      articles: [],
      loadingHot: true,
      errorFetchingApi: '',
      isFilter: false,
    }
  }

  componentDidMount() {
    this.loadHotArticles();
  }
  
  public loadHotArticles = () => {
    this.setState({ loadingHot: true });
    ArticleFeedService.getNYTMostViewedArticles().then(articles => {
      this.setState({ articles });
    }).catch(errorFetchingApi => {
      this.setState({ errorFetchingApi });
    }).finally(() => {
      this.setState({ loadingHot: false });
    })
  }

  private toggleFilter = (isFilter: boolean) => {
    this.setState({ isFilter });

    if (!isFilter) {
      this.loadHotArticles();
    }
  }

  public render(): JSX.Element {
    const renderFilteredArticles = () => {
      return this.state.isFilter && (
        <FilteredArticles articles={this.state.articles} />
      );
    }

    const renderHotArticles = () => {
      return !this.state.isFilter && (
        <HotArticles articles={this.state.articles} />
      );
    }

    const renderErrorFetchingApi = () => {
      return this.state.errorFetchingApi !== '' && (
        <div className="api-error">
          <p>{ this.state.errorFetchingApi }</p>
        </div>
      );
    }

    return (
      <div className="home">
        <ArticleFilter 
          toggleFilter={this.toggleFilter}
          updateFilteredArticles={(articles: ArticleSummaryModel[]) => this.setState({ articles }) }
          handleErrorFetchingApi={(errorFetchingApi: string) => this.setState({ errorFetchingApi }) }
        />
        { renderHotArticles() }
        { renderFilteredArticles() }
        { renderErrorFetchingApi() }
        <LoadingScreen isShow={this.state.loadingHot} />
      </div>
    );
  }
}

export { Home };
