import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificaciones: [],
    numeroNoLeidas: 0,
}

const notificacionesSlice = createSlice({
    name: 'notificaciones',
    initialState: initialState,
    reducers: {
        cargarNotificaciones(state, action) {
            let array = [...action.payload]
            state.notificaciones = array.reverse();
        },
        marcarComoLeidas(state, action) {
            const prevNotifications = [...state.notificaciones]
            const newNotifications = prevNotifications.map(noti => {
                if(action.payload.find(n => n === noti._id)) {
                    return {
                        ...noti,
                        estado: '2'
                    }
                } else {
                    return noti
                }
            })
            state.notificaciones = newNotifications
        }, 
        marcarComoNoLeidas(state, action) {
            const prevNotifications = [...state.notificaciones]
            const newNotifications = prevNotifications.map(noti => {
                if(action.payload.find(n => n === noti._id)) {
                    return {
                        ...noti,
                        estado: '1'
                    }
                } else {
                    return noti
                }
            })
            state.notificaciones = newNotifications
        },
        cargarNumeroSinLeer(state, action) {
            state.numeroNoLeidas = action.payload
        },
        actualizarNumeroNotificaciones(state) {
            const prevNotifications = [...state.notificaciones]
            const noLeidas = prevNotifications.filter(n => parseInt(n.estado) <= 1)
            state.numeroNoLeidas = noLeidas.length

        }
    }
})

export const notificacionesActions = notificacionesSlice.actions

export default notificacionesSlice