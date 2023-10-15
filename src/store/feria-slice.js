import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rubricas: [],
}

const feriaSlice = createSlice({
    name: 'feria',
    initialState: initialState,
    reducers: {
        agregarRubrica(state, action) {
            const prevRubricas = [...state.rubricas]
            prevRubricas.push(action.payload)
            state.rubricas = prevRubricas
        },
        borrarRubrica(state, action) {
            const prevRubricas = [...state.rubricas]
            state.rubricas = prevRubricas.filter(r => r.nombreRubrica !== action.payload.nombreRubrica)
        },
        agregarCriterio(state, action) {
            const {rubrica, criterio} = action.payload
            const prevRubricas = [...state.rubricas]
            const prevRubrica = prevRubricas.find(r => r.nombreRubrica === rubrica.nombreRubrica)
            prevRubrica.criterios.push(criterio)
            state.rubricas = prevRubricas
        },
        borrarCriterio(state, action) {
            const {rubrica, criterio} = action.payload
            const prevRubricas = [...state.rubricas]
            const prevRubrica = prevRubricas.find(r => r.nombreRubrica === rubrica.nombreRubrica)
            prevRubrica.criterios = prevRubrica.criterios.filter(r => r.nombre !== criterio.nombre)
            state.rubricas = prevRubricas
        },
    }
})

export const feriaActions = feriaSlice.actions

export default feriaSlice