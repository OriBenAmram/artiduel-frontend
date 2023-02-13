import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slicers/user.slice";
import { gameSlice } from "./slicers/game.slice";

const store = configureStore({
    reducer: {
        user: usersSlice.reducer,
        game: gameSlice.reducer
    }
})

type RootState = ReturnType<typeof store.getState>
export const selectedUser = (state: RootState) => state.user.loggedinUser
export const selectedOpponent = (state: RootState) => state.game.opponentPlayer

export default store