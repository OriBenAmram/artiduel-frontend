import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slicers/user.slice";

const store = configureStore({
    reducer: {
        user: usersSlice.reducer
    }
})

type RootState = ReturnType<typeof store.getState>
export const selectedUser = (state: RootState) => state.user.loggedinUser

export default store