import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listadoProyectos: [],
    loadingProyectos: false,
    selectedRows: [],
    cupos: 0,
}

const promocionesSlice = createSlice({
    name: 'promociones',
    initialState: initialState,
    reducers: {
        cargarProyectos(state, action) {
            state.listadoProyectos = action.payload
            const promovidos = action.payload.map(p => {if(p.promovido) return p._id}).filter(p => p !== undefined)
            state.selectedRows = promovidos
        },
        setLoadingProyectos(state, action) {
            state.loadingProyectos = action.payload
        },
        setCupos(state, action) {
            state.cupos = action.payload.cupos
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
        setSelectedRows(state, action) {
            state.selectedRows = action.payload
        }
    }
})

export const promocionesActions = promocionesSlice.actions

export default promocionesSlice