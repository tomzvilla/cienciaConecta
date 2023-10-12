import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    referentes: [],
    proyectosReferente: [],
    evaluadoresProyecto: [],
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
        },
        cargarEvaluadores(state, action) {
            state.evaluadoresProyecto = action.payload
        },
        asignarEvaluador(state, action) {
            const { proyectoId, evaluadorId } = action.payload
            const prevProyectos = [...state.proyectosReferente]
            const proyecto = prevProyectos.find(pr => pr._id === proyectoId)
            if(proyecto.evaluadoresRegionales.find(ev => ev === evaluadorId)) {
                proyecto.evaluadoresRegionales.push(evaluadorId)
            }
            state.proyectosReferente = prevProyectos
        }
    }
})

export const referentesActions = referentesSlice.actions

export default referentesSlice