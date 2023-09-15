import { configureStore } from "@reduxjs/toolkit";

//slices

import postulacionesSlice from "./postulaciones-slice";

const store = configureStore({
    reducer: { postulaciones: postulacionesSlice.reducer }
})

export default store