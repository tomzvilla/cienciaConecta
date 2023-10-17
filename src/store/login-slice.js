import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggingOut: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setLoggingOut(state, action) {
            state.isLoggingOut = action.payload;
        },
    }
})

export const loginActions = loginSlice.actions

export default loginSlice