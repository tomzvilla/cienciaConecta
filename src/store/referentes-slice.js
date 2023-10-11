import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    referentes: [],
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
            console.log(nuevoReferente)
            const prevReferentes = [...state.referentes]
            console.log(prevReferentes)
            const referenteIndex = prevReferentes.findIndex(r => r.sede._id === nuevoReferente.sede._id)
            console.log(referenteIndex)
            prevReferentes[referenteIndex].referente = nuevoReferente.referente
            console.log(prevReferentes)
            state.referentes = prevReferentes
        }
    }
})

export const referentesActions = referentesSlice.actions

export default referentesSlice