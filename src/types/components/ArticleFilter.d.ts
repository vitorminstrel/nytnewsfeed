import { ArticleSummaryModel } from "../ArticleModels";

export module ArticleFilter {
    interface State {
      textFilter: string;
      loadingFilter: boolean;
      noResults: boolean;
    }

    interface Props {
        toggleFilter:(isFilter: boolean) => void;
        updateFilteredArticles:(articles: ArticleSummaryModel[]) => void;
        handleErrorFetchingApi:(error: string) => void;
    }
}
