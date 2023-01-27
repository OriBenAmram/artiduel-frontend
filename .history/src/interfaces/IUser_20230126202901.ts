import { IDraw } from "./IDraw";
export interface IUser {
    _id?: string
    fullName?: string
    username?: string | undefined
    email?: string | undefined
    imgUrl?: URL | undefined | string
    score?: number | undefined
    draws?: IDraw[] | undefined
    description?: string | undefined
}
