import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: false,
    navbarMenu: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        showSidebar(state) {
            state.sidebar = !state.sidebar
        },
        toggleNavbarMenu(state) {
            state.navbarMenu = !state.navbarMenu
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice