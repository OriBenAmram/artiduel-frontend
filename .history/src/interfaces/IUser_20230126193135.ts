import { IDraw } from "./IDraw";
export interface IUser {
    _id: string;
    fullname: string;
    username: string;
    imgUrl: string;
    score: number;
    draws: IDraw[]
}
