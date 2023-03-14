import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slicers/user.slice";
import { gameSlice } from "./slicers/game.slice";
import { drawSlice } from "./slicers/draw.slice";
import { appSlice } from "./slicers/app.slice";

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        user: usersSlice.reducer,
        game: gameSlice.reducer,
        draw: drawSlice.reducer,
    }
})

type RootState = ReturnType<typeof store.getState>
export const isScreenNarrow = (state: RootState) => state.app.isNarrow
export const selectedUser = (state: RootState) => state.user.loggedinUser
export const selectedOpponent = (state: RootState) => state.game.opponentPlayer
export const selectedDrawings = (state: RootState) => state.draw.drawings
export const selectedIsHost = (state: RootState) => state.game.isHost
export const selectedWord = (state: RootState) => state.game.word

export default store