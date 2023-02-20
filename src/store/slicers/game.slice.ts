
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { userService } from "../../services/user.service";

interface GameSliceState {
    opponentPlayer: any,
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

export const { setOpponent, setWord } = gameSlice.actions