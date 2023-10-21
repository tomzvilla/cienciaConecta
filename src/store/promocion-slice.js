import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listadoProyectos: [],
    loadingProyectos: false,
    selectedRows: [],
    cupos: [],
}

const promocionesSlice = createSlice({
    name: 'promociones',
    initialState: initialState,
    reducers: {
        cargarProyectos(state, action) {
            state.listadoProyectos = action.payload
            state.selectedRows = []
        },
        setLoadingProyectos(state, action) {
            state.loadingProyectos = action.payload
        },
        setCupos(state, action) {
            state.cupos = action.payload
        },
        cargarCuposConDatos(state, action) {
            const { cupos, sede, nivel } = action.payload
            const prevCupos = cupos.filter(c => c.sede === sede && c.nivel === nivel)
            state.cupos = prevCupos
        },
        toggleSelectedRow(state, action) {
            const prevRows = [...state.selectedRows]
            if(prevRows.includes(action.payload)) {
                state.selectedRows = prevRows.filter((id) => id !== action.payload)
            }
            else {
                state.selectedRows = [...prevRows, action.payload];
            }
        },
    }
})

export const promocionesActions = promocionesSlice.actions

export default promocionesSlice