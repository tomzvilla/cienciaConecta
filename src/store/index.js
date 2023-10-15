import { configureStore } from "@reduxjs/toolkit";

//slices

import postulacionesSlice from "./postulaciones-slice";
import evaluacionSlice from "./evaluacion-slice";
import uiSlice from "./ui-slice";
import referentesSlice from "./referentes-slice";
import feriaSlice from "./feria-slice";

const store = configureStore({
    reducer: { 
        postulaciones: postulacionesSlice.reducer, 
        evaluacion: evaluacionSlice.reducer, 
        ui: uiSlice.reducer, 
        referentes: referentesSlice.reducer,
        feria: feriaSlice.reducer,
    }
})

export default store