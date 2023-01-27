import { IDraw } from "./IDraw";
export interface IUser {
    _id?: string
    fullName: string | undefined
    username: string
    email: string
    imgUrl?: URL
    score?: number
    draws?: IDraw[]
    description?: string
}