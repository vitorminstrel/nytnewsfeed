export interface ArticleSummaryModel {
    id: string,
    title: string,
    description: string,
    publishDate: string,
    url: string,
    imageUrl?: string,
    section?: string,
}

export interface ArticleDetailsModel {
    url: string,
    abstract: string,
    leadParagraph: string,
    imageUrl: string,
    publishDate: string,
    writer: string,
    mainHeadline: string,
    printHeadline: string,
}
