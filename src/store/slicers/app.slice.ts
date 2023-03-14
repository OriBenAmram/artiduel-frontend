
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

interface AppSliceState {
    isNarrow: boolean
}

const initialState: AppSliceState = {
    isNarrow: window.matchMedia("(max-width: 760px)").matches
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setNarrowState: (state, action: PayloadAction<boolean>) => {
            state.isNarrow = action.payload
        },
    }
})

export const { setNarrowState } = appSlice.actions