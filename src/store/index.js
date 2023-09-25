import { configureStore } from "@reduxjs/toolkit";

//slices

import postulacionesSlice from "./postulaciones-slice";
import evaluacionSlice from "./evaluacion-slice";

const store = configureStore({
    reducer: { postulaciones: postulacionesSlice.reducer, evaluacion: evaluacionSlice.reducer }
})

export default store