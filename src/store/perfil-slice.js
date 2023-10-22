import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuario: {},
}

const perfilSlice = createSlice({
    name: 'perfil',
    initialState: initialState,
    reducers: {
        setUsuario(state, action) {
            state.usuario = action.payload
        },
        updateUsuario(state, action) {
            const prevUsuario = {...state.usuario}
            prevUsuario.nombre = action.payload.name
            prevUsuario.apellido = action.payload.lastname
            prevUsuario.telefono = action.payload.phoneNumber
            prevUsuario.cargo = action.payload.position
            prevUsuario.usuario.email = action.payload.email
            state.usuario = prevUsuario
        }
    }
})

export const perfilActions = perfilSlice.actions

export default perfilSlice