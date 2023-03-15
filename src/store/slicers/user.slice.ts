
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { userService } from "../../services/user.service";
import { IStorageUser } from "../../model/interfaces/IUser";

interface UserSliceState {
    loggedinUser: IStorageUser | null;
    users: IStorageUser[]
}

const initialState: UserSliceState = {
    loggedinUser: userService.getLoggedinUser(),
    users: []
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IStorageUser | null>) => {
            state.loggedinUser = action.payload
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user._id !== action.payload)
        },
        setScore: (state, action: PayloadAction<number>) => {
            if (state.loggedinUser && state.loggedinUser.score) {
                state.loggedinUser.score = state.loggedinUser.score + action.payload
            }
        }
    }
})

export const { removeUser, setUser } = usersSlice.actions