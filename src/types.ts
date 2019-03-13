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

export interface Profile {
    username: string,
    bio: string,
    image: string,
    following: boolean,
}

export interface Article {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: Array<string>,
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: Profile,
}

export interface Articles {
    articles: Array<Article>,
    articlesCount: number,
}
