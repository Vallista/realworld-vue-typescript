export interface HomeState {
    articles: Array<object>
    articlesCount: number
    articleListIsLoading: boolean
    tags: Array<string>
    feedTabMenus: Array<FeedTabObj>
}

export interface FeedTabObj {
    title: string
    href: string
    isActive: boolean
}

export interface ArticleRequestParams {
    tag? : string,
    author? : string,
    favorited? : any,
    limit? : any,
    offset? : any
}
