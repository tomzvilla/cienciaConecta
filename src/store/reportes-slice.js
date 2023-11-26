import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingReporte: false,
}

const reportesSlice = createSlice({
    name: 'reportes',
    initialState: initialState,
    reducers: {
        setLoadingReporte(state, action) {
            state.loadingReporte = action.payload
        },
    }
})

export const reportesActions = reportesSlice.actions

export default reportesSlice