import { IDraw } from "./IDraw";
export interface IUser {
    _id: string
    fullName: string
    username: string
    imgUrl: string
    score: number
    draws: IDraw[]
    email: string
    description?: string
}
