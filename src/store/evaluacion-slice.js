import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    criteriosConValores: [],
    devoluciones: [],
    rubricas: [],
    rubricaActual: '',
    listadoEvaluaciones: [],
}

const evaluacionSlice = createSlice({
    name: 'evaluacion',
    initialState: initialState,
    reducers: {
        cargarCriteriosVacios(state, action) {
            state.criteriosConValores = action.payload
        },
        actualizarCriterio(state, action) {

            const {rubricaId, criterioId, valor, error = ''} = action.payload
            const prevCriterios = [...state.criteriosConValores]
            const prevValue = prevCriterios.find(r => r.rubricaId === rubricaId && r.criterioId === criterioId)
            if(prevValue){
                prevValue.opcionSeleccionada = valor
            } else {
                prevCriterios.push({rubricaId, criterioId, opcionSeleccionada: valor, error})
            }
            state.criteriosConValores = prevCriterios
        },
        cargarDevoluciones(state, action) {
            state.devoluciones = action.payload
        },
        actualizarDevoluciones(state, action) {
            const {rubricaId, comentario} = action.payload
            const prevDevoluciones = [...state.devoluciones]
            const prevValue = prevDevoluciones.find(d => d.rubricaId === rubricaId)
            if(prevValue){
                prevValue.comentario = comentario
            } else {
                prevDevoluciones.push({rubricaId, comentario})
            }
            state.devoluciones = prevDevoluciones
        },
        cargarError(state, action) {
            const {rubricaId, criterioId, error = ''} = action.payload
            const prevCriterios = [...state.criteriosConValores]
            const prevValue = prevCriterios.find(r => r.rubricaId === rubricaId && r.criterioId === criterioId)
            if(prevValue){
                prevValue.error = error
            }
            state.criteriosConValores = prevCriterios

        },
        cargarErrorDevolucion(state, action) {
            const {rubricaId, error = ''} = action.payload
            const prevDevoluciones = [...state.devoluciones]
            const prevValue = prevDevoluciones.find(d => d.rubricaId === rubricaId)
            if(prevValue){
                prevValue.error = error
            } 
            state.devoluciones = prevDevoluciones
        },
        cargarRubricas(state, action) {
            state.rubricas = action.payload
            state.rubricaActual = state.rubricas[0]

        },
        siguienteRubrica(state, action) {
            const indexActual =  state.rubricas.findIndex(rubrica => rubrica === action.payload)
            if(indexActual === state.rubricas.length -1) return
            state.rubricaActual = state.rubricas[indexActual + 1]
        },
        anteriorRubrica(state, action) {
            const indexActual =  state.rubricas.findIndex(rubrica => rubrica === action.payload)
            if(indexActual === 0) return
            state.rubricaActual = state.rubricas[indexActual - 1]
        },
        cargarTablaEvaluacionesPendientes(state, action) {
            const prevListado = [...state.listadoEvaluaciones];
            const nuevasEvaluaciones = action.payload;
        
            nuevasEvaluaciones.forEach(e => {
                const proyectoExiste = prevListado.some(p => p._id === e._id);
        
                if (!proyectoExiste) {
                    prevListado.push(e);
                }
            });
            state.listadoEvaluaciones = prevListado;
        
        },
        actualizarListosEvaluacion(state, action) {
            const prevListado = [...state.listadoEvaluaciones];
            const proyecto = prevListado.find(p => p._id === action.payload)
            proyecto.evaluacion.listo.push('tempId')
            state.listadoEvaluaciones = prevListado
        },
        actualizarListosExposicion(state, action) {
            const prevListado = [...state.listadoEvaluaciones];
            const proyecto = prevListado.find(p => p._id === action.payload)
            proyecto.exposicion.listo.push('tempId')
            state.listadoEvaluaciones = prevListado
        },
        actualizarListosExposicionProvincial(state, action) {
            const prevListado = [...state.listadoEvaluaciones];
            const proyecto = prevListado.find(p => p._id === action.payload)
            proyecto.exposicionProvincial.listo.push('tempId')
            state.listadoEvaluaciones = prevListado
        },
        actualizarRealizadosEvaluacion(state, action) {
            const prevListado = [...state.listadoEvaluaciones];
            const proyecto = prevListado.find(p => p._id === action.payload)
            proyecto.evaluacion.evaluadorId.push('tempId')
            state.listadoEvaluaciones = prevListado
        },
        actualizarRealizadosExposicion(state, action) {
            const prevListado = [...state.listadoEvaluaciones];
            const proyecto = prevListado.find(p => p._id === action.payload)
            proyecto.exposicion.evaluadorId.push('tempId')
            state.listadoEvaluaciones = prevListado
        },
        actualizarRealizadosExposicionProvincial(state, action) {
            const prevListado = [...state.listadoEvaluaciones];
            const proyecto = prevListado.find(p => p._id === action.payload)
            if(!proyecto?.exposicionProvincial) {
                proyecto['exposicionProvincial'] = { evaluadorId: ['tempId'] }
            } else {
                proyecto?.exposicionProvincial?.evaluadorId.push('tempId')
            }
            state.listadoEvaluaciones = prevListado
        }
    }
})

export const evaluacionActions = evaluacionSlice.actions

export default evaluacionSlice