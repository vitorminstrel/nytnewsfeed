import { ArticleSummaryModel } from "../ArticleModels";

export module Home {
    interface State {
        articles: ArticleSummaryModel[];
        isFilter: boolean;
        loadingHot: boolean;
        errorFetchingApi: string;
    }
}
