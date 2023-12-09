import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listadoProyectos: [],
    loadingProyectos: false,
    selectedRows: [],
    cupos: {},
    puntaje: 0,
}

const promocionesSlice = createSlice({
    name: 'promociones',
    initialState: initialState,
    reducers: {
        cargarProyectos(state, action) {
            state.listadoProyectos = action.payload
            const promovidos = action.payload.filter(p => p.promovido).map(p => p._id);
            state.selectedRows = promovidos
        },
        setLoadingProyectos(state, action) {
            state.loadingProyectos = action.payload
        },
        setCupos(state, action) {
            state.cupos = action.payload
        },
        toggleSelectedRow(state, action) {
            const prevRows = [...state.selectedRows]
            const prevCupos = {...state.cupos}
            if(prevRows.includes(action.payload)) {
                prevCupos.promovidosNivel -= 1
                prevCupos.promovidosSede -= 1
                state.selectedRows = prevRows.filter((id) => id !== action.payload)
            }
            else {
                state.selectedRows = [...prevRows, action.payload];
                prevCupos.promovidosNivel += 1
                prevCupos.promovidosSede += 1
            }
            state.cupos = prevCupos
        },
        setSelectedRows(state, action) {
            state.selectedRows = action.payload
        },
        setPuntaje(state, action) {
            state.puntaje = action.payload
        }
    }
})

export const promocionesActions = promocionesSlice.actions

export default promocionesSlice