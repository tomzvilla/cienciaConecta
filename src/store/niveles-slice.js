import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    niveles: [],
}

const nivelesSlice = createSlice({
    name: 'niveles',
    initialState: initialState,
    reducers: {
        cargarNiveles(state, action) {
            state.niveles = action.payload.filter(n => n._id !== 0)
        },
    }
})

export const nivelesActions = nivelesSlice.actions

export default nivelesSlice