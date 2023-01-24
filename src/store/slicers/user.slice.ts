
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { userService } from "../../services/user.service";

interface User {
    _id: string;
    fullname: string;
    username: string;
    imgUrl: string;
    score: number
}

interface UserSliceState {
    loggedinUser: User | null;
    users: User[]
}

const initialState: UserSliceState = {
    loggedinUser: userService.getLoggedinUser(),
    users: []
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.loggedinUser = action.payload
        }, 
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user._id !== action.payload)
        }
    }
})

export const { removeUser, setUser } = usersSlice.actions