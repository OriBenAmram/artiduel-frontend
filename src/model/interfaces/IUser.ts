import { IDraw, ILikeEntity } from './IDraw'
export interface IStorageUser {
    _id: string
    fullname: string
    username: string
    imgUrl: string
    score: number
    likes: ILikeEntity[]
    email?: string | undefined
    drawings?: IDraw[] | undefined
    description?: string | undefined
}

export interface IOpponentMiniUser {
    _id: string
    fullname: string
    imgUrl: string
}