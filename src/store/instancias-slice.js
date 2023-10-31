import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    instancia: [],
    feria: {},
}

const instanciasSlice = createSlice({
    name: 'instancias',
    initialState: initialState,
    reducers: {
        setInstancia(state, action) {
            state.instancia = action.payload
        },
        cargarEstadoFeria(state, action) {
            state.feria = action.payload
        }
    }
})

export const instanciasActions = instanciasSlice.actions

export default instanciasSlice