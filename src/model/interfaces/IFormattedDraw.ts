export type ILikeEntity = {
    userId: string | undefined,
    fullname: string | undefined
}
export interface IFormattedDraw {
    _id: string,
    title: string,
    createdAt: number,
    dataUrl: string
    likes: ILikeEntity[]
}