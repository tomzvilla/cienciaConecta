import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listadoPendientes: [],
    selectedRows: [],
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
            state.listadoPendientes = nuevoListado
        },
        cargarSelectedRows(state, action) {
            state.selectedRows = action.payload
        }
    }
})

export const pendientesActions = pendientesSlice.actions

export default pendientesSlice