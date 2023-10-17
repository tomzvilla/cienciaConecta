import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    referentes: [],
    proyectosReferente: [],
    evaluadoresProyecto: [],
    proyectoEditando: {},
}

const referentesSlice = createSlice({
    name: 'referentes',
    initialState: initialState,
    reducers: {
        cargarReferentes(state, action) {
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
            state.proyectoEditando = {}
        },
        cargarEvaluadores(state, action) {
            state.evaluadoresProyecto = action.payload
        },
        cargarProyectoEditando(state, action) {
            state.proyectoEditando = action.payload
        },
        asignarEvaluador(state, action) {
            const prevProyecto = {...state.proyectoEditando}
            const prevEvaluadores = [...state.evaluadoresProyecto]
            prevProyecto.evaluadoresRegionales.push(action.payload)
            const evaluador = prevEvaluadores.find(ev => ev._id === action.payload)
            evaluador.asignado = true
            state.proyectoEditando = prevProyecto
            state.evaluadoresProyecto = prevEvaluadores
        },
        desasignarEvaluador(state, action) {
            const prevProyecto = {...state.proyectoEditando}
            const prevEvaluadores = [...state.evaluadoresProyecto]
            prevProyecto.evaluadoresRegionales = prevProyecto.evaluadoresRegionales.filter(ev => ev !== action.payload)
            const evaluador = prevEvaluadores.find(ev => ev._id === action.payload)
            evaluador.asignado = false
            state.evaluadoresProyecto = prevEvaluadores
            state.proyectoEditando = prevProyecto
        },
        borrarReferente(state, action) {
            const prevReferentes = [...state.referentes]
            const referenteIndex = prevReferentes.findIndex(r => r.sede._id === action.payload._id)
            prevReferentes[referenteIndex].referente = {}
            state.referentes = prevReferentes

        },
     }
})

export const referentesActions = referentesSlice.actions

export default referentesSlice