
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { IDraw } from "../../model/interfaces/IDraw";

interface IDrawSliceState {
    drawings: IDraw[]
}

interface IAction {
    type: string
    payload: IDraw[]
}

const initialState: IDrawSliceState = {
    drawings: null!
}

export const drawSlice = createSlice({
    name: 'draw',
    initialState,
    reducers: {
        setDrawings: (state, action: PayloadAction<any>) => {
            console.log('action:', action);
            state.drawings = action.payload
        },
        addDrawing: (state, action: PayloadAction<any>) => {
            state.drawings.push(action.payload)
        },
        updateDrawing: (state, action: PayloadAction<any>) => {
            state.drawings = state.drawings.map(draw => (draw._id === action.payload._id) ? action.payload : draw)
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

export const { setDrawings, addDrawing, updateDrawing, removeDrawing } = drawSlice.actions