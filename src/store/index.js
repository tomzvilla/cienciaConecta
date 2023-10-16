import { configureStore } from "@reduxjs/toolkit";

//slices

import postulacionesSlice from "./postulaciones-slice";
import evaluacionSlice from "./evaluacion-slice";
import pendientesSlice from "./pendiente-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { postulaciones: postulacionesSlice.reducer, evaluacion: evaluacionSlice.reducer, pendientes: pendientesSlice.reducer , ui: uiSlice.reducer }
})

export default store