import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingReporte: false,
    data: {},
    listadoReportes: [],
}

const reportesSlice = createSlice({
    name: 'reportes',
    initialState: initialState,
    reducers: {
        setLoadingReporte(state, action) {
            state.loadingReporte = action.payload
        },
        setData(state, action) {
            state.data = action.payload
        },
        agregarReporte(state, action) {
            const prevReportes = [...state.listadoReportes]
            prevReportes.push(action.payload)
            state.listadoReportes = prevReportes
        },
        borrarReporte(state, action) {
            const prevReportes = [...state.listadoReportes]
            const newReportes = prevReportes.filter(r => r.titulo !== action.payload.titulo)
            state.listadoReportes = newReportes
        }
    }
})

export const reportesActions = reportesSlice.actions

export default reportesSlice