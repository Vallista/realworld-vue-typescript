export interface Profile {
    username: string,
    bio: string,
    image: string,
    following: boolean,
}

export interface Article extends NewArticle {
    slug: string,
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: Profile,
}

export interface ListStatus {
    dispatch: string,
    filter: ArticleFilter
    page: number,
}

export interface NewArticle {
    title: string,
    description: string,
    body: string,
    tagList: Array<string>
}

export interface Articles {
    articles: Array<Article>,
    articlesCount: number,
}

export interface CommentData {
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}

export interface TabItem {
    title: string
    dispatch: string
    filter?: ArticleFilter,
    isActive: boolean
    isAuth: boolean
}

export interface ArticleFilter {
    tag? : string,
    author? : string,
    favorited? : string,
    limit? : number,
    offset? : number
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

export interface User {
    bio: string,
    createdAt: string,
    email: string,
    id: number,
    image: string,
    token: string,
    updatedAt: string,
    username: string,
}
