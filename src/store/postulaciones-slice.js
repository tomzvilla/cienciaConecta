import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listadoPostulantes: [],
}

const postulacionesSlice = createSlice({
    name: 'postulaciones',
    initialState: initialState,
    reducers: {
        cargarPostulaciones(state, action) {
            state.listadoPostulantes = action.payload
        },
        actualizarPostulaciones(state, action) {
            const nuevoListado = state.listadoPostulantes.filter(p => !action.payload.includes(p._id))
            state.listadoPostulantes = nuevoListado
        }
    }
})

export const postulacionesActions = postulacionesSlice.actions

export default postulacionesSlice