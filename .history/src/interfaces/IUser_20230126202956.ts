import { IDraw } from "./IDraw";
export interface IUser {
    _id?: string
    fullName?: string
    username?: string | undefined
    email?: string | undefined
    imgUrl?: string | undefined
    score?: number | undefined
    draws?: IDraw[] | undefined
    description?: string | undefined
}
