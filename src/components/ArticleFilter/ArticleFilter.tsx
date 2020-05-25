import React from 'react';
import './article-filter.scss';
import { Spinner, Button, FormControl } from 'react-bootstrap';
import { ArticleFeedService } from '../../services/article-feed-service';
import { ArticleFilter as ArticleFilterType } from '../../types/components/ArticleFilter';

class ArticleFilter extends React.Component<ArticleFilterType.Props, ArticleFilterType.State> {

  constructor(props: ArticleFilterType.Props) {
    super(props);
    this.state = {
        textFilter: '',
        loadingFilter: false,
        noResults: false,
    }
  }

  private filterTextKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter'){
      this.filterBtnClick();
    }
  }

  private filterTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ textFilter: event.currentTarget.value });
  }
  
  private filterBtnClick = () => {
    if (this.state.loadingFilter)
      return;

    if (this.state.textFilter !== '') { 
      this.setState({ loadingFilter: true, noResults: false });
      ArticleFeedService.getNYTArticlesByText(this.state.textFilter)
      .then(articles => { 
        this.props.toggleFilter(true);
        this.props.updateFilteredArticles(articles);
      }).catch(errorFetchingApi => {
        this.props.handleErrorFetchingApi(errorFetchingApi);
      }).finally(() => {
        this.setState({ loadingFilter: false });
      })
    } else {
        this.props.toggleFilter(false);
    }
  }
    
  public render(): JSX.Element {
    const renderFilterInput = () => {
        const renderButtonContent = () => {
          if (this.state.loadingFilter) {
            return (
              <>
                <span>Loading</span>
                <Spinner style={{marginLeft: "10px", marginBottom: "2px"}} animation="border" size="sm"></Spinner>
              </>
            )
          }
          else {
            return (
              <span>Search</span>
            )
          }
        }
        return (
          <div className="article-filter">
            <FormControl id="filterTxt" type="text" onKeyPress={this.filterTextKeyPressed} onChange={this.filterTextChanged} />
            <Button id="filterBtn" onClick={this.filterBtnClick}>
              { renderButtonContent() }
            </Button>
          </div>
        );
      }

    return (
      <div>
          { renderFilterInput() }
      </div>
    )
  }
}

export { ArticleFilter };
