import { ArticleDetailsModel } from "../ArticleModels";

export module ArticleDetails {
    interface State {
        article?: ArticleDetailsModel;
        errorFromApi: string;
        loading: boolean;
    }
    interface Props {
        id: string;
    }
} 
