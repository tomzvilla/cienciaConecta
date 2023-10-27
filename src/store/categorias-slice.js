import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categorias: [],
}

const categoriasSlice = createSlice({
    name: 'categorias',
    initialState: initialState,
    reducers: {
        cargarCategorias(state, action) {
            state.categorias = action.payload.filter(c => c._id !== 0)
        },
        agregarCategoria(state, action) {
            const prevCategorias = [...state.categorias]
            prevCategorias.push(action.payload)
            state.categorias = prevCategorias
        },
        borrarCategoria(state, action) {
            let prevCategorias = [...state.categorias]
            prevCategorias = prevCategorias.filter(c => c._id !== action.payload)
            state.categorias = prevCategorias
        }
    }
})

export const categoriasActions = categoriasSlice.actions

export default categoriasSlice