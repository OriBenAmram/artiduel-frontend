import { IDraw } from "./IDraw";
export interface IUser {
    _id?: string
    fullName?: string | undefined
    username: string
    email: string
    imgUrl?: URL | undefined
    score?: number | undefined
    draws?: IDraw[] | undefined
    description?: string | undefined
}
