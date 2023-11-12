import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    instancia: [],
    feria: {},
    nroProyectos: null,
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
        },
        cargarProyectos(state, action) {
            state.nroProyectos = action.payload
        },
        removeProyecto(state) {
            state.nroProyectos--
        }
    }
})

export const instanciasActions = instanciasSlice.actions

export default instanciasSlice