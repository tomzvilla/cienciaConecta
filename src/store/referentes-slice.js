import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    referentes: [],
    proyectosReferente: [],
}

const referentesSlice = createSlice({
    name: 'referentes',
    initialState: initialState,
    reducers: {
        cargarReferentes(state, action) {
            console.log(action.payload)
            state.referentes = action.payload
        },
        actualizarReferente(state, action) {
            const nuevoReferente = action.payload
            const prevReferentes = [...state.referentes]
            const referenteIndex = prevReferentes.findIndex(r => r.sede._id === nuevoReferente.sede._id)
            prevReferentes[referenteIndex].referente = nuevoReferente.referente
            state.referentes = prevReferentes
        },
        cargarProyectosReferente(state, action) {
            state.proyectosReferente = action.payload
        }
    }
})

export const referentesActions = referentesSlice.actions

export default referentesSlice