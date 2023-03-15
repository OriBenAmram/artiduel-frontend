
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IOpponentMiniUser } from "../../model/interfaces/IUser";
import { userService } from "../../services/user.service";

interface GameSliceState {
    opponentPlayer: IOpponentMiniUser,
    isHost: boolean,
    word: string | null
}

const initialState: GameSliceState = {
    opponentPlayer: userService.getOpponentUser() || null,
    isHost: false,
    word: null
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameSettings: (state, action: PayloadAction<any>) => {
            console.log('action:', action);
            
            state.opponentPlayer = action.payload.opponentPlayer
            state.isHost = action.payload.isHost
            state.word = action.payload.word
        },
        setOpponent: (state, action: PayloadAction<any>) => {
            state.opponentPlayer = action.payload
        },
        setIsHost: (state, action: PayloadAction<any>) => {
            state.isHost = action.payload
        },
        setWord: (state, action: PayloadAction<any>) => {
            state.word = action.payload
        },
    }
})

export const { setOpponent, setWord, setGameSettings } = gameSlice.actions