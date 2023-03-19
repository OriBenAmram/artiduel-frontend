export type ILikeEntity = { 
    userId: string | undefined,
    fullname: string| undefined
}

export interface IDraw { 
    _id: string,
    title: string,
    createdAt: number,
    player1: { userId: string, fullname: string, dataUrl: string, likes: ILikeEntity[], imgUrl: string },
    player2: { userId: string, fullname: string, dataUrl: string, likes: ILikeEntity[], imgUrl: string  },
}