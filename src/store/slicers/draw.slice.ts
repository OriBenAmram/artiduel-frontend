
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

interface DrawSliceState {
    drawings: any[]
}

const initialState: DrawSliceState = {
    drawings: []
}

export const drawSlice = createSlice({
    name: 'draw',
    initialState,
    reducers: {
        setDrawings: (state, action: PayloadAction<any>) => {
            state.drawings = action.payload
        },
        addDrawing: (state, action: PayloadAction<any>) => {
            state.drawings.push(action.payload)
        },
        removeDrawing: (state, action: PayloadAction<any>) => {
            state.drawings = state.drawings.filter(d => d._id !== action.payload)
        },
        // setScore: (state, action: PayloadAction<number>) => {
        //     if (state.loggedinUser && state.loggedinUser.score) {
        //         state.loggedinUser.score = state.loggedinUser.score + action.payload
        //     }
        // }
    }
})

export const { setDrawings, addDrawing, removeDrawing } = drawSlice.actions