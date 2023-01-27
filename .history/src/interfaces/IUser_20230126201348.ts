import { IDraw } from "./IDraw";
export interface IUser {
    _id: string
    fullName: string
    username: string
    imgUrl: URL
    score: number
    draws: IDraw[]
    email: string
    description?: string
}
