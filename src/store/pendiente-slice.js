import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listadoPendientes: [],
}

const pendientesSlice = createSlice({
    name: 'pendientes',
    initialState: initialState,
    reducers: {
        cargarUsuariosPendientes(state, action) {
            state.listadoPendientes = action.payload
        },
        actualizarUsuariosPendientes(state, action) {
            const nuevoListado = state.listadoPendientes.filter(p => !action.payload.includes(p._id))
            console.log(nuevoListado)
            state.listadoPendientes = nuevoListado
        }
    }
})

export const pendientesActions = pendientesSlice.actions

export default pendientesSlice