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
    isAuth: boolean
}

export interface ArticleRequestParams {
    tag? : string,
    author? : string,
    favorited? : any,
    limit? : any,
    offset? : any
}

export interface InputFieldProps {
    inputType: string,
    placeholder: string,
    model: string,
}

export interface RegisterUser {
    name: string,
    email: string,
    password: string,
}

export interface LoginUser {
    email: string,
    password: string,
}

export interface UpdateUser {
    email: string,
    bio: string,
    image: string,
    username: string,
    password: string,
}
