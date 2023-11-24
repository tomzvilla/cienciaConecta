import { createSlice } from "@reduxjs/toolkit";

const getViewportWidth = () => window.innerWidth;

const initialState = {
    sidebar: getViewportWidth() <= 1200,
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