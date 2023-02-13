
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { userService } from "../../services/user.service";

interface GameSliceState {
    opponentPlayer: any,
    isHost: boolean
}

const initialState: GameSliceState = {
    opponentPlayer: userService.getOpponentUser() || null,
    isHost: false
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setOpponent: (state, action: PayloadAction<any>) => {
            state.opponentPlayer = action.payload
        },
        setGameSetting: (state, action: PayloadAction<any>) => {
            state = action.payload
        },
    }
})

export const { setOpponent, setGameSetting } = gameSlice.actions