import { ArticleSummaryModel, ArticleDetailsModel } from "../types/ArticleModels";

const apiKey = '6dnrnKuhC0f89vGn5HmrGRnMkAsrcryO';
const mostViewedWithinDays = 7;

export const ArticleFeedService = {
    getNYTArticlesByText(textFilter: string): Promise<ArticleSummaryModel[]> {

        return sendAjaxRequest(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:("${textFilter}")&api-key=${apiKey}`,
        (json: any): ArticleSummaryModel[] => {
            if (!json.response.docs || json.response.docs.length === 0) {
                return [];
            }

            return json.response.docs
                .filter((article: any) => {
                    return !article['_id'].includes('video') 
                }).map((article: any) => {
                    return {
                        id: article['_id'].replace('nyt://article/', ''),
                        title: article.headline.main,
                        description: article.headline.print_headline,
                        publishDate: new Date(article.pub_date).toDateString(),
                    }
                });
        });

    },
    
    getNYTArticleById(id: string): Promise<ArticleDetailsModel> {
        return sendAjaxRequest(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:("nyt://article/${id}")&api-key=${apiKey}`,
        (json: any): any => {
            if (!json.response.docs || json.response.docs.length === 0) {
                throw 'API failed loading article by id';
            }
            const art = json.response.docs[0];
            return {
                url: art.web_url,
                abstract: art.abstract,
                leadParagraph: art.lead_paragraph,
                imageUrl: art.multimedia.length > 0 ? `https://static01.nyt.com/${art.multimedia[0].url}` : '',
                publishDate: new Date(art.pub_date).toDateString(),
                writer: art.byline.original,
                mainHeadline: art.headline.main,
                printHeadline: art.headline.print_headline
            };
        });
    },

    getNYTMostViewedArticles(): Promise<ArticleSummaryModel[]> {
        return sendAjaxRequest(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${mostViewedWithinDays}.json?&api-key=${apiKey}`,
        (json: any): ArticleSummaryModel[] => {
            if (!json.results || json.results.length === 0) {
                return [];
            }

            return json.results
                .filter((article: any) => {
                    return article.media.length > 0 && !article.uri.includes('video') 
                })
                .slice(0,10)
                .map((article: any) => {
                return {
                    id: article.uri.replace('nyt://article/', ''),
                    title: article.title,
                    imageUrl: article.media[0]['media-metadata'][2]['url'],
                    description: article.media[0]['caption'],
                    publishDate: new Date(article.published_date).toDateString(),
                    section: article.section,
                }
            })
        });
    }
}

const sendAjaxRequest = (queryString: string, mapCallback: (json: any) => any): any => {
    let request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.open('GET', queryString);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                try{
                    resolve(mapCallback(JSON.parse(request.responseText)));
                } catch (e) {
                    reject(`failed to connect to API: ${e}`);
                }
            }
            else {
                reject('failed to connect to API');
            }
        }
        request.send();
    });
}