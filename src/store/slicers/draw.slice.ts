
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IDraw } from "../../model/interfaces/IDraw";
import { IFormattedDraw } from "../../model/interfaces/IFormattedDraw";

interface IDrawSliceState {
    drawings: IDraw[]
}


const initialState: IDrawSliceState = {
    drawings: []
}

export const drawSlice = createSlice({
    name: 'draw',
    initialState,
    reducers: {
        setDrawings: (state, action: PayloadAction<IDraw[]>) => {
            
            state.drawings = action.payload
        },
        addDrawing: (state, action: PayloadAction<IDraw>) => {
            state.drawings.push(action.payload)
        },
        updateDrawing: (state, action: PayloadAction<IDraw>) => {
            state.drawings = state.drawings.map(draw => (draw._id === action.payload._id) ? action.payload : draw)
        },
        removeDrawing: (state, action: PayloadAction<string>) => {
            state.drawings = state.drawings.filter(d => d._id !== action.payload)
        },
    }
})

export const { setDrawings, addDrawing, updateDrawing, removeDrawing } = drawSlice.actions