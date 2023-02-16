export interface IDraw { 
    _id: string,
    title: string,
    createdAt: number,
    player1: { userId: string, fullname: string, dataUrl: string },
    player2: { userId: string, fullname: string, dataUrl: string },
}